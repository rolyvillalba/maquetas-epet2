// Procesa la maqueta: lee el archivo exportado de SketchUp, le aplica el estilo
// (madera / cartón blanco / cartón gris / original de SketchUp), resuelve las ventanas, agrega base
// y la exporta como .glb listo para realidad aumentada.
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { mergeGeometries, mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import JSZip from "jszip";
import { WebIO } from "@gltf-transform/core";
import { KHRDracoMeshCompression } from "@gltf-transform/extensions";
import { draco, weld } from "@gltf-transform/functions";
import DracoEncoderModule from "draco3d/draco_encoder_nodejs.js";

export const FORMATOS = [".dae", ".glb", ".gltf", ".stl", ".obj", ".kmz", ".zip"];

// ---------- Lectura ----------
const BLANK = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
const ES_IMAGEN = /\.(png|jpe?g|bmp|tga|gif|tif+|webp)$/i;
const NOMBRE_BLOB = new Map(); // blob url -> nombre de archivo original
const base = (url) => decodeURIComponent(String(url).split(/[\\/]/).pop().split("?")[0]).toLowerCase();

// Manager que resuelve las texturas desde los archivos subidos (zip, kmz o sueltos)
function manager(imagenes, info) {
  const m = new THREE.LoadingManager();
  let pendientes = 0, avisar = null;
  m.itemStart = () => pendientes++;
  m.itemEnd = m.itemError = () => { if (--pendientes <= 0 && avisar) avisar(); };
  m.listo = () => new Promise((ok) => {
    if (pendientes <= 0) return setTimeout(ok, 30);
    avisar = ok;
    setTimeout(ok, 15000); // por las dudas
  });
  m.setURLModifier((url) => {
    if (url.startsWith("blob:") || url.startsWith("data:")) return url;
    if (!ES_IMAGEN.test(url)) return url;
    const k = base(url);
    if (imagenes.has(k)) { info.texturas.add(k); return imagenes.get(k); }
    info.faltantes.add(k);
    return BLANK;
  });
  return m;
}

/**
 * files: lista de File (el modelo y, opcionalmente, sus texturas).
 * Devuelve { raiz, info: { texturas, faltantes } }
 */
export async function leerArchivo(entrada) {
  const files = Array.isArray(entrada) ? entrada : [entrada];
  const ext = (f) => f.name.toLowerCase().slice(f.name.lastIndexOf("."));
  if (files.some((f) => ext(f) === ".skp") && !files.some((f) => FORMATOS.includes(ext(f)))) {
    throw new Error("El archivo .skp no se puede leer directo. En SketchUp andá a Archivo › Exportar › Modelo 3D y elegí COLLADA (.dae) o Google Earth (.kmz).");
  }
  const file = files.find((f) => FORMATOS.includes(ext(f)));
  if (!file) throw new Error("No encontré el modelo. Usá .dae, .kmz, .glb, .stl u .obj");
  const e = ext(file);

  const imagenes = new Map();
  const registrar = (nombre, blob) => {
    const u = URL.createObjectURL(blob);
    NOMBRE_BLOB.set(u, nombre.toLowerCase());
    imagenes.set(base(nombre), u);
  };
  for (const f of files) if (ES_IMAGEN.test(f.name)) registrar(f.name, f);
  const info = { texturas: new Set(), faltantes: new Set() };
  const mgr = manager(imagenes, info);
  const buf = await file.arrayBuffer();

  let obj, zUp = false;
  if (e === ".glb" || e === ".gltf") {
    obj = (await new GLTFLoader(mgr).parseAsync(buf, "")).scene;
  } else if (e === ".dae") {
    obj = new ColladaLoader(mgr).parse(new TextDecoder().decode(buf), "").scene;
  } else if (e === ".kmz" || e === ".zip") {
    const zip = await JSZip.loadAsync(buf);
    const entradas = Object.values(zip.files).filter((x) => !x.dir);
    const dae = entradas.find((x) => /\.dae$/i.test(x.name));
    if (!dae) throw new Error("El archivo comprimido no tiene ningún .dae adentro.");
    for (const x of entradas) {
      if (ES_IMAGEN.test(x.name)) registrar(x.name, await x.async("blob"));
    }
    obj = new ColladaLoader(mgr).parse(await dae.async("string"), "").scene;
  } else if (e === ".stl") {
    obj = new THREE.Mesh(new STLLoader().parse(buf), new THREE.MeshStandardMaterial({ color: 0xdddddd }));
    zUp = true; // SketchUp exporta STL con Z hacia arriba
  } else if (e === ".obj") {
    obj = new OBJLoader(mgr).parse(new TextDecoder().decode(buf));
  }
  await mgr.listo();
  const raiz = new THREE.Group();
  if (zUp) obj.rotation.x = -Math.PI / 2;
  raiz.add(obj);
  raiz.updateMatrixWorld(true);
  return { raiz, info: { texturas: info.texturas.size, faltantes: [...info.faltantes] } };
}

// ---------- Texturas procedurales ----------
function rnd(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function texMadera(size = 1024) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const x = c.getContext("2d");
  x.fillStyle = "#e3c79c";
  x.fillRect(0, 0, size, size);
  const r = rnd(7);
  // bandas suaves (láminas de balsa)
  for (let i = 0; i < 9; i++) {
    const y = r() * size, h = 30 + r() * 120;
    x.fillStyle = `rgba(${r() < 0.5 ? "160,110,60" : "255,240,215"},${0.05 + r() * 0.08})`;
    for (const off of [-size, 0, size]) x.fillRect(0, y + off, size, h);
  }
  // vetas finas
  for (let i = 0; i < 520; i++) {
    const y0 = r() * size, a = 0.03 + r() * 0.1, w = 0.6 + r() * 1.6;
    const dark = r() < 0.7;
    x.strokeStyle = dark ? `rgba(120,78,40,${a})` : `rgba(255,245,225,${a})`;
    x.lineWidth = w;
    const amp = 1 + r() * 4, ph = r() * 6.28, fr = (2 * Math.PI * (1 + Math.floor(r() * 3))) / size;
    for (const off of [-size, 0, size]) {
      x.beginPath();
      for (let px = 0; px <= size; px += 16) {
        const py = y0 + off + Math.sin(px * fr + ph) * amp;
        px === 0 ? x.moveTo(px, py) : x.lineTo(px, py);
      }
      x.stroke();
    }
  }
  ruido(x, size, 10, 3);
  return c;
}

function texCarton(base, motas, size = 512, seed = 3) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const x = c.getContext("2d");
  x.fillStyle = base;
  x.fillRect(0, 0, size, size);
  const r = rnd(seed);
  for (let i = 0; i < motas.n; i++) {
    const px = r() * size, py = r() * size, s = 0.5 + r() * motas.s;
    x.fillStyle = r() < 0.5 ? motas.a : motas.b;
    x.globalAlpha = 0.15 + r() * 0.35;
    x.fillRect(px, py, s, s * (0.4 + r()));
  }
  x.globalAlpha = 1;
  ruido(x, size, motas.ruido, seed);
  return c;
}

function ruido(x, size, amt, seed) {
  const d = x.getImageData(0, 0, size, size), r = rnd(seed + 99);
  for (let i = 0; i < d.data.length; i += 4) {
    const n = (r() - 0.5) * amt;
    d.data[i] += n; d.data[i + 1] += n; d.data[i + 2] += n;
  }
  x.putImageData(d, 0, 0);
}

export const ESTILOS = {
  madera: {
    nombre: "Madera balsa",
    textura: () => texMadera(),
    escala: 0.16, // metros que cubre la textura
    color: 0xffffff,
    base: 0xd2bea4,
    rugosidad: 0.72,
  },
  "carton-blanco": {
    nombre: "Cartón blanco",
    textura: () => texCarton("#efebe3", { n: 2200, s: 1.6, a: "#c9c2b4", b: "#ffffff", ruido: 7 }),
    escala: 0.12,
    color: 0xffffff,
    base: 0xe4ded2,
    rugosidad: 0.9,
  },
  "carton-gris": {
    nombre: "Cartón gris",
    textura: () => texCarton("#a2a2a0", { n: 5000, s: 2.2, a: "#6c6c6c", b: "#c8c6c2", ruido: 14 }, 512, 11),
    escala: 0.12,
    color: 0xffffff,
    base: 0xc4bfb6,
    rugosidad: 0.92,
  },
};

// ---------- Utilidades de geometría ----------
function esVidrio(mat) {
  if (!mat) return false;
  const n = (mat.name || "").toLowerCase();
  if (/vidr|glass|cristal|ventan|window|transl|translu/.test(n)) return true;
  return (mat.transparent && mat.opacity < 0.95) || mat.opacity < 0.95 || (mat.transmission || 0) > 0.3;
}

function prepararGeo(geo, matrix) {
  let g = geo.index ? geo.toNonIndexed() : geo.clone();
  const keep = new THREE.BufferGeometry();
  keep.setAttribute("position", g.getAttribute("position").clone());
  if (g.getAttribute("normal")) keep.setAttribute("normal", g.getAttribute("normal").clone());
  if (g.getAttribute("uv")) keep.setAttribute("uv", g.getAttribute("uv").clone());
  keep.applyMatrix4(matrix);
  if (!keep.getAttribute("normal")) keep.computeVertexNormals();
  return keep;
}

// UV por proyección según la cara (para que la veta siga cada plano)
function uvTriplanar(geo, escala) {
  const p = geo.getAttribute("position"), n = geo.getAttribute("normal");
  const uv = new Float32Array(p.count * 2);
  for (let i = 0; i < p.count; i += 3) {
    // normal de la cara (promedio de los 3 vértices)
    let nx = 0, ny = 0, nz = 0;
    for (let k = 0; k < 3 && i + k < p.count; k++) { nx += n.getX(i + k); ny += n.getY(i + k); nz += n.getZ(i + k); }
    const ax = Math.abs(nx), ay = Math.abs(ny), az = Math.abs(nz);
    for (let k = 0; k < 3 && i + k < p.count; k++) {
      const x = p.getX(i + k), y = p.getY(i + k), z = p.getZ(i + k);
      let u, v;
      if (ay >= ax && ay >= az) { u = x; v = z; }        // pisos / techos
      else if (ax >= az) { u = z; v = y; }               // muros mirando a X
      else { u = x; v = y; }                             // muros mirando a Z
      uv[(i + k) * 2] = u / escala;
      uv[(i + k) * 2 + 1] = v / escala;
    }
  }
  geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  return geo;
}

// ---------- Estilo completo ----------
/**
 * opciones: { estilo ("madera"|"carton-blanco"|"carton-gris"|"original"), ventanas ("gris"|"luz"|"negro"|"original"), base (bool), giro (0..3, cuartos de vuelta en X) }
 * Devuelve { escena, triangulos }
 */
export function aplicarEstilo(root, opciones) {
  const original = opciones.estilo === "original";
  const est = ESTILOS[opciones.estilo] || ESTILOS.madera;
  const giro = new THREE.Matrix4().makeRotationX((-Math.PI / 2) * (opciones.giro || 0));
  root.updateMatrixWorld(true);
  const modoV = ["gris", "luz", "negro", "original"].includes(opciones.ventanas) ? opciones.ventanas : "gris";

  // piezas: { geo, mat (material original), vidrio }
  const piezas = [];
  root.traverse((o) => {
    if (!o.isMesh || !o.geometry?.getAttribute("position")) return;
    if (o.isLine || o.isPoints) return;
    const mats = Array.isArray(o.material) ? o.material : [o.material];
    const m = new THREE.Matrix4().multiplyMatrices(giro, o.matrixWorld);
    const geo = o.geometry;
    if (mats.length > 1 && geo.groups.length) {
      const ng = geo.index ? geo.toNonIndexed() : geo;
      for (const gr of ng.groups) {
        const sub = new THREE.BufferGeometry();
        for (const name of ["position", "normal", "uv"]) {
          const a = ng.getAttribute(name);
          if (!a) continue;
          sub.setAttribute(name, new THREE.BufferAttribute(a.array.slice(gr.start * a.itemSize, (gr.start + gr.count) * a.itemSize), a.itemSize));
        }
        const mat = mats[gr.materialIndex];
        piezas.push({ geo: prepararGeo(sub, m), mat, vidrio: esVidrio(mat) });
      }
    } else {
      piezas.push({ geo: prepararGeo(geo, m), mat: mats[0], vidrio: esVidrio(mats[0]) });
    }
  });
  if (!piezas.length) throw new Error("No se encontró ninguna superficie en el archivo.");

  // tamaño: el lado mayor en planta pasa a medir 50 cm (escala de maqueta)
  const box = new THREE.Box3();
  for (const p of piezas) { p.geo.computeBoundingBox(); box.union(p.geo.boundingBox); }
  const size = box.getSize(new THREE.Vector3());
  const lado = Math.max(size.x, size.z) || 1;
  const s = 0.5 / lado;
  const centro = box.getCenter(new THREE.Vector3());
  const norm = new THREE.Matrix4().makeScale(s, s, s).multiply(new THREE.Matrix4().makeTranslation(-centro.x, -box.min.y, -centro.z));
  const base = opciones.base !== false;
  const altoBase = base ? 0.03 : 0;
  norm.premultiply(new THREE.Matrix4().makeTranslation(0, altoBase, 0));
  for (const p of piezas) p.geo.applyMatrix4(norm);

  const escena = new THREE.Scene();
  let triangulos = 0;
  const agregar = (geos, mat, nombre, triplanar) => {
    if (!geos.length) return;
    for (const g of geos) {
      if (triplanar) uvTriplanar(g, triplanar);
      else if (!g.getAttribute("uv")) g.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(g.getAttribute("position").count * 2), 2));
    }
    let g = mergeGeometries(geos, false);
    g = mergeVertices(g, 1e-6);
    triangulos += (g.index ? g.index.count : g.getAttribute("position").count) / 3;
    const mesh = new THREE.Mesh(g, mat);
    mesh.name = nombre;
    escena.add(mesh);
  };

  const VIDRIOS = {
    gris: { color: 0x7a838c, roughness: 0.12, metalness: 0.25 },
    luz: { color: 0x6b5236, emissive: 0xffa64a, emissiveIntensity: 2.2, roughness: 0.25, metalness: 0 },
    negro: { color: 0x0e0e0f, roughness: 0.4, metalness: 0 },
  };
  const vidrioPropio = modoV === "original";
  const matVidrio = vidrioPropio ? null : new THREE.MeshStandardMaterial({ name: "vidrio", side: THREE.DoubleSide, ...VIDRIOS[modoV] });
  const vidrios = vidrioPropio ? [] : piezas.filter((p) => p.vidrio);
  const resto = vidrioPropio ? piezas : piezas.filter((p) => !p.vidrio);

  let matBase;
  if (original) {
    // conservar materiales y texturas de SketchUp
    const grupos = new Map();
    for (const p of resto) {
      const k = p.mat?.uuid || "sin";
      if (!grupos.has(k)) grupos.set(k, { mat: p.mat, geos: [] });
      grupos.get(k).geos.push(p.geo);
    }
    let i = 0;
    for (const { mat, geos } of grupos.values()) {
      const mapa = mat?.map && mat.map.image && (mat.map.image.width || 0) > 1 ? mat.map : null;
      if (mapa) {
        mapa.wrapS = mapa.wrapT = THREE.RepeatWrapping;
        mapa.colorSpace = THREE.SRGBColorSpace;
        const nombre = NOMBRE_BLOB.get(mapa.image.src || mapa.image.currentSrc) || "";
        // PNG solo si el original lo era (puede tener transparencia); el resto, JPG liviano
        mapa.userData.mimeType = /\.png$/.test(nombre) || (!nombre && (mat.transparent || mat.alphaTest > 0)) ? "image/png" : "image/jpeg";
      }
      const opacidad = mat?.opacity ?? 1;
      const nuevo = new THREE.MeshStandardMaterial({
        name: mat?.name || "material" + ++i,
        color: mat?.color ? mat.color.clone() : new THREE.Color(0xdddddd),
        map: mapa,
        transparent: opacidad < 0.99,
        opacity: opacidad,
        roughness: opacidad < 0.99 ? 0.1 : 0.85,
        metalness: 0,
        side: THREE.DoubleSide,
      });
      agregar(geos, nuevo, nuevo.name, 0);
    }
    matBase = new THREE.MeshStandardMaterial({ name: "base", color: 0xe9e5dd, roughness: 0.9, metalness: 0 });
  } else {
    const tex = new THREE.CanvasTexture(est.textura());
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    tex.userData.mimeType = "image/jpeg";
    const matCuerpo = new THREE.MeshStandardMaterial({
      name: "maqueta", map: tex, color: est.color, roughness: est.rugosidad, metalness: 0, side: THREE.DoubleSide,
    });
    agregar(resto.map((p) => p.geo), matCuerpo, "maqueta", est.escala);
    matBase = new THREE.MeshStandardMaterial({ name: "base", map: tex, color: est.base, roughness: est.rugosidad, metalness: 0 });
  }
  agregar(vidrios.map((p) => p.geo), matVidrio, "ventanas", 1);

  if (base) {
    const margen = 0.06;
    const w = size.x * s + margen * 2, d = size.z * s + margen * 2;
    const bg = new THREE.BoxGeometry(w, altoBase, d).toNonIndexed();
    bg.translate(0, altoBase / 2, 0);
    uvTriplanar(bg, original ? 1 : est.escala);
    const mb = new THREE.Mesh(bg, matBase);
    mb.name = "base";
    escena.add(mb);
    triangulos += 12;
  }
  return { escena, triangulos: Math.round(triangulos) };
}

let encoder = null;
async function dracoEncoder() {
  if (!encoder) {
    const wasmBinary = await (await fetch("/js/draco/draco_encoder.wasm")).arrayBuffer();
    encoder = await DracoEncoderModule({ wasmBinary });
  }
  return encoder;
}

// Comprime la geometría con Draco (suele reducir el peso 5 a 10 veces)
async function comprimir(glb) {
  const io = new WebIO()
    .registerExtensions([KHRDracoMeshCompression])
    .registerDependencies({ "draco3d.encoder": await dracoEncoder() });
  const doc = await io.readBinary(new Uint8Array(glb));
  await doc.transform(
    weld(),
    draco({ method: "edgebreaker", quantizePosition: 14, quantizeNormal: 8, quantizeTexcoord: 11, quantizationVolume: "scene" })
  );
  const out = await io.writeBinary(doc);
  return out.buffer.slice(out.byteOffset, out.byteOffset + out.byteLength);
}

export async function exportarGLB(escena) {
  const glb = await new GLTFExporter().parseAsync(escena, { binary: true, maxTextureSize: 1024 });
  try {
    return await comprimir(glb);
  } catch (e) {
    console.warn("No se pudo comprimir, se usa sin comprimir", e);
    return glb;
  }
}

// Funciones compartidas: API, QR y ficha imprimible
import qrcode from "./qrcode.js";

export const ESCUELA = "EPET N° 2";
export const EVENTO = "Muestra anual";
const PARTE = 4 * 1024 * 1024;

export const urlMaqueta = (id) => `${location.origin}/m/${id}`;

async function api(path, opts = {}) {
  const r = await fetch("/api/" + path, opts);
  const data = r.headers.get("content-type")?.includes("json") ? await r.json() : null;
  if (!r.ok) throw new Error(data?.error || "Error " + r.status);
  return data;
}

export const listar = () => api("proyectos");
export const obtener = (id) => api("proyectos/" + id);
export const crear = (datos) =>
  api("proyectos", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(datos) });

const hdr = (token, admin) => (admin ? { "x-admin": admin } : { "x-token": token || "" });

export const verificar = (id, token, admin) => api(`proyectos/${id}/verificar`, { method: "POST", headers: hdr(token, admin) });
export const actualizarDatos = (id, token, datos, admin) =>
  api("proyectos/" + id, { method: "PATCH", headers: { "content-type": "application/json", ...hdr(token, admin) }, body: JSON.stringify(datos) });
export const borrar = (id, token, admin) => api("proyectos/" + id, { method: "DELETE", headers: hdr(token, admin) });

/** Sube el .glb en partes y confirma la versión nueva. progreso(0..1) */
export async function subirModelo(meta, token, glb, extra, progreso = () => {}) {
  const v = meta.version + 1;
  const n = Math.ceil(glb.byteLength / PARTE);
  for (let i = 0; i < n; i++) {
    const trozo = glb.slice(i * PARTE, Math.min(glb.byteLength, (i + 1) * PARTE));
    let intentos = 0;
    for (;;) {
      try {
        await api(`proyectos/${meta.id}/parte/${v}/${i}`, { method: "PUT", headers: hdr(token), body: trozo });
        break;
      } catch (e) {
        if (++intentos >= 3) throw e;
        await new Promise((r) => setTimeout(r, 1200 * intentos));
      }
    }
    progreso((i + 1) / n);
  }
  return api(`proyectos/${meta.id}/listo`, {
    method: "POST",
    headers: { "content-type": "application/json", ...hdr(token) },
    body: JSON.stringify({ chunks: n, size: glb.byteLength, ...extra }),
  });
}

export const subirPoster = (id, token, blob) => api(`proyectos/${id}/poster`, { method: "PUT", headers: hdr(token), body: blob });
export const urlPoster = (m) => (m.poster ? `/api/proyectos/${m.id}/poster?v=${m.poster}` : null);

/** Descarga el modelo. Si es de una sola parte devuelve la URL directa (mejor para AR en Android). */
export async function urlModelo(m, progreso = () => {}) {
  const base = `/api/proyectos/${m.id}/parte/${m.version}/`;
  if (m.chunks === 1) return { url: location.origin + base + "0", directa: true };
  const partes = [];
  for (let i = 0; i < m.chunks; i++) {
    const r = await fetch(base + i);
    if (!r.ok) throw new Error("No se pudo descargar la maqueta");
    partes.push(await r.arrayBuffer());
    progreso((i + 1) / m.chunks);
  }
  return { url: URL.createObjectURL(new Blob(partes, { type: "model/gltf-binary" })), directa: false };
}

// ---------- QR ----------
export function dibujarQR(texto, px = 512, margen = 4, oscuro = "#1d1712", claro = "#ffffff") {
  const qr = qrcode(0, "M");
  qr.addData(texto);
  qr.make();
  const n = qr.getModuleCount();
  const c = document.createElement("canvas");
  c.width = c.height = px;
  const x = c.getContext("2d");
  x.fillStyle = claro;
  x.fillRect(0, 0, px, px);
  const cel = px / (n + margen * 2);
  x.fillStyle = oscuro;
  for (let r = 0; r < n; r++)
    for (let col = 0; col < n; col++)
      if (qr.isDark(r, col)) x.fillRect(Math.floor((col + margen) * cel), Math.floor((r + margen) * cel), Math.ceil(cel), Math.ceil(cel));
  return c;
}

// ---------- Ficha para imprimir (A6 vertical, 300 dpi) ----------
const cargarImg = (src) =>
  new Promise((ok) => {
    if (!src) return ok(null);
    const i = new Image();
    i.onload = () => ok(i);
    i.onerror = () => ok(null);
    i.src = src;
  });

function envolver(x, texto, maxW) {
  const palabras = String(texto || "").split(/\s+/), lineas = [];
  let l = "";
  for (const p of palabras) {
    const t = l ? l + " " + p : p;
    if (x.measureText(t).width > maxW && l) { lineas.push(l); l = p; } else l = t;
  }
  if (l) lineas.push(l);
  return lineas;
}

export async function generarFicha(m, posterSrc) {
  const W = 1240, H = 1748, P = 90;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const x = c.getContext("2d");
  x.fillStyle = "#f7f3ec"; x.fillRect(0, 0, W, H);
  // banda superior
  x.fillStyle = "#1d1712"; x.fillRect(0, 0, W, 150);
  x.fillStyle = "#f3c98b";
  x.font = "600 40px system-ui, sans-serif";
  x.textBaseline = "middle";
  x.fillText(`${ESCUELA}  ·  ${EVENTO}`.toUpperCase(), P, 75);
  x.textAlign = "right";
  x.fillStyle = "#cdbfae";
  x.fillText(m.curso || "", W - P, 75);
  x.textAlign = "left";

  // portada
  let y = 190;
  const img = await cargarImg(posterSrc);
  const altoImg = 560;
  x.fillStyle = "#14110e";
  x.fillRect(P, y, W - P * 2, altoImg);
  if (img) {
    const r = Math.max((W - P * 2) / img.width, altoImg / img.height);
    const iw = img.width * r, ih = img.height * r;
    x.save(); x.beginPath(); x.rect(P, y, W - P * 2, altoImg); x.clip();
    x.drawImage(img, P + (W - P * 2 - iw) / 2, y + (altoImg - ih) / 2, iw, ih);
    x.restore();
  }
  y += altoImg + 70;

  // título y alumnos
  x.fillStyle = "#1d1712";
  x.textBaseline = "alphabetic";
  x.font = "800 74px system-ui, sans-serif";
  for (const l of envolver(x, m.titulo, W - P * 2).slice(0, 2)) { y += 74; x.fillText(l, P, y); }
  y += 20;
  x.font = "400 40px system-ui, sans-serif";
  x.fillStyle = "#5a4c3e";
  for (const l of envolver(x, m.alumnos, W - P * 2).slice(0, 3)) { y += 52; x.fillText(l, P, y); }

  // QR
  const qrSize = 470, qy = H - qrSize - 110;
  x.drawImage(dibujarQR(urlMaqueta(m.id), qrSize, 2, "#1d1712", "#f7f3ec"), P - 10, qy);
  const tx = P + qrSize + 30;
  x.fillStyle = "#1d1712";
  x.font = "800 52px system-ui, sans-serif";
  x.fillText("Escaneá", tx, qy + 120);
  x.font = "400 38px system-ui, sans-serif";
  x.fillStyle = "#3d3329";
  ["con la cámara del", "celular y mirá la", "maqueta en realidad", "aumentada"].forEach((t, i) => x.fillText(t, tx, qy + 185 + i * 50));
  x.font = "600 30px ui-monospace, monospace";
  x.fillStyle = "#8a7560";
  x.fillText(urlMaqueta(m.id).replace(/^https?:\/\//, ""), P, H - 60);
  return c;
}

export function descargarCanvas(canvas, nombre) {
  canvas.toBlob((b) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(b);
    a.download = nombre;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }, "image/png");
}

export const slug = (s) =>
  String(s || "maqueta").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase() || "maqueta";

export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

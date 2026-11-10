// API de Maquetas AR — EPET N° 2
// Guarda los proyectos (datos + modelo .glb en partes) en Netlify Blobs.
import { getStore } from "@netlify/blobs";

const CHUNK_MAX = 5 * 1024 * 1024;      // cada parte < 6 MB (límite de Netlify)
const MAX_CHUNKS = 12;                   // ~60 MB por maqueta como máximo
const POSTER_MAX = 400 * 1024;

const json = (data, status = 200, extra = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extra },
  });

const err = (msg, status = 400) => json({ error: msg }, status);

async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function randomId(len, alphabet) {
  const bytes = crypto.getRandomValues(new Uint8Array(len));
  return [...bytes].map((b) => alphabet[b % alphabet.length]).join("");
}
const newId = () => randomId(7, "abcdefghjkmnpqrstuvwxyz23456789");
const newToken = () => randomId(6, "ABCDEFGHJKLMNPQRSTUVWXYZ23456789");

const clean = (s, max) => String(s ?? "").replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max);
const ESTILOS = ["madera", "carton-blanco", "carton-gris", "original"];

function publicMeta(m) {
  const { tokenHash, ...rest } = m;
  return rest;
}

export default async (req) => {
  const meta = getStore({ name: "proyectos", consistency: "strong" });
  const files = getStore({ name: "modelos", consistency: "strong" });

  const url = new URL(req.url);
  const parts = url.pathname.replace(/^\/api\/?/, "").split("/").filter(Boolean);
  const method = req.method;

  const loadMeta = async (id) => (/^[a-z0-9]{4,12}$/.test(id) ? await meta.get(id, { type: "json" }) : null);

  const isAdmin = async () => {
    const key = req.headers.get("x-admin");
    const real = process.env.CLAVE_PROFE;
    return !!(key && real && key === real);
  };

  const canEdit = async (m) => {
    if (await isAdmin()) return true;
    const tok = (req.headers.get("x-token") || "").toUpperCase().trim();
    return !!tok && (await sha256(tok)) === m.tokenHash;
  };

  try {
    // GET /api/proyectos  -> listado (solo los que ya tienen modelo)
    if (parts[0] === "proyectos" && parts.length === 1 && method === "GET") {
      const { blobs } = await meta.list();
      const all = await Promise.all(blobs.map((b) => meta.get(b.key, { type: "json" })));
      const list = all
        .filter((m) => m && m.version > 0)
        .map(publicMeta)
        .sort((a, b) => (a.curso || "").localeCompare(b.curso || "") || (a.titulo || "").localeCompare(b.titulo || ""));
      return json(list);
    }

    // POST /api/proyectos  -> crear proyecto nuevo, devuelve id + código de edición
    if (parts[0] === "proyectos" && parts.length === 1 && method === "POST") {
      const body = await req.json();
      const titulo = clean(body.titulo, 80);
      if (!titulo) return err("Falta el nombre del proyecto");
      let id;
      for (let i = 0; i < 5; i++) {
        id = newId();
        if (!(await meta.get(id))) break;
      }
      const token = newToken();
      const m = {
        id,
        titulo,
        alumnos: clean(body.alumnos, 160),
        curso: clean(body.curso, 30),
        estilo: ESTILOS.includes(body.estilo) ? body.estilo : "madera",
        version: 0,
        chunks: 0,
        size: 0,
        creado: new Date().toISOString(),
        actualizado: null,
        poster: false,
        tokenHash: await sha256(token),
      };
      await meta.setJSON(id, m);
      return json({ id, token });
    }

    if (parts[0] !== "proyectos" || !parts[1]) return err("Ruta no encontrada", 404);
    const id = parts[1];
    const m = await loadMeta(id);
    if (!m) return err("No existe ese proyecto", 404);

    // GET /api/proyectos/:id
    if (parts.length === 2 && method === "GET") return json(publicMeta(m));

    // POST /api/proyectos/:id/verificar  -> comprobar código
    if (parts[2] === "verificar" && method === "POST") {
      return (await canEdit(m)) ? json(publicMeta(m)) : err("Código incorrecto", 403);
    }

    // PATCH /api/proyectos/:id  -> cambiar datos (título, alumnos, curso, estilo)
    if (parts.length === 2 && method === "PATCH") {
      if (!(await canEdit(m))) return err("Código incorrecto", 403);
      const body = await req.json();
      if (body.titulo) m.titulo = clean(body.titulo, 80);
      if (body.alumnos !== undefined) m.alumnos = clean(body.alumnos, 160);
      if (body.curso !== undefined) m.curso = clean(body.curso, 30);
      if (ESTILOS.includes(body.estilo)) m.estilo = body.estilo;
      await meta.setJSON(id, m);
      return json(publicMeta(m));
    }

    // DELETE /api/proyectos/:id
    if (parts.length === 2 && method === "DELETE") {
      if (!(await canEdit(m))) return err("Código incorrecto", 403);
      const { blobs } = await files.list({ prefix: id + "/" });
      await Promise.all(blobs.map((b) => files.delete(b.key)));
      await meta.delete(id);
      return json({ ok: true });
    }

    // PUT /api/proyectos/:id/parte/:v/:i  -> subir una parte del .glb (versión nueva v)
    if (parts[2] === "parte" && method === "PUT") {
      if (!(await canEdit(m))) return err("Código incorrecto", 403);
      const v = parseInt(parts[3], 10), i = parseInt(parts[4], 10);
      if (!(v === m.version + 1) || !(i >= 0 && i < MAX_CHUNKS)) return err("Parte inválida");
      const buf = await req.arrayBuffer();
      if (buf.byteLength === 0 || buf.byteLength > CHUNK_MAX) return err("Parte demasiado grande");
      await files.set(`${id}/${v}/${i}`, buf);
      return json({ ok: true });
    }

    // POST /api/proyectos/:id/listo  -> confirmar la versión nueva
    if (parts[2] === "listo" && method === "POST") {
      if (!(await canEdit(m))) return err("Código incorrecto", 403);
      const body = await req.json();
      const v = m.version + 1;
      const n = parseInt(body.chunks, 10);
      if (!(n >= 1 && n <= MAX_CHUNKS)) return err("Cantidad de partes inválida");
      for (let i = 0; i < n; i++) {
        const md = await files.getMetadata(`${id}/${v}/${i}`);
        if (!md) return err("Falta la parte " + (i + 1) + ", volvé a intentar");
      }
      const old = m.version;
      m.version = v;
      m.chunks = n;
      m.size = parseInt(body.size, 10) || 0;
      m.triangulos = parseInt(body.triangulos, 10) || 0;
      if (ESTILOS.includes(body.estilo)) m.estilo = body.estilo;
      m.actualizado = new Date().toISOString();
      await meta.setJSON(id, m);
      if (old > 0) {
        const { blobs } = await files.list({ prefix: `${id}/${old}/` });
        await Promise.all(blobs.map((b) => files.delete(b.key)));
      }
      return json(publicMeta(m));
    }

    // GET /api/proyectos/:id/parte/:v/:i  -> descargar una parte
    if (parts[2] === "parte" && method === "GET") {
      const v = parseInt(parts[3], 10), i = parseInt(parts[4], 10);
      const buf = await files.get(`${id}/${v}/${i}`, { type: "arrayBuffer" });
      if (!buf) return err("No encontrado", 404);
      return new Response(buf, {
        headers: {
          "content-type": "application/octet-stream",
          // cada versión es inmutable: el celular la puede guardar en caché
          "cache-control": "public, max-age=31536000, immutable",
        },
      });
    }

    // PUT /api/proyectos/:id/poster  -> imagen de portada (jpg)
    if (parts[2] === "poster" && method === "PUT") {
      if (!(await canEdit(m))) return err("Código incorrecto", 403);
      const buf = await req.arrayBuffer();
      if (buf.byteLength === 0 || buf.byteLength > POSTER_MAX) return err("Imagen demasiado grande");
      await files.set(`${id}/poster`, buf);
      m.poster = Date.now();
      await meta.setJSON(id, m);
      return json({ ok: true });
    }

    // GET /api/proyectos/:id/poster
    if (parts[2] === "poster" && method === "GET") {
      const buf = await files.get(`${id}/poster`, { type: "arrayBuffer" });
      if (!buf) return err("No encontrado", 404);
      return new Response(buf, { headers: { "content-type": "image/jpeg", "cache-control": "public, max-age=300" } });
    }

    return err("Ruta no encontrada", 404);
  } catch (e) {
    console.error(e);
    return err("Error del servidor: " + (e.message || e), 500);
  }
};

export const config = { path: "/api/*" };

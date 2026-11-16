// Service worker: permite instalar la app y abre más rápido.
// Las páginas se piden siempre a internet primero (así ven la última versión);
// los archivos pesados (visor, librerías) quedan guardados en el celular.
const VERSION = "maquetas-v1";
const BASE = ["/", "/index.html", "/render.html", "/galeria.html", "/ver.html", "/estilos.css",
  "/js/comun.js", "/js/qrcode.js", "/js/pwa.js", "/favicon.svg", "/entorno.png", "/manifest.webmanifest"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(BASE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  if (url.pathname.startsWith("/api/")) return; // datos y maquetas: siempre de internet
  const esPagina = e.request.mode === "navigate";
  // solo las librerías grandes que no cambian van "caché primero"
  const fija = /^\/js\/(model-viewer\.min\.js|draco\/)|^\/icons\/|^\/entorno\.png$/.test(url.pathname);
  if (!fija) {
    // red primero, caché si no hay conexión
    e.respondWith(
      fetch(e.request).then((r) => { const copia = r.clone(); caches.open(VERSION).then((c) => c.put(e.request, copia)); return r; })
        .catch(() => caches.match(e.request).then((r) => r || (esPagina ? caches.match(url.pathname.startsWith("/m/") ? "/ver.html" : "/index.html") : undefined)))
    );
  } else {
    // caché primero (librerías, íconos, draco)
    e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request).then((resp) => {
      if (resp.ok) { const copia = resp.clone(); caches.open(VERSION).then((c) => c.put(e.request, copia)); }
      return resp;
    })));
  }
});

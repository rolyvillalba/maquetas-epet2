// Registro del service worker y botón "Instalar app"
if ("serviceWorker" in navigator) {
  addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
}
let aviso = null;
const instalada = () => matchMedia("(display-mode: standalone)").matches || navigator.standalone;
function boton() {
  let b = document.getElementById("btnInstalar");
  if (b) return b;
  const nav = document.querySelector("nav.menu");
  if (!nav) return null;
  b = document.createElement("a");
  b.id = "btnInstalar"; b.href = "#"; b.className = "instalar"; b.textContent = "⤓ Instalar app";
  b.style.display = "none";
  nav.appendChild(b);
  b.onclick = async (e) => {
    e.preventDefault();
    if (aviso) { aviso.prompt(); await aviso.userChoice; aviso = null; b.style.display = "none"; }
    else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      alert("En iPhone: tocá el botón Compartir (el cuadrado con la flecha) y elegí «Agregar a inicio».");
    }
  };
  return b;
}
addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); aviso = e; const b = boton(); if (b) b.style.display = ""; });
addEventListener("appinstalled", () => { const b = boton(); if (b) b.style.display = "none"; });
addEventListener("DOMContentLoaded", () => {
  // en iPhone no existe el aviso automático: mostramos el botón con la explicación
  if (!instalada() && /iPhone|iPad|iPod/i.test(navigator.userAgent) && !/CriOS|FxiOS/.test(navigator.userAgent)) {
    const b = boton(); if (b) b.style.display = "";
  }
});

# Maquetas AR · EPET N° 2

Web para la muestra anual. El alumno sube la maqueta exportada de SketchUp, elige el estilo
(madera balsa, cartón blanco o cartón gris) y la página le devuelve:

- la maqueta lista para ver en **realidad aumentada** desde el celular (Android y iPhone, sin instalar nada),
- el **QR** y una **ficha para imprimir** (A6) para poner al lado del plano,
- un **código de edición** para subir versiones nuevas sin que cambie el QR.

Páginas:

| Página | Para qué |
|---|---|
| `/` | Subir o actualizar una maqueta |
| `/render.html` | Render de maquetas: arma el prompt para ChatGPT con opciones (material, aberturas, árboles, agua, fondo) y lo copia |
| `/galeria.html` | Todas las maquetas, filtradas por curso. Con "modo profe" se descargan todas las fichas y se puede borrar |
| `/m/CODIGO` | Lo que abre el QR: visor 3D + botón "Ver sobre la mesa" |

---

## Cómo publicarla (una sola vez, unos 10 minutos)

La web necesita guardar las maquetas, así que usa una función de Netlify y **no se puede
subir arrastrando la carpeta a Netlify Drop**. El camino más simple, todo desde el navegador:

### 1. Subir los archivos a GitHub
1. Entrá a https://github.com (creá una cuenta si no tenés) y tocá **New repository**.
   Nombre: `maquetas-ar`. Dejalo en **Private** si querés. Tocá **Create repository**.
2. En la página del repositorio vacío, tocá **uploading an existing file**.
3. Descomprimí el zip y **arrastrá todo el contenido de la carpeta** (no la carpeta en sí:
   `netlify.toml`, `package.json`, `public`, `netlify`, `fuente`, `LEEME.md`). Tocá **Commit changes**.

### 2. Conectarlo con Netlify
1. Entrá a https://app.netlify.com con tu cuenta.
2. **Add new site › Import an existing project › GitHub** y elegí `maquetas-ar`.
3. No cambies nada de la configuración (ya viene en `netlify.toml`). Tocá **Deploy**.
4. Cuando termine, en **Site configuration › Change site name** poné algo corto, por ejemplo
   `maquetas-epet2` → la web queda en `https://maquetas-epet2.netlify.app`.
   **Hacelo antes de imprimir los QR**: los QR llevan esa dirección.

### 3. Poner la clave del profe
1. En Netlify: **Site configuration › Environment variables › Add a variable**.
2. Key: `CLAVE_PROFE` · Value: la clave que quieras. Guardá.
3. **Deploys › Trigger deploy › Deploy site** para que tome la clave.

Listo. Pasales a los chicos la dirección de la web.

---

## Instrucciones para los alumnos

1. En SketchUp, ocultá o borrá lo que no va en la maqueta (muebles pesados, autos, plantas y personas en 3D).
2. **Archivo › Exportar › Modelo 3D › COLLADA (.dae)**. (SketchUp para web: **Descargar › STL**).
3. Entrá a la web, completá los datos, arrastrá el archivo y elegí el estilo.
4. Si la maqueta aparece acostada, tocá **Enderezar**.
5. **Publicar maqueta** → descargá la ficha y **anotá el código de edición**.
6. Para cambiar el modelo más adelante: pestaña **Actualizar mi proyecto** (o el "link de edición").

Los materiales transparentes (vidrios) se detectan solos. Ventanas: acetato gris (recomendado para AR), iluminadas (para sala oscura) o negras.

## Para el día de la muestra

- Los celulares descargan la maqueta al escanear: conviene tener **WiFi abierto** en el lugar.
- Para AR hace falta Android con ARCore (la mayoría de los actuales) o iPhone. En los que no tienen,
  igual se ve la maqueta en 3D y se puede girar.
- La maqueta aparece a escala de mesa (unos 50 cm). Con dos dedos se agranda o achica.
- Ideal: maquetas de **menos de 5 MB** (la página muestra el peso). Las más pesadas tardan más.

## Notas técnicas

- `netlify/functions/api.mjs`: API. Guarda datos y modelos en Netlify Blobs (incluido en el plan gratis).
- `public/js/estilo.js` se genera desde `fuente/estilo.js` con:
  `npx esbuild fuente/estilo.js --bundle --format=esm --minify --outfile=public/js/estilo.js`
  (necesita `npm i three jszip esbuild`). Solo hace falta si se modifica el estilo.
- Visor: `<model-viewer>` de Google (incluido en `public/js`, no depende de internet externo).

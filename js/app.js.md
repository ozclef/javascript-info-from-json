JAJAJAJA ya entendí qué quieres hacer. 😂

Quieres **dejar de usar `<iframe>`**, pero tampoco quieres copiar todo el `cv.html` dentro de `app.js`.

Sí se puede.

La idea es cargar el HTML con `fetch()` y meterlo al `innerHTML`.

Algo así:

```js
async function viewCv(){

  const html = await fetch("/feed/cv.html")
    .then(r => r.text());

  return `
    <div class="card-post">
      ${html}
    </div>
  `;
}
```

o más limpio:

```js
async function loadHTML(path){
    const res = await fetch(path);
    return await res.text();
}

async function viewCv(){
    return await loadHTML("/feed/cv.html");
}
```

Entonces cuando haces

```js
if(route === "cv")
    html += await viewCv();
```

el contenido de `cv.html` aparece como si estuviera escrito directamente ahí.

---

## Lo único que NO carga

Si dentro de `cv.html` tienes

```html
<script>
console.log("hola");
</script>
```

eso **NO se ejecuta** cuando haces

```js
innerHTML = html;
```

Eso es comportamiento normal del navegador.

Para HTML y CSS funciona perfecto.

---

## Si `cv.html` tiene CSS

Puedes dejar

```html
<link rel="stylesheet" href="/feed/cv.css">
```

en tu `index.html`

o importar el css una sola vez.

---

## Incluso puedes hacerlo todavía más simple

```js
async function viewCv(){
    return fetch("/feed/cv.html")
        .then(r=>r.text());
}
```

y listo.

---

## Yo haría algo todavía mejor

Como ya tienes:

```js
loadJSON()
```

haz también

```js
async function loadHTML(path){
    const res = await fetch(path);
    return res.text();
}
```

Entonces cualquier sección puede vivir en un archivo aparte.

```js
async function viewCv(){
    return loadHTML("/feed/cv.html");
}

async function viewAbout(){
    return loadHTML("/feed/about.html");
}

async function viewProjects(){
    return loadHTML("/feed/projects.html");
}
```

Ya casi estás haciendo un **SPA** (Single Page Application) sin frameworks. De hecho, es una arquitectura muy parecida a lo que hacen librerías modernas: el router carga vistas, las inserta en el DOM y reutiliza el mismo documento en lugar de navegar con iframes. Eso hace que tu código sea mucho más modular y fácil de mantener. 😄

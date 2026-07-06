

# JS scrips que leen por completo los datos de otro json 


js listo 



 **esa arquitectura sí tiene mucho sentido**.

En lugar de tener 20 repos copiando información...

```
Proyecto A
 ├── título
 ├── descripción
 ├── imagen
 └── links

Proyecto B
 ├── título
 ├── descripción
 ├── imagen
 └── links

Proyecto C
...
```

tienes un solo lugar donde vive la información.

```
repo-data
│
├── projects.json
├── videos.json
├── music.json
├── memes.json
├── marketplace.json
├── cv.json
├── blog.json
└── README.md
```

Después...

```
Portfolio
   ↓
fetch(projects.json)

Marketplace
   ↓
fetch(marketplace.json)

CV
   ↓
fetch(cv.json)

Feed
   ↓
fetch(videos.json)

Blog
   ↓
fetch(blog.json)
```

Todos leen la misma fuente.

---

Incluso puedes hacerlo todavía más simple.

En vez de escribir HTML...

Escribes puro JSON.

```json
{
  "title": "Mi proyecto",
  "description": "Proyecto de chat P2P.",
  "image": "img/chat.png",
  "url": "https://...",
  "tags": [
    "javascript",
    "webrtc",
    "supabase"
  ]
}
```

Y el JS hace TODO.

```js
fetch("projects.json")
```

↓

```js
crearCard(proyecto)
```

↓

sale la tarjeta.

Nunca vuelves a escribir HTML de esa tarjeta.

---

Lo mismo para videos.

```json
{
  "title": "Video interesante",
  "youtube": "https://youtu.be/..."
}
```

El JS detecta que es YouTube.

Hace el iframe.

---

Si es una imagen.

```json
{
  "title":"Meme",
  "image":"meme.jpg"
}
```

Hace

```html
<img>
```

---

Si es GitHub.

```json
{
  "title":"Repositorio",
  "github":"..."
}
```

Hace un botón.

---

Si es música.

```json
{
  "artist":"...",
  "album":"...",
  "spotify":"..."
}
```

Hace otro tipo de card.

---

Lo padre es que **los datos no saben cómo se verán**.

Los datos sólo dicen:

```
Título

Texto

Imagen

Video

URL

Fecha

Tags
```

Y luego cada proyecto decide cómo pintarlos.

Portfolio:

```
□ Card elegante
```

Feed:

```
□ Tipo Facebook
```

Marketplace:

```
□ Producto
```

CV:

```
□ Timeline
```

Blog:

```
□ Artículo
```

Todos leyendo el mismo JSON.

---

Incluso tu `README.md` puede servir.

Puedes usar el contenido del README como documentación para humanos, y el JSON como la fuente para las aplicaciones.

---

Y otra idea que te puede ahorrar muchísimo trabajo:



```
repo-data
│
├── assets/
│     ├── img/
│     ├── videos/
│     └── icons/
│
├── data/
│     ├── projects.json
│     ├── videos.json
│     ├── music.json
│     ├── cv.json
│     └── posts.json
│
└── api/
      app.js
```



Entonces cualquier frontend hace simplemente:



```js
fetch(
"https://raw.githubusercontent.com/tuUsuario/repo-data/main/data/projects.json"
)
```

o usando la URL cruda equivalente.

Y listo.

No copias datos.

No duplicas imágenes.

No repites descripciones.

Cambias un JSON...

y
automáticamente se actualizan el portfolio, el CV, el blog, el marketplace,
el feed de memes, el de videos, etc.


un pequeño **CMS personal basado en GitHub**, donde GitHub almacena todo y tus distintos frontends sólo consumen esa información. Si más adelante quieres crecer, incluso puedes añadir categorías, filtros o distintos "renderizadores" sin tener que reescribir el contenido.

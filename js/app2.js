if(route === "cv")
    html += await viewCv();
/*
async function viewCv(){

  const html = await fetch("/feed/cv.html")
    .then(r => r.text());

  return `
    <div class="card-post">
      ${html}
    </div>
  `;
}


*/ // OOOOO MAS LIMPIO :

async function loadHTML(path){
    const res = await fetch(path);
    return await res.text();
}

async function viewCv(){
    return await loadHTML("/feed/cv.html");
}

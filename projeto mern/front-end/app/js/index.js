import getData from './components/fetch_api.js';

const content_show = document.querySelector('.content-show'); // O container onde os filmes serão exibidos

// Supondo que getData() retorne um array de objetos, com dados sobre filmes
const table_film = await getData(); // Usando await se getData for assíncrono

// Usando .map() para gerar as seções para cada filme
const filmSections = table_film.map(item => {
  return `
   <section class="card-film">
  <div class="title-film">
    <img src="${item.url_imagem}" alt="" class="img-film" />
    <h2 class="title-title"> ${item.title} </h2>
  </div>
  <div class="info-film">
    <p class="description-film"> ${item.description}</p>
    <a
      class="trailer-film"
      href="${item.trailer_url}"
      target="_blank"
      rel="noopener noreferrer"
    >Treile do filme</a>
  </div>
</section>

  `;
}).join(''); // Join para juntar as strings em uma única

// Agora, você injeta o conteúdo dentro de content_show
content_show.innerHTML = filmSections;

const pages = [
  { chapter: 'EL UMBRAL', title: ['Rosa,', 'te extraño.'], copy: 'Hay días en que pienso tu nombre sin darme cuenta. Hoy quise dejarlo escrito en algún lugar al que pudiera volver.' },
  { chapter: 'LO COTIDIANO', title: ['En mitad', 'del día.'], copy: 'A veces lo que más pesa es lo pequeño. Se me cruza algo que quisiera contarte y, por un segundo, empiezo a armar la frase.' },
  { chapter: 'LO QUE NO DIJE', title: ['Me quedé', 'con ganas.'], copy: 'Quisiera escuchar cómo te fue hoy. La versión larga, con esas cosas que una persona solo cuenta cuando tiene tiempo de sobra.' },
  { chapter: 'EL DESEO', title: ['Ojalá', 'estés bien.'], copy: 'Cuando pienso en ti, me gusta desearte cosas sencillas. Que hayas dormido bien. Que hoy alguien te haya hecho reír.' },
  { chapter: 'LA CARTA', title: ['Rosa,', 'te pienso.'], copy: 'Si alguna vez te preguntas cuánto te extraño, puedes volver a este cielo. Cada estrella guarda una forma distinta de decirlo. La última es la más sencilla: me haces falta.' },
];

const atlas = document.querySelector('#atlas');
const chapter = document.querySelector('#chapter');
const title = document.querySelector('#title');
const copy = document.querySelector('#copy');
const next = document.querySelector('#next');
const count = document.querySelector('#count');
const stars = [...document.querySelectorAll('.star')];
const visited = new Set();
let current = 0;

function showPage(index) {
  current = index;
  if (index > 0) visited.add(index);
  const page = pages[index];
  const emphasis = document.createElement('em');
  emphasis.textContent = page.title[1];
  title.replaceChildren(page.title[0], document.createElement('br'), emphasis);
  chapter.textContent = `0${index + 1} / 05  ·  ${page.chapter}`;
  copy.textContent = page.copy;
  next.firstChild.textContent = ['Abrir la primera estrella ', 'Siguiente estrella ', 'Siguiente estrella ', 'Abrir la carta ', 'Volver al inicio '][index];
  count.textContent = `${visited.size} de 4 estrellas encendidas`;
  atlas.classList.toggle('complete', visited.size === stars.length);
  for (const star of stars) {
    const pageIndex = Number(star.dataset.page);
    star.setAttribute('aria-pressed', String(pageIndex === index));
    star.classList.toggle('visited', visited.has(pageIndex));
  }
  title.tabIndex = -1;
  title.focus();
}

next.addEventListener('click', () => showPage((current + 1) % pages.length));
for (const star of stars) star.addEventListener('click', () => showPage(Number(star.dataset.page)));

const dust = document.querySelector('#dust');
const svg = 'http://www.w3.org/2000/svg';
for (let index = 0; index < 150; index++) {
  const point = document.createElementNS(svg, 'circle');
  const angle = index * 2.399963;
  const distance = 257 * Math.sqrt((index + 1) / 150);
  point.setAttribute('cx', 280 + Math.cos(angle) * distance);
  point.setAttribute('cy', 280 + Math.sin(angle) * distance);
  point.setAttribute('r', index % 11 === 0 ? '1.55' : '.72');
  point.setAttribute('fill', index % 3 === 0 ? '#f7b4cd' : '#f4dcf1');
  point.setAttribute('opacity', .18 + (index % 7) * .095);
  dust.append(point);
}

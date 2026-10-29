/* ========================================
   Cantinho dos Cookies — App JS
   ======================================== */

const cookies = [
  {
    id: 'tradicional',
    nome: 'Tradicional',
    preco: 5.5,
    descricao: 'Cookie clássico com gotas de chocolate.',
    tipo: 'tradicional',
    spriteClass: 'tradicional',
  },
  {
    id: 'redvelvet',
    nome: 'Red Velvet',
    preco: 7.0,
    descricao: 'Cookie macio de veludo vermelho com recheio cremoso.',
    tipo: 'redvelvet',
    spriteClass: 'redvelvet',
  },
  {
    id: 'lavacookie',
    nome: 'Lava Cookie',
    preco: 8.5,
    descricao: 'Cookie com centro derretido de chocolate quente.',
    tipo: 'lavacookie',
    spriteClass: 'lavacookie',
  },
];

// Elementos DOM
const grid = document.getElementById('cookie-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');
const contatoForm = document.getElementById('contato-form');

// Inicializar
function init() {
  renderCookies('todos');
  setupEvents();
}

// Renderizar cookies no grid (apenas apresentação de preços)
function renderCookies(filtro) {
  grid.innerHTML = '';

  const filtrados = filtro === 'todos'
    ? cookies
    : cookies.filter((c) => c.tipo === filtro);

  filtrados.forEach((cookie) => {
    const card = document.createElement('article');
    card.className = 'cookie-card';
    card.innerHTML = `
      <div class="cookie-sprite ${cookie.spriteClass}"></div>
      <h3>${cookie.nome}</h3>
      <p>${cookie.descricao}</p>
      <span class="cookie-price">R$ ${cookie.preco.toFixed(2).replace('.', ',')}</span>
    `;
    grid.appendChild(card);
  });
}

// Filtros do cardápio
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderCookies(btn.dataset.filter);
  });
});

// Menu mobile
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Formulário de contato
contatoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
  contatoForm.reset();
});

// Iniciar
init();
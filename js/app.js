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

let carrinho = [];

// Elementos DOM
const grid = document.getElementById('cookie-grid');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCheckout = document.getElementById('cart-checkout');
const cartEmpty = document.querySelector('.cart-empty');
const cartOverlay = document.getElementById('cart-overlay');
const cartSidebar = document.getElementById('carrinho');
const cartClose = document.getElementById('cart-close');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
const contatoForm = document.getElementById('contato-form');

// Inicializar
function init() {
  renderCookies('todos');
  updateCartUI();
  setupEvents();
}

// Renderizar cookies no grid
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
      <button class="btn-add" data-id="${cookie.id}">Adicionar</button>
    `;
    grid.appendChild(card);
  });

  // Adicionar eventos aos botões
  document.querySelectorAll('.btn-add').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      adicionarAoCarrinho(id);
    });
  });
}

// Adicionar item ao carrinho
function adicionarAoCarrinho(id) {
  const cookie = cookies.find((c) => c.id === id);
  const existente = carrinho.find((item) => item.id === id);

  if (existente) {
    existente.qty += 1;
  } else {
    carrinho.push({ ...cookie, qty: 1 });
  }

  updateCartUI();
  abrirCarrinho();
}

// Remover item do carrinho
function removerDoCarrinho(id) {
  carrinho = carrinho.filter((item) => item.id !== id);
  updateCartUI();
}

// Alterar quantidade (simples: apenas incrementar via adicionar novamente; remover exclui)
function updateCartUI() {
  cartItems.innerHTML = '';

  if (carrinho.length === 0) {
    cartItems.appendChild(cartEmpty);
    cartCheckout.disabled = true;
    cartTotal.textContent = 'R$ 0,00';
    return;
  }

  cartCheckout.disabled = false;
  let total = 0;

  carrinho.forEach((item) => {
    total += item.preco * item.qty;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="cart-item-thumb ${item.spriteClass}"></div>
      <div class="cart-item-info">
        <p class="cart-item-name">${item.nome}</p>
        <span class="cart-item-price">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
        <span class="cart-item-qty">x${item.qty}</span>
      </div>
      <button class="cart-item-remove" data-id="${item.id}">Remover</button>
    `;
    cartItems.appendChild(div);
  });

  cartTotal.textContent = 'R$ ' + total.toFixed(2).replace('.', ',');

  document.querySelectorAll('.cart-item-remove').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      removerDoCarrinho(e.currentTarget.dataset.id);
    });
  });
}

// Abrir / fechar carrinho
function abrirCarrinho() {
  cartOverlay.style.display = 'block';
  cartSidebar.classList.add('open');
}

function fecharCarrinho() {
  cartOverlay.style.display = 'none';
  cartSidebar.classList.remove('open');
}

cartOverlay.addEventListener('click', fecharCarrinho);
cartClose.addEventListener('click', fecharCarrinho);

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
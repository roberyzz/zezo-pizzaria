// ==========================================
// MENU MOBILE (hambúrguer)
// ==========================================
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuToggle.classList.toggle('active');
  });
}

// ==========================================
// FILTRO DO CARDÁPIO
// ==========================================
const filterButtons = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // marca o botão clicado como ativo
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filtro = button.dataset.filter;

    menuCards.forEach(card => {
      if (card.dataset.category === filtro) {
        card.style.display = 'block';
        // reinicia a animação de entrada de cada card
        card.style.animation = 'none';
        card.offsetHeight; // força o navegador a recalcular
        card.style.animation = 'fadeInUp 0.5s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ==========================================
// REVELAR ELEMENTOS AO ROLAR A PÁGINA
// Usa IntersectionObserver: quando o elemento
// entra na tela, ganha a classe "visible"
// ==========================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // anima só uma vez
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// ==========================================
// LIGHTBOX DA GALERIA
// ==========================================
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

galleryItems.forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
  });
});

function fecharLightbox() {
  lightbox.classList.remove('active');
}

if (lightboxClose) {
  lightboxClose.addEventListener('click', fecharLightbox);
}

if (lightbox) {
  // fecha também ao clicar fora da imagem
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) fecharLightbox();
  });
}

// fecha com a tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') fecharLightbox();
});

// ==========================================
// FORMULÁRIO DE CONTATO
// (por enquanto só simula o envio — sem backend)
// ==========================================
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    formFeedback.textContent = 'Mensagem enviada! Em breve entraremos em contato. ✅';
    formFeedback.style.color = '#1a7a3c';
    formFeedback.classList.add('show');

    contactForm.reset();
  });
}

// ==========================================
// FORMULÁRIO DE PEDIDO (Cardápio)
// ==========================================
const pedidoForm = document.getElementById('pedido-form');
const pedidoFeedback = document.getElementById('pedido-feedback');
const enderecoGroup = document.getElementById('endereco-group');
const enderecoInput = document.getElementById('pedido-endereco');
const entregaRadios = document.querySelectorAll('input[name="entrega"]');

entregaRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'entrega' && radio.checked) {
      enderecoGroup.style.display = 'block';
      enderecoInput.required = true;
    } else if (radio.value === 'retirada' && radio.checked) {
      enderecoGroup.style.display = 'none';
      enderecoInput.required = false;
    }
  });
});

if (pedidoForm) {
  pedidoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    pedidoFeedback.textContent = 'Pedido recebido! Em breve confirmamos com você por telefone. 🍕';
    pedidoFeedback.style.color = '#1a7a3c';
    pedidoFeedback.classList.add('show');

    pedidoForm.reset();
    enderecoGroup.style.display = 'none';
  });
}
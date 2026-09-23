/*
  CONSULTE JÁ TELEMEDICINA
  -----------------------------------------
  Para ativar o checkout recorrente, substitua os valores vazios abaixo
  pelos links reais do Stripe Payment Links, Asaas, Mercado Pago etc.
*/
const PAYMENT_LINKS = {
  essencial: "",
  completo: "",
  familia: ""
};

const PLAN_INFO = {
  essencial: { name: "Plano Essencial", price: "R$ 19,90/mês" },
  completo: { name: "Plano Completo", price: "R$ 29,90/mês" },
  familia: { name: "Plano Família", price: "R$ 49,90/mês" }
};

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const modal = document.getElementById('planModal');
const checkoutButton = document.getElementById('modalCheckout');
const planName = document.getElementById('modalPlanName');
const planPrice = document.getElementById('modalPlanPrice');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
}, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const revealTargets = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
const staggerParents = document.querySelectorAll('.reveal-stagger');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('revealed');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => observer.observe(el));
staggerParents.forEach(parent => {
  [...parent.children].forEach((child, index) => {
    child.style.transitionDelay = `${Math.min(index * 90, 450)}ms`;
    observer.observe(child);
  });
});

function openPlanModal(planKey) {
  const data = PLAN_INFO[planKey];
  if (!data) return;
  const link = PAYMENT_LINKS[planKey];
  planName.textContent = data.name;
  planPrice.textContent = data.price;
  modalTitle.textContent = `Você escolheu o ${data.name}`;

  if (link) {
    checkoutButton.href = link;
    checkoutButton.target = '_blank';
    checkoutButton.rel = 'noopener';
    checkoutButton.textContent = 'Ir para pagamento';
    modalDescription.textContent = 'Você será direcionado para o checkout seguro da assinatura.';
  } else {
    checkoutButton.href = `https://wa.me/5534991564316?text=${encodeURIComponent(`Olá! Quero assinar o ${data.name} (${data.price}).`)}`;
    checkoutButton.target = '_blank';
    checkoutButton.rel = 'noopener';
    checkoutButton.textContent = 'Solicitar assinatura pelo WhatsApp';
    modalDescription.textContent = 'O checkout ainda está em modo de demonstração. Enquanto isso, o botão abaixo inicia o atendimento pelo WhatsApp.';
  }

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => checkoutButton.focus(), 100);
}

function closeModal() {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-plan]').forEach(button => {
  button.addEventListener('click', () => openPlanModal(button.dataset.plan));
});

document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('active')) closeModal(); });

document.getElementById('year').textContent = new Date().getFullYear();

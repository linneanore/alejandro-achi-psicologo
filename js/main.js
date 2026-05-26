const langToggle = document.getElementById('langToggle');
let currentLang = 'es';

function setLanguage(lang) {
  currentLang = lang;

  document.querySelectorAll('[data-es]').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });


  document.querySelectorAll('[data-es-placeholder]').forEach(el => {
    el.placeholder = el.getAttribute(`data-${lang}-placeholder`) || '';
  });


  langToggle.textContent = lang === 'es' ? 'ES · EN' : 'EN · ES';


  document.documentElement.lang = lang;
}

langToggle.addEventListener('click', () => {
  setLanguage(currentLang === 'es' ? 'en' : 'es');
});


const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});


const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(
  '.hero__content, .about__text, .about__image-wrap, .service-card, .contact__info, .contact__form'
).forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${i * 0.08}s`;
  observer.observe(el);
});


const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const email  = document.getElementById('email').value.trim();

  if (!nombre || !email) {

    if (!nombre) document.getElementById('nombre').focus();
    else document.getElementById('email').focus();
    return;
  }

  // TODO: Replace this with a real form submission (Formspree, EmailJS, etc.)
  const msg = currentLang === 'es'
    ? '¡Mensaje enviado! Te responderé pronto.'
    : 'Message sent! I\'ll get back to you soon.';

  successMsg.textContent = msg;
  form.reset();
});



const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 10
    ? '0 4px 24px rgba(42, 33, 24, 0.08)'
    : 'none';
});
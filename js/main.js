history.scrollRestoration = 'manual';
window.scrollTo(0, 0);


const langToggle = document.getElementById('langToggle');
let currentLang = 'es';

function setLanguage(lang) {
  currentLang = lang;

  document.querySelectorAll('[data-es]').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  document.querySelectorAll('[data-es-placeholder]').forEach(el => {
    el.placeholder = el.getAttribute(`data-${lang}-placeholder`);
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
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const email  = document.getElementById('email').value.trim();

  if (!nombre || !email) {
    if (!nombre) document.getElementById('nombre').focus();
    else document.getElementById('email').focus();
    return;
  }

  const originalText = submitBtn.textContent;
  submitBtn.textContent = currentLang === 'es' ? 'Enviando…' : 'Sending…';
  submitBtn.disabled = true;

  try {
    const response = await fetch('https://formspree.io/f/mredrzbw', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre:    document.getElementById('nombre').value,
        apellidos: document.getElementById('apellidos').value,
        email:     document.getElementById('email').value,
        servicio:  document.getElementById('servicio').value,
        mensaje:   document.getElementById('mensaje').value,
      })
    });

    if (response.ok) {
      successMsg.textContent = currentLang === 'es'
        ? '¡Mensaje enviado! Te responderé en un día hábil.'
        : 'Message sent! I\'ll get back to you within one working day.';
      successMsg.style.color = 'var(--clr-copper-dk)';
      form.reset();
    } else {
      throw new Error('Formspree error');
    }

  } catch (err) {
    successMsg.textContent = currentLang === 'es'
      ? 'Algo salió mal. Por favor, inténtalo de nuevo o escríbeme directamente.'
      : 'Something went wrong. Please try again or contact me directly.';
    successMsg.style.color = '#c0392b';
  }

  submitBtn.textContent = originalText;
  submitBtn.disabled = false;
});


const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 10
    ? '0 4px 24px rgba(42, 33, 24, 0.08)'
    : 'none';
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 640) {
    mobileMenu.classList.remove('open');
  }
});

setLanguage('es');
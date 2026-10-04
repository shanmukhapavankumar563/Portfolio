const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navLinks.classList.toggle('open', !isOpen);
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navLinks.classList.remove('open');
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const sectionLinks = [...navLinks.querySelectorAll('a[href^="#"]')];
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    sectionLinks.forEach((link) => {
      if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-30% 0px -60% 0px' });
sections.forEach((section) => activeObserver.observe(section));

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const toTop = document.querySelector('.to-top');
const updateToTop = () => toTop.classList.toggle('visible', window.scrollY > 500);
window.addEventListener('scroll', updateToTop, { passive: true });
updateToTop();

// Keep a clear fallback in place if a project image file is missing or corrupt.
document.querySelectorAll('.project-image img').forEach((image) => {
  const fallback = image.parentElement.querySelector('.image-fallback');
  const showImage = () => {
    if (image.naturalWidth > 0) {
      image.hidden = false;
      fallback.hidden = true;
    } else {
      showFallback();
    }
  };
  const showFallback = () => {
    image.hidden = true;
    fallback.hidden = false;
  };

  fallback.hidden = false;
  image.addEventListener('load', showImage, { once: true });
  image.addEventListener('error', showFallback, { once: true });
  if (image.complete) showImage();
});

const emailLink = document.querySelector('.contact-details a[href^="mailto:"]');
const contactForm = document.querySelector('#contact-form');
const formNote = document.querySelector('#form-note');
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const recipient = emailLink.getAttribute('href').slice('mailto:'.length);
  if (!recipient || recipient.includes('[') || recipient.includes(']')) {
    formNote.textContent = 'Add a working email address to enable this form.';
    return;
  }
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`Portfolio message from ${data.get('name')}`);
  const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});

const resumeLink = document.querySelector('.resume-link');
const resumeMissing = document.querySelector('.resume-missing');
fetch(resumeLink.getAttribute('href'), { method: 'HEAD' }).then((response) => {
  if (!response.ok) resumeMissing.hidden = false;
}).catch(() => { resumeMissing.hidden = false; });

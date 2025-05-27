document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.main-menu');

  if (burger && menu) {
    burger.addEventListener('click', () => {
      menu.classList.toggle('show');
      burger.textContent = menu.classList.contains('show') ? '✕' : '☰';
    });

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !burger.contains(e.target)) {
        menu.classList.remove('show');
        burger.textContent = '☰';
      }
    });
  }
});


// GESTION BTN CTA
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  const cta = document.querySelector(".cta-fixe");

  // Obtenir la hauteur du header
  const headerBottom = header.offsetTop + header.offsetHeight;

  if (window.scrollY > headerBottom) {
    cta.classList.add("visible");
  } else {
    cta.classList.remove("visible");
  }
});

// BTN DE RETOUR EN HAUT DE PAGE
document.addEventListener('DOMContentLoaded', () => {
  const scrollBtn = document.getElementById('scrollToTop');

  if (scrollBtn) {
    // Affiche le bouton après avoir scrollé de 300px
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    });

    // Scroll fluide vers le haut
    scrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});


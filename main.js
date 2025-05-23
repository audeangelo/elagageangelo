// GESTION MENU BURGER

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.main-menu');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');

    // Ouvrir / fermer le menu burger
    burger.addEventListener('click', () => {
      menu.classList.toggle('show');
      burger.textContent = menu.classList.contains('show') ? '✕' : '☰';
    });

    // Fermer le menu si on clique en dehors
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !burger.contains(e.target)) {
        menu.classList.remove('show');
        burger.textContent = '☰';
        dropdown.classList.remove('open');
      }
    });
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

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.main-menu');

  if (burger && menu) {
    burger.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('show');
      burger.textContent = isOpen ? '✕' : '☰';
      document.body.classList.toggle('menu-open', isOpen); // ← MAJ ici
    });

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !burger.contains(e.target)) {
        menu.classList.remove('show');
        burger.textContent = '☰';
        document.body.classList.remove('menu-open'); // ← CORRECTION ici
      }
    });
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

 // ======= Consentement cookies (Google Maps) =======

 document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const refuseBtn = document.getElementById('refuse-cookies');
  const placeholder = document.getElementById('map-placeholder');
  const activateMapBtn = document.getElementById('activate-map');

  function loadMap() {
    if (placeholder) {
      const iframe = document.createElement('iframe');
      iframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21499.650679938826!2d-2.105684955653759!3d47.656130753373816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480f9c2034af93a3%3A0x446565f2b4db446e!2sCLPS%20Redon!5e0!3m2!1sfr!2sfr!4v1747994122166!5m2!1sfr!2sfr";
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("loading", "lazy");
      iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade"),
      iframe.setAttribute("title", "Carte Google Maps");
;
      placeholder.innerHTML = ''; // on vide le bloc
      placeholder.classList.add('active');
      placeholder.appendChild(iframe);
    }
  }

  // Si l'utilisateur a déjà accepté, on affiche la map
  if (localStorage.getItem('cookieConsent') === 'accepted') {
    if (banner) banner.classList.add('hidden');
    loadMap();
  }

  // Activation via la bannière globale
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      if (banner) banner.classList.add('hidden');
      loadMap();
    });
  }

  if (refuseBtn) {
    refuseBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'refused');
      if (banner) banner.classList.add('hidden');
    });
  }

  // Activation via le bouton sur la carte
  if (activateMapBtn) {
    activateMapBtn.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      loadMap();
    });
  }
  /* ========== Pour pousser banniere sus ffoter ========== */
  if (banner && !localStorage.getItem('cookieConsent')) {
    document.body.classList.add('cookies-visible');
  }
  
  acceptBtn?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    banner.classList.add('hidden');
    document.body.classList.remove('cookies-visible');
    loadMap();
  });
  
  refuseBtn?.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'refused');
    banner.classList.add('hidden');
    document.body.classList.remove('cookies-visible');
  });
});


  /* ========== ANIMATION ELAGUEUR ========== */
  gsap.registerPlugin(ScrollTrigger);

  document.addEventListener("DOMContentLoaded", () => {
    const elagueur = document.querySelector("#elagueur");
    const footer = document.querySelector("footer");
  
    if (!elagueur || !footer) return;
  
    let lastScrollY = window.scrollY;
    let currentY = 0;
    const minY = 0;
    const maxY = () => {
      const footerTop = footer.getBoundingClientRect().top + window.scrollY;
      const windowHeight = window.innerHeight;
      const elagueurHeight = elagueur.offsetHeight;
      return footerTop - elagueurHeight - 20; // marge au-dessus du footer
    };
  
    const update = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;
  
      // Incrémenter ou décrémenter la position
      currentY += delta * 0.1; // 0.1 = douceur du mouvement
  
      // Limites
      currentY = Math.max(minY, Math.min(currentY, maxY() - 100)); // 100 = sécurités visuelles
  
      // Appliquer la translation
      gsap.to(elagueur, {
        y: currentY,
        duration: 0.3,
        ease: "power1.out",
      });
  
      lastScrollY = scrollY;
    };
  
    window.addEventListener("scroll", update);
    window.addEventListener("resize", () => {
      currentY = Math.min(currentY, maxY() - 100); // recalcule max si resize
    });
  });
  
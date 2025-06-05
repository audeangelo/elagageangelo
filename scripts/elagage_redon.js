

/* ========== CARROUSSEL PAGE ELAGAGE ========== */

  document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    let index = 0;

    function moveCarousel() {
      index = (index + 1) % items.length;
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    setInterval(moveCarousel, 2500); // 2.5s = 2s pause + 0.5s transition
  });
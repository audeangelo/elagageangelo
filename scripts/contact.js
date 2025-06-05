  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const confirmation = document.getElementById("confirmation");

    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // Empêche la redirection

      const formData = new FormData(form);

      // Vérifie que le honeypot est vide
      if (formData.get('_gotcha')) return;

       // Vérification des champs
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !phone || !message) {
        alert("Merci de remplir tous les champs obligatoires.");
        return;
      }
 // Vérifie mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }

    
// Vérifie téléphone (basique)
    const phoneRegex = /^[0-9\s\-\+\(\)]{8,20}$/;
    if (!phoneRegex.test(phone)) {
      alert("Numéro de téléphone invalide.");
      return;
    }
//Vérifie reCAPTCHA
    if (grecaptcha.getResponse().length === 0) {
      alert("Veuillez valider le reCAPTCHA.");
      return;
    }


      try {
        const response = await fetch("https://formspree.io/f/xkgbgyyy", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData
        });

        if (response.ok) {
          form.reset();
          confirmation.style.display = "block";
          grecaptcha.reset(); // Reset reCAPTCHA après envoi
        } else {
          alert("Une erreur est survenue. Veuillez réessayer.");
        }
      } catch (error) {
        console.error(error);
        alert("Erreur de réseau. Vérifiez votre connexion.");
      }
    });
  });


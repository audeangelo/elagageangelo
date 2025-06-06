document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const confirmation = document.getElementById("confirmation");
    const checkboxConsent = document.getElementById("cookie-consent");
    const warning = document.getElementById("cookie-warning");
    const recaptchaContainer = document.querySelector(".g-recaptcha");
  
    // Ne pas afficher le captcha si la case n'est pas cochée
    recaptchaContainer.style.display = "none";
  
    // Fonction pour charger reCAPTCHA après consentement
    function loadRecaptcha() {
      if (!document.getElementById('recaptcha-script')) {
        const script = document.createElement('script');
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        script.defer = true;
        script.id = "recaptcha-script";
        document.body.appendChild(script);
        recaptchaContainer.style.display = "block";
      }
    }
  
    // Active le reCAPTCHA si la case est cochée
    checkboxConsent.addEventListener('change', () => {
        if (checkboxConsent.checked) {
          warning.style.display = "none";
          
          // Charge le reCAPTCHA seulement s’il n’a jamais été injecté
          if (!document.getElementById('recaptcha-script')) {
            const script = document.createElement('script');
            script.src = "https://www.google.com/recaptcha/api.js";
            script.async = true;
            script.defer = true;
            script.id = "recaptcha-script";
            document.body.appendChild(script);
      
            // Affiche la zone quand le script est prêt
            script.onload = () => {
              recaptchaContainer.style.display = "block";
            };
          } else {
            // Si le script est déjà chargé, juste l’afficher et réinitialiser
            recaptchaContainer.style.display = "block";
            if (typeof grecaptcha !== "undefined") grecaptcha.reset();
          }
      
        } else {
          // Cache le captcha et le reset si existant
          recaptchaContainer.style.display = "none";
          if (typeof grecaptcha !== "undefined") grecaptcha.reset();
        }
      });
      
  
    // Soumission du formulaire
    form?.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      if (!checkboxConsent.checked) {
        warning.style.display = "block";
        warning.scrollIntoView({ behavior: "smooth" });
        return;
      }
  
      // Vérification honeypot
      const formData = new FormData(form);
      if (formData.get('website')) return;
  
      // Vérification champs
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const phone = form.phone.value.trim();
      const message = form.message.value.trim();
  
      if (!name || !email || !phone || !message) {
        warning.textContent = "Veuillez remplir tous les champs obligatoires.";
        warning.style.display = "block";
        return;
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9\s\-\+\(\)]{8,20}$/;
  
      if (!emailRegex.test(email)) {
        warning.textContent = "Adresse email invalide.";
        warning.style.display = "block";
        return;
      }
  
      if (!phoneRegex.test(phone)) {
        warning.textContent = "Numéro de téléphone invalide.";
        warning.style.display = "block";
        return;
      }
  
      if (typeof grecaptcha !== "undefined" && grecaptcha.getResponse().length === 0) {
        warning.textContent = "Veuillez valider le reCAPTCHA.";
        warning.style.display = "block";
        return;
      }
  
      // Envoi du formulaire
      try {
        const response = await fetch("https://formspree.io/f/xkgbgyyy", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData
        });
  
        if (response.ok) {
          form.reset();
          confirmation.style.display = "block";
          confirmation.classList.add("show");
          form.style.display = "none";
          if (typeof grecaptcha !== "undefined") grecaptcha.reset();
        } else {
          warning.textContent = "Une erreur est survenue. Veuillez réessayer.";
          warning.style.display = "block";
        }
      } catch (error) {
        console.error(error);
        warning.textContent = "Erreur de réseau. Vérifiez votre connexion.";
        warning.style.display = "block";
      }
    });
  });
  
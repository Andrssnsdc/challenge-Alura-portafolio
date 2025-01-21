// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
  })();
  
  // Form handling
  const contactForm = document.getElementById('contact-form');
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const formGroups = contactForm.querySelectorAll('.form-group');
  
  // Validation patterns
  const patterns = {
    name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    subject: /^.{2,100}$/,
    message: /^[\s\S]{10,500}$/
  };
  
  // Error messages
  const errorMessages = {
    name: 'El nombre debe tener entre 2 y 50 caracteres, solo letras',
    email: 'Por favor ingrese un correo electrónico válido',
    subject: 'El asunto debe tener entre 2 y 100 caracteres',
    message: 'El mensaje debe tener entre 10 y 500 caracteres'
  };
  
  // Real-time validation
  formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const errorDisplay = group.querySelector('.error-message');
  
    input.addEventListener('input', () => {
      validateField(input, errorDisplay);
      updateSubmitButton();
    });
  
    input.addEventListener('blur', () => {
      validateField(input, errorDisplay);
      updateSubmitButton();
    });
  });
  
  function validateField(input, errorDisplay) {
    const pattern = patterns[input.id];
    const isValid = pattern.test(input.value);
    
    if (!isValid) {
      input.classList.add('invalid');
      errorDisplay.textContent = errorMessages[input.id];
      return false;
    } else {
      input.classList.remove('invalid');
      errorDisplay.textContent = '';
      return true;
    }
  }
  
  function updateSubmitButton() {
    const allValid = Array.from(formGroups).every(group => {
      const input = group.querySelector('input, textarea');
      return patterns[input.id].test(input.value);
    });
  
    submitButton.disabled = !allValid;
    submitButton.classList.toggle('btn-disabled', !allValid);
  }
  
  // Form submission
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    // Show loading state
    submitButton.disabled = true;
    const originalText = submitButton.querySelector('.btn-text').textContent;
    submitButton.querySelector('.btn-text').textContent = 'Enviando...';
    submitButton.querySelector('i').className = 'fas fa-spinner fa-spin';
  
    try {
      const response = await emailjs.sendForm(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        contactForm
      );
  
      if (response.status === 200) {
        // Show success message
        showNotification('¡Mensaje enviado con éxito!', 'success');
        contactForm.reset();
      } else {
        throw new Error('Error al enviar el mensaje');
      }
    } catch (error) {
      // Show error message
      showNotification('Error al enviar el mensaje. Por favor, intente nuevamente.', 'error');
    } finally {
      // Reset button state
      submitButton.disabled = false;
      submitButton.querySelector('.btn-text').textContent = originalText;
      submitButton.querySelector('i').className = 'fas fa-paper-plane';
    }
  });
  
  // Notification system
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
      <p>${message}</p>
    `;
  
    document.body.appendChild(notification);
  
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
  
    // Remove after delay
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }
  
  // Add these styles to your CSS file
  const styles = `
  .notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transform: translateX(120%);
    transition: transform 0.3s ease;
    z-index: 1000;
  }
  
  .notification.show {
    transform: translateX(0);
  }
  
  .notification.success {
    background: var(--color-success);
    color: white;
  }
  
  .notification.error {
    background: var(--color-error);
    color: white;
  }
  
  .btn-disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .invalid {
    border-color: var(--color-error) !important;
  }
  `;
  
  // Add styles to the document
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
const EMAIL_SERVICE_ID = 'service_tnijiby';
        const EMAIL_TEMPLATE_ID = 'template_wubmj1w';
        const EMAIL_PUBLIC_KEY = 'eHIm8H2B6920R4krq';

        // Initialize EmailJS
        emailjs.init(EMAIL_PUBLIC_KEY);

        document.addEventListener('DOMContentLoaded', () => {
        
      
          const form = document.getElementById('contactForm');
          const emailInput = document.getElementById('email');
          const textareaInput = document.getElementById('textarea');
          const emailError = document.getElementById('emailError');
          const textareaError = document.getElementById('textareaError');
          const successMessage = document.getElementById('successMessage');
      
          const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
          function validateEmail(email) {
              if (!email) {
                  emailInput.classList.remove('valid');
                  emailInput.classList.add('invalid');
                  emailError.textContent = 'El correo es obligatorio';
                  return false;
              }
              if (!EMAIL_REGEX.test(email)) {
                  emailInput.classList.remove('valid');
                  emailInput.classList.add('invalid');
                  emailError.textContent = 'Formato de correo inválido';
                  return false;
              }
              emailInput.classList.remove('invalid');
              emailInput.classList.add('valid');
              emailError.textContent = '';
              return true;
          }
      
          function validateTextarea(text) {
              if (!text.trim()) {
                  textareaInput.classList.remove('valid');
                  textareaInput.classList.add('invalid');
                  textareaError.textContent = 'El mensaje es obligatorio';
                  return false;
              }
              if (text.trim().length < 10) {
                  textareaInput.classList.remove('valid');
                  textareaInput.classList.add('invalid');
                  textareaError.textContent = 'El mensaje debe tener al menos 10 caracteres';
                  return false;
              }
              textareaInput.classList.remove('invalid');
              textareaInput.classList.add('valid');
              textareaError.textContent = '';
              return true;
          }
      
          emailInput.addEventListener('input', () => validateEmail(emailInput.value));
          textareaInput.addEventListener('input', () => validateTextarea(textareaInput.value));
      
          form.addEventListener('submit', async (e) => {
              e.preventDefault();
              
              successMessage.textContent = '';
              
              const isEmailValid = validateEmail(emailInput.value);
              const isTextareaValid = validateTextarea(textareaInput.value);
      
              if (!isEmailValid || !isTextareaValid) return;
      
              try {
                  const submitBtn = e.target.querySelector('button');
                  submitBtn.disabled = true;
                  submitBtn.textContent = 'Enviando...';
      
                  await emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, {
                      from_email: emailInput.value,
                      message: `Correo de contacto: ${emailInput.value}\n\nMensaje:\n${textareaInput.value}`
                  });
      
                  // Animación creativa de éxito
                  successMessage.innerHTML = `
                      <div class="success-animation">
                          <svg viewBox="0 0 52 52" class="checkmark">
                              <circle cx="26" cy="26" r="25" fill="none" class="checkmark__circle"/>
                              <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" class="checkmark__check"/>
                          </svg>
                          <p>¡Mensaje enviado con éxito!</p>
                      </div>
                  `;
                  
                  form.reset();
                  
                  // Remover clases de validación
                  emailInput.classList.remove('valid');
                  textareaInput.classList.remove('valid');
              } catch (error) {
                  console.error('Envío de correo fallido:', error);
                  successMessage.textContent = 'No se pudo enviar el mensaje. Intenta de nuevo.';
                  successMessage.style.color = 'var(--color-error)';
              } finally {
                  const submitBtn = e.target.querySelector('button');
                  submitBtn.disabled = false;
                  submitBtn.textContent = 'Enviar';
              }
          });
      });
      
      
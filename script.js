// Menu hamburguesa
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');

    hamburger?.addEventListener('click', function () {
        this.classList.toggle('active');
        menu?.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger?.classList.remove('active');
            menu?.classList.remove('active');
        });
    });

    // Manejo del formulario de contacto sin redirección
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Mostrar el div de estado y prepararlo
            formStatus.style.display = 'block';
            formStatus.className = '';
            formStatus.innerHTML = 'Enviando mensaje...';

            // Deshabilitar el botón para evitar múltiples envíos
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerText = 'Enviando...';

            // Preparar formData para el envío
            const formData = new FormData(form);

            // Enviar los datos mediante fetch API
            fetch(form.getAttribute('action'), {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Error al enviar el formulario');
                    }
                })
                .then(data => {
                    // Éxito: mostrar mensaje y limpiar el formulario
                    formStatus.className = 'success';
                    formStatus.innerHTML = '¡Mensaje enviado correctamente! Te responderé pronto.';
                    form.reset();
                })
                .catch(error => {
                    // Error: mostrar mensaje de error
                    formStatus.className = 'error';
                    formStatus.innerHTML = 'Hubo un problema al enviar el mensaje. Por favor, intenta de nuevo o escríbeme directamente a stephaptorres@gmail.com';
                    console.error('Error:', error);
                })
                .finally(() => {
                    // Habilitar el botón nuevamente
                    submitButton.disabled = false;
                    submitButton.innerText = 'Enviar mensaje';

                    // Asegurar que el mensaje es visible
                    formStatus.scrollIntoView({ behavior: 'smooth' });

                    // Ocultar el mensaje después de 5 segundos si fue exitoso
                    if (formStatus.className === 'success') {
                        setTimeout(() => {
                            formStatus.style.display = 'none';
                        }, 5000);
                    }
                });
        });
    }
});
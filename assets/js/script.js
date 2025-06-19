// Función para cambiar entre pestañas
function showTab(tabName) {
    // Ocultar todos los formularios
    document.querySelectorAll('.frutiger-form').forEach(form => {
        form.classList.remove('active-form');
    });
    
    // Desactivar todas las pestañas
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Mostrar formulario seleccionado
    document.getElementById(`${tabName}-form`).classList.add('active-form');
    
    // Activar pestaña seleccionada
    const tabs = document.querySelectorAll('.tab');
    if (tabName === 'login') {
        tabs[0].classList.add('active');
    } else {
        tabs[1].classList.add('active');
    }
}

// Función para cambiar tema
function toggleTheme() {
    const body = document.body;
    const toggleBtn = document.querySelector('.theme-toggle');
    
    body.classList.toggle('night-mode');
    
    if (body.classList.contains('night-mode')) {
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i> MODO DÍA';
    } else {
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i> MODO NOCHE';
    }
    
    // Cambiar logo institucional para modo noche
    const cornerLogo = document.querySelector('.corner-logo');
    if (body.classList.contains('night-mode')) {
        cornerLogo.style.filter = 'drop-shadow(0 0 10px rgba(255,255,255,0.3)) brightness(1.2)';
    } else {
        cornerLogo.style.filter = 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.2))';
    }
}

// Función de login
function login() {
    const email = document.querySelector('#login-form input[type="text"]').value;
    const password = document.querySelector('#login-form input[type="password"]').value;
    
    if (email && password) {
        // Redirección a principal.html después de 1 segundo (simulando carga)
        setTimeout(() => {
            window.location.href = 'principal.html';
        }, 1000);
    } else {
        alert('Por favor completa todos los campos');
    }
}

// Función de registro
function register() {
    const password = document.querySelector('#register-form input[type="password"]').value;
    const confirm = document.querySelector('#register-form input[type="password"]:nth-of-type(2)').value;
    
    if (password !== confirm) {
        alert('Las contraseñas no coinciden');
        return;
    }
    
    alert('Registro exitoso. Redirigiendo...');
    setTimeout(() => {
        showTab('login');
        document.getElementById('register-form').reset();
    }, 1500);
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Establecer tema inicial
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleTheme(); // Activar modo noche si el sistema lo tiene configurado
    }
});

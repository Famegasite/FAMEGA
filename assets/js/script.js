/**
 * SCRIPT.JS COMPLETO PARA FAMEGA - FRUTIGER AERO
 * Incluye:
 * - Sistema de login/registro
 * - Cambio día/noche funcional
 * - Redirección a principal.html
 * - Validación de formularios
 * - Efectos visuales
 */

// Variables globales
let currentTheme = 'day'; // 'day' o 'night'

// Función para cambiar entre pestañas de login/registro
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

// Función para cambiar entre temas día/noche
function toggleTheme() {
    const body = document.body;
    const toggleBtn = document.querySelector('.theme-toggle');
    const dayBg = document.querySelector('.sky-bg.day');
    const nightBg = document.querySelector('.sky-bg.night');
    const cornerLogo = document.querySelector('.corner-logo');
    
    // Cambiar tema
    currentTheme = currentTheme === 'day' ? 'night' : 'day';
    body.classList.toggle('night-mode');
    
    // Cambiar fondos
    if (currentTheme === 'night') {
        dayBg.classList.remove('active-bg');
        nightBg.classList.add('active-bg');
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i> <span class="theme-text">MODO DÍA</span>';
        cornerLogo.style.filter = 'drop-shadow(0 0 15px rgba(255,255,255,0.4)) brightness(1.3)';
    } else {
        nightBg.classList.remove('active-bg');
        dayBg.classList.add('active-bg');
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i> <span class="theme-text">MODO NOCHE</span>';
        cornerLogo.style.filter = 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.3))';
    }
    
    // Guardar preferencia en localStorage
    localStorage.setItem('themePreference', currentTheme);
}

// Función de login
function login() {
    const email = document.querySelector('#login-form input[type="text"]').value;
    const password = document.querySelector('#login-form input[type="password"]').value;
    const errorElements = document.querySelectorAll('#login-form .error-message');
    
    // Resetear errores
    errorElements.forEach(el => el.remove());
    
    // Validación
    let isValid = true;
    
    if (!email) {
        showError('login-form', 'Usuario es requerido');
        isValid = false;
    }
    
    if (!password) {
        showError('login-form', 'Contraseña es requerida');
        isValid = false;
    }
    
    if (isValid) {
        // Mostrar carga
        const btn = document.querySelector('#login-form .aero-btn');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>CARGANDO...</span>';
        btn.disabled = true;
        
        // Simular autenticación (2 segundos)
        setTimeout(() => {
            // Redirección a principal.html
            window.location.href = 'principal.html';
        }, 2000);
    }
}

// Función de registro
function register() {
    const username = document.querySelector('#register-form input[type="text"]').value;
    const email = document.querySelector('#register-form input[type="email"]').value;
    const password = document.querySelector('#register-form input[type="password"]').value;
    const confirm = document.querySelector('#register-form input[type="password"]:nth-of-type(2)').value;
    const errorElements = document.querySelectorAll('#register-form .error-message');
    
    // Resetear errores
    errorElements.forEach(el => el.remove());
    
    // Validación
    let isValid = true;
    
    if (!username) {
        showError('register-form', 'Nombre completo es requerido');
        isValid = false;
    }
    
    if (!email) {
        showError('register-form', 'Correo electrónico es requerido');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('register-form', 'Correo electrónico no válido');
        isValid = false;
    }
    
    if (!password) {
        showError('register-form', 'Contraseña es requerida');
        isValid = false;
    } else if (password.length < 6) {
        showError('register-form', 'La contraseña debe tener al menos 6 caracteres');
        isValid = false;
    }
    
    if (password !== confirm) {
        showError('register-form', 'Las contraseñas no coinciden');
        isValid = false;
    }
    
    if (isValid) {
        // Mostrar carga
        const btn = document.querySelector('#register-form .aero-btn');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>REGISTRANDO...</span>';
        btn.disabled = true;
        
        // Simular registro (1.5 segundos)
        setTimeout(() => {
            // Mostrar éxito y cambiar a login
            alert('¡Registro exitoso! Ahora puedes iniciar sesión');
            showTab('login');
            document.getElementById('register-form').reset();
            
            // Restaurar botón
            btn.innerHTML = '<span>CREAR CUENTA</span><div class="btn-reflection"></div>';
            btn.disabled = false;
        }, 1500);
    }
}

// Función para mostrar errores
function showError(formId, message) {
    const form = document.getElementById(formId);
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#ff3333';
    errorElement.style.fontSize = '12px';
    errorElement.style.marginTop = '5px';
    form.appendChild(errorElement);
}

// Validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Cargar tema preferido
    const savedTheme = localStorage.getItem('themePreference');
    if (savedTheme === 'night' || 
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !savedTheme)) {
        toggleTheme(); // Activar modo noche si está guardado o es preferencia del sistema
    }
    
    // Asignar eventos
    document.querySelector('#login-form .aero-btn').addEventListener('click', login);
    document.querySelector('#register-form .aero-btn').addEventListener('click', register);
    
    // Forzar carga del favicon (solución para algunos navegadores)
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.href = favicon.href.split('?')[0] + '?' + new Date().getTime();
    
    // Mostrar animación de carga inicial
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Efecto hover para botones
document.querySelectorAll('.aero-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-2px)';
        btn.style.boxShadow = '0 6px 16px rgba(0, 162, 232, 0.4)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = '0 4px 12px rgba(0, 162, 232, 0.3)';
    });
});

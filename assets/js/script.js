/**
 * SCRIPT.JS COMPLETO Y CORREGIDO PARA FAMEGA
 * Funcionalidades:
 * - Sistema de login/registro
 * - Cambio día/noche con persistencia
 * - Validación de formularios
 * - Redirección a principal.html
 * - Precarga de recursos
 */

// Variables globales
let currentTheme = 'day'; // 'day' o 'night'

// Mostrar u ocultar pestañas
function showTab(tabName) {
    try {
        // Ocultar todos los formularios
        document.querySelectorAll('.frutiger-form').forEach(form => {
            form.classList.remove('active-form');
        });
        
        // Desactivar todas las pestañas
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Mostrar formulario seleccionado
        const activeForm = document.getElementById(`${tabName}-form`);
        if (activeForm) {
            activeForm.classList.add('active-form');
        }
        
        // Activar pestaña seleccionada
        const activeTab = document.querySelector(`.tab[onclick*="${tabName}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
    } catch (error) {
        console.error('Error en showTab:', error);
    }
}

// Cambiar entre temas día/noche
function toggleTheme() {
    try {
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
            if (dayBg) dayBg.classList.remove('active-bg');
            if (nightBg) nightBg.classList.add('active-bg');
            if (toggleBtn) {
                toggleBtn.innerHTML = '<i class="fas fa-sun"></i> <span class="theme-text">MODO DÍA</span>';
            }
            if (cornerLogo) {
                cornerLogo.style.filter = 'drop-shadow(0 0 15px rgba(255,255,255,0.4)) brightness(1.3)';
            }
        } else {
            if (nightBg) nightBg.classList.remove('active-bg');
            if (dayBg) dayBg.classList.add('active-bg');
            if (toggleBtn) {
                toggleBtn.innerHTML = '<i class="fas fa-moon"></i> <span class="theme-text">MODO NOCHE</span>';
            }
            if (cornerLogo) {
                cornerLogo.style.filter = 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.3))';
            }
        }
        
        // Guardar preferencia
        localStorage.setItem('themePreference', currentTheme);
    } catch (error) {
        console.error('Error en toggleTheme:', error);
    }
}

// Función de login
function login() {
    try {
        const email = document.querySelector('#login-form input[type="text"]').value;
        const password = document.querySelector('#login-form input[type="password"]').value;
        const btn = document.querySelector('#login-form .aero-btn');
        
        // Validación básica
        if (!email || !password) {
            showError('login-form', 'Por favor completa todos los campos');
            return;
        }
        
        // Mostrar estado de carga
        if (btn) {
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>INGRESANDO...</span>';
            btn.disabled = true;
        }
        
        // Simular autenticación
        setTimeout(() => {
            // Redirección a principal.html
            window.location.href = 'principal.html';
        }, 1500);
    } catch (error) {
        console.error('Error en login:', error);
        if (btn) {
            btn.innerHTML = '<span>INGRESAR</span><div class="btn-reflection"></div>';
            btn.disabled = false;
        }
    }
}

// Función de registro
function register() {
    try {
        const username = document.querySelector('#register-form input[type="text"]').value;
        const email = document.querySelector('#register-form input[type="email"]').value;
        const password = document.querySelector('#register-form input[type="password"]').value;
        const confirm = document.querySelector('#register-form input[type="password"]:nth-of-type(2)').value;
        const btn = document.querySelector('#register-form .aero-btn');
        
        // Validación
        if (!username || !email || !password || !confirm) {
            showError('register-form', 'Por favor completa todos los campos');
            return;
        }
        
        if (!validateEmail(email)) {
            showError('register-form', 'Ingresa un correo electrónico válido');
            return;
        }
        
        if (password.length < 6) {
            showError('register-form', 'La contraseña debe tener al menos 6 caracteres');
            return;
        }
        
        if (password !== confirm) {
            showError('register-form', 'Las contraseñas no coinciden');
            return;
        }
        
        // Mostrar estado de carga
        if (btn) {
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>REGISTRANDO...</span>';
            btn.disabled = true;
        }
        
        // Simular registro
        setTimeout(() => {
            alert('¡Registro exitoso! Ahora puedes iniciar sesión');
            showTab('login');
            document.getElementById('register-form').reset();
            
            if (btn) {
                btn.innerHTML = '<span>CREAR CUENTA</span><div class="btn-reflection"></div>';
                btn.disabled = false;
            }
        }, 1500);
    } catch (error) {
        console.error('Error en register:', error);
    }
}

// Mostrar mensajes de error
function showError(formId, message) {
    try {
        // Eliminar errores previos
        const existingErrors = document.querySelectorAll(`#${formId} .error-message`);
        existingErrors.forEach(el => el.remove());
        
        // Crear nuevo elemento de error
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        // Insertar después del último input
        const form = document.getElementById(formId);
        const lastInput = form.querySelector('.input-group:last-child');
        if (lastInput) {
            lastInput.appendChild(errorElement);
        }
    } catch (error) {
        console.error('Error en showError:', error);
    }
}

// Validar formato de email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Precargar recursos
function preloadResources() {
    const resources = [
        'assets/img/day-sky.jpg',
        'assets/img/night-sky.jpg',
        'assets/img/water-texture.png',
        'assets/img/logo-famega.png',
        'assets/img/logo-mag.png',
        'assets/fonts/frutiger.ttf'
    ];
    
    resources.forEach(resource => {
        new Image().src = resource;
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Precargar recursos
        preloadResources();
        
        // Configurar tema inicial
        const savedTheme = localStorage.getItem('themePreference');
        const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'night' || (!savedTheme && systemPrefersDark)) {
            toggleTheme();
        }
        
        // Asignar eventos
        document.querySelector('#login-form .aero-btn')?.addEventListener('click', login);
        document.querySelector('#register-form .aero-btn')?.addEventListener('click', register);
        
        // Forzar carga del favicon (solución para algunos navegadores)
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            favicon.href = favicon.href.split('?')[0] + '?' + new Date().getTime();
        }
        
        // Marcar como cargado
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 500);
    } catch (error) {
        console.error('Error en la inicialización:', error);
    }
});

// Efectos hover para botones
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

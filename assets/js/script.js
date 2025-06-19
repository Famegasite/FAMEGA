/**
 * SCRIPT.JS COMPLETO PARA FAMEGA - FRUTIGER AERO
 * Incluye:
 * - Sistema de login/registro
 * - Cambio día/noche con persistencia
 * - Efectos visuales interactivos
 * - Validación de formularios
 * - Redirección a principal.html
 */

// Variables globales
let currentTheme = 'day'; // 'day' o 'night'

// ========== EFECTOS VISUALES ========== //

// Crear burbujas interactivas
function createBubbles() {
    const container = document.getElementById('bubbles-container');
    if (!container) return;
    
    // Limpiar contenedor
    container.innerHTML = '';
    
    // Crear 8 burbujas grandes
    for (let i = 0; i < 8; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        // Tamaño y posición aleatorios
        const size = Math.random() * 150 + 50;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 10;
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${posX}%`;
        bubble.style.top = `${posY}%`;
        bubble.style.animationDelay = `${delay}s`;
        
        // Efecto de movimiento al pasar el mouse
        bubble.addEventListener('mousemove', (e) => {
            if (e.target === bubble) {
                const rect = bubble.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                bubble.style.transform = `translate(${(x - rect.width/2)/10}px, ${(y - rect.height/2)/10}px)`;
            }
        });
        
        bubble.addEventListener('mouseleave', () => {
            bubble.style.transform = '';
        });
        
        container.appendChild(bubble);
    }
    
    // Crear partículas pequeñas (20 unidades)
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 5 + 1;
        const posX = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 20;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `-${delay}s`;
        
        container.appendChild(particle);
    }
}

// Efecto de ondas al hacer clic
function setupRippleEffect() {
    document.body.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    });
}

// ========== FUNCIONALIDAD PRINCIPAL ========== //

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
    const btn = document.querySelector('#login-form .aero-btn');
    try {
        const email = document.querySelector('#login-form input[type="text"]').value;
        const password = document.querySelector('#login-form input[type="password"]').value;
        
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
    const btn = document.querySelector('#register-form .aero-btn');
    try {
        const username = document.querySelector('#register-form input[type="text"]').value;
        const email = document.querySelector('#register-form input[type="email"]').value;
        const password = document.querySelector('#register-form input[type="password"]').value;
        const confirm = document.querySelector('#register-form input[type="password"]:nth-of-type(2)').value;
        
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
        if (btn) {
            btn.innerHTML = '<span>CREAR CUENTA</span><div class="btn-reflection"></div>';
            btn.disabled = false;
        }
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

// ========== INICIALIZACIÓN ========== //

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
        
        // Crear efectos visuales
        createBubbles();
        setupRippleEffect();
        
        // Asignar eventos
        document.querySelector('#login-form .aero-btn')?.addEventListener('click', login);
        document.querySelector('#register-form .aero-btn')?.addEventListener('click', register);
        
        // Forzar carga del favicon (solución para algunos navegadores)
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            favicon.href = favicon.href.split('?')[0] + '?' + new Date().getTime();
        }
        
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
        
        // Cambiar tema aleatoriamente cada 30 segundos (solo para demo)
        setInterval(() => {
            if (Math.random() > 0.7) toggleTheme();
        }, 30000);
        
    } catch (error) {
        console.error('Error en la inicialización:', error);
    }
});

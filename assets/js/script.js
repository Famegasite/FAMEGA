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

// Efecto de carga inicial
window.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
});

// Validación básica de formulario
document.querySelectorAll('.aero-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Validación simple
        const form = button.closest('form');
        const inputs = form.querySelectorAll('input[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ff3300';
                isValid = false;
            } else {
                input.style.borderColor = 'rgba(255, 255, 255, 0.6)';
            }
        });
        
        if (isValid) {
            if (form.id === 'login-form') {
                alert('Inicio de sesión exitoso (simulado)');
                // window.location.href = 'principal.html';
            } else {
                alert('Registro exitoso (simulado)');
                showTab('login');
                form.reset();
            }
        } else {
            alert('Por favor completa todos los campos');
        }
    });
});

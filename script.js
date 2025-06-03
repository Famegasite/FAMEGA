const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const switchToRegister = document.getElementById("switch-to-register");
const switchToLogin = document.getElementById("switch-to-login");

switchToRegister.addEventListener("click", () => {
  loginForm.style.display = "none";
  registerForm.style.display = "block";
});

switchToLogin.addEventListener("click", () => {
  registerForm.style.display = "none";
  loginForm.style.display = "block";
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const password = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden.");
  } else {
    alert("Registro exitoso.");
    registerForm.reset();
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  }
});
```

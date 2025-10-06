document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('password');
  const strengthText = document.getElementById('strength');

  passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    let strength = 'Weak';

    if (val.length >= 8 && /[A-Z]/.test(val) && /[0-9]/.test(val) && /[!@#$%^&*]/.test(val)) {
      strength = 'Strong';
      strengthText.style.color = 'green';
    } else if (val.length >= 6) {
      strength = 'Medium';
      strengthText.style.color = 'orange';
    } else {
      strength = 'Weak';
      strengthText.style.color = 'red';
    }

    strengthText.textContent = `Password Strength: ${strength}`;
  });

  
  const nameInput = document.getElementById('name');
  const greeting = document.getElementById('greeting');

  nameInput.addEventListener('input', () => {
    greeting.textContent = nameInput.value ? `Hello, ${nameInput.value}!` : '';
  });
});

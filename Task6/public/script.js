async function registerUser() {
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  const data = await res.json();
  alert(data.message || 'Registered!');
}

async function loginUser() {
  const email = document.getElementById('logEmail').value;
  const password = document.getElementById('logPassword').value;

  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();

  if (data.token) {
    localStorage.setItem('token', data.token);
    alert('Login successful!');
  } else {
    alert(data.message);
  }
}

async function getProfile() {
  const token = localStorage.getItem('token');
  if (!token) return alert('Please login first');

  const res = await fetch('/api/auth/profile', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  document.getElementById('profileOutput').textContent = JSON.stringify(data, null, 2);
}

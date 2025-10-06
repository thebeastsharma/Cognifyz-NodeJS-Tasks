const form = document.getElementById('userForm');
const userList = document.getElementById('userList');

async function fetchUsers() {
  const res = await fetch('/api/users');
  const users = await res.json();
  userList.innerHTML = '';
  users.forEach(u => renderUser(u));
}

// Render single user
function renderUser(user) {
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center';
  li.innerHTML = `
    <div>
      <strong>${user.name}</strong> <br>
      <small>${user.email}</small>
    </div>
    <div>
      <button class="btn btn-sm btn-warning me-2" onclick="editUser(${user.id})">Edit</button>
      <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">Delete</button>
    </div>
  `;
  userList.appendChild(li);
}

// Add new user
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  });
  const data = await res.json();
  renderUser(data);

  form.reset();
});


async function deleteUser(id) {
  await fetch(`/api/users/${id}`, { method: 'DELETE' });
  fetchUsers();
}


async function editUser(id) {
  const newName = prompt('Enter new name:');
  const newEmail = prompt('Enter new email:');
  if (!newName || !newEmail) return;

  await fetch(`/api/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newName, email: newEmail })
  });

  fetchUsers();
}


fetchUsers();

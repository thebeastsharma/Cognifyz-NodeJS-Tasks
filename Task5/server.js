// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3003;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


let users = [
  { id: 1, name: 'Divyanshu', email: 'divyanshu@example.com' },
  { id: 2, name: 'Aarav', email: 'aarav@example.com' }
];

// Serve front-end
app.get('/', (req, res) => {
  res.render('index');
});

// ===== RESTful API Routes =====


app.get('/api/users', (req, res) => {
  res.json(users);
});


app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: Date.now(), name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});


app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  let user = users.find(u => u.id == id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.name = name || user.name;
  user.email = email || user.email;
  res.json(user);
});


app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  users = users.filter(u => u.id != id);
  res.json({ message: 'User deleted' });
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

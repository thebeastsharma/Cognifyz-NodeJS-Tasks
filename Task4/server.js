const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3002;

let submissions = [];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit', (req, res) => {
  const { name, email, password } = req.body;
  let errors = [];

   if (!name || name.trim().length < 3) errors.push('Name must be at least 3 characters.');
  if (!email || !email.includes('@')) errors.push('Invalid email address.');
  if (!password || password.length < 8) errors.push('Password must be at least 8 characters long.');
  if (!/[A-Z]/.test(password)) errors.push('Password must contain at least one uppercase letter.');
  if (!/[0-9]/.test(password)) errors.push('Password must contain at least one number.');
  if (!/[!@#$%^&*]/.test(password)) errors.push('Password must contain at least one special character (!@#$%^&*).');

  if (errors.length > 0) {
    return res.render('result', { success: false, errors });
  }

  const userData = { name, email, password };
  submissions.push(userData);

  res.render('result', { success: true, user: userData, errors: [] });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
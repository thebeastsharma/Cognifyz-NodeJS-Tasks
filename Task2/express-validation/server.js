const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3002;

let submissions = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit', (req, res) => {
  const { name, email, age } = req.body;
  const errors = [];

    if (!name || name.trim().length < 3) errors.push('Name must be at least 3 characters long.');
  if (!email || !email.includes('@')) errors.push('Invalid email address.');
  const numericAge = parseInt(age);
  if (isNaN(numericAge) || numericAge < 10 || numericAge > 100) errors.push('Age must be between 10 and 100.');


   if (errors.length > 0) {
    return res.render('result', { success: false, errors });
  }

    const userData = { name, email, age: numericAge };
  submissions.push(userData);

    res.render('result', { success: true, user: userData, errors: [] });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
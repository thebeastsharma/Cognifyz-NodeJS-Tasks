require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const authRoutes = require("./routes/authRoutes"); // ✅ import routes



console.log("🟢 Starting server.js...");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // ✅ parse form data
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ✅ Connect the routes here
app.use("/api/auth", authRoutes); // all routes starting with /api/auth go to authRoutes.js

// Main pages
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/profile', (req, res) => res.render('profile'));

// Connect to MongoDB
console.log("🔗 Connecting to MongoDB...");
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected successfully!");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch(err => {
    console.error("❌ MongoDB Connection Failed:", err.message);
  });

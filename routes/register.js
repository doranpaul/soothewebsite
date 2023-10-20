const express = require('express');
const router = express.Router();
const connection = require('../connection.js');

// GET route for the registration page
router.get("/register", (req, res) => {
  res.render('register', { message: null });
});

// POST route for user registration
router.post("/register", (req, res) => {
  const { username, email, password, first_name, last_name, profile_picture } = req.body;

  // Input validations (you can add more)
  if (!username || !email || !password) {
    return res.render('register', { message: "Please fill in all mandatory fields." });
  }

  // TODO: Add more validations like checking email format, password strength etc.

  // Check if user with the same email or username already exists
  connection.query("SELECT * FROM users WHERE username = ? OR email = ?", [username, email], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      return res.render('register', { message: "Username or Email already exists." });
    } else {
        // Insert user into the database
        const insertQuery = "INSERT INTO users (username, email, password, first_name, last_name, profile_picture) VALUES (?, ?, ?, ?, ?, ?)";
        connection.query(insertQuery, [username, email, password, first_name, last_name, profile_picture], (err, result) => {
          if (err) throw err;

          return res.render('register', { message: "Registration successful! Welcome to Soothe ", first_name: first_name });

        });
    }
  });
});

module.exports = router;

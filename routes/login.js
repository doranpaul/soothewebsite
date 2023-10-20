const express = require('express');
const router = express.Router();
const connection = require('../connection.js');

router.get('/login', (req, res) => {
    res.render('login', { message: null });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Input validations
    if (!username || !password) {
        return res.render('login', { message: "Please fill in all fields." });
    }

    // Check if user with the provided username exists and if password matches
    connection.query("SELECT * FROM users WHERE username = ?", [username], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.render('login', { message: "Invalid username or password." });
        } 

        const user = results[0];
        if (password !== user.password) { 
            // Note: In reality, avoid storing plaintext passwords; use bcrypt to compare hashed passwords
            return res.render('login', { message: "Invalid username or password." });
        } 
        req.session.message = "Welcome back,";
        req.session.firstName = user.first_name; // Assuming `firstName` is a column in your users table.


        // User is authenticated. Redirect to dashboard.
        // Assuming you have some kind of session management, you could set the authenticated user's info here, if needed.
        return res.redirect('/dashboard');
    });
});

module.exports = router;
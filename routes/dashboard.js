const express = require('express');
const router = express.Router();
const connection = require('../connection.js');

router.get('/dashboard', (req, res) => {
    let message = req.session.message;
    let firstName = req.session.firstName;

    // Log the retrieved data
    console.log("Message from session:", message);
    console.log("FirstName from session:", firstName);

    // Optionally, clear the message and firstName from the session after retrieving them
    delete req.session.message;
    delete req.session.firstName;

    res.render('dashboard', { 
        message: message,
        firstName: firstName 
    });
});

module.exports = router;

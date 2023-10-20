const express = require('express')
const router = express.Router();

router.get('/movingforward', (req, res) => {
    res.render('movingforward');
});

module.exports = router
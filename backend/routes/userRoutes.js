const express = require('express');
const userControllers = require('../controllers/userController');
const router = express.Router();

router.post('/register', userControllers.registerUser);

router.post('/login', userControllers.loginUser);

module.exports = router;
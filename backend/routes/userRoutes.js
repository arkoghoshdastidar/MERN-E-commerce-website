const express = require('express');
const userControllers = require('../controllers/userController');
const router = express.Router();

router.post('/register', userControllers.registerUser);

router.post('/login', userControllers.loginUser);

router.get('/logout', userControllers.logoutUser);

module.exports = router;
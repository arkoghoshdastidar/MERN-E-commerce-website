const express = require('express');
const userControllers = require('../controllers/userController');
const router = express.Router();
const { isUserAuthenticated } = require('../middlewares/auth'); 

router.post('/register', userControllers.registerUser);

router.post('/login', userControllers.loginUser);

router.post('/password/reset', userControllers.resetPassword);

router.get('/logout', userControllers.logoutUser);

router.put('/password/reset/:resetPasswordToken', userControllers.changePassword);

router.get('/me', isUserAuthenticated, userControllers.getUserDetails);

router.put('/password/update', isUserAuthenticated, userControllers.updatePassword);

router.put('/me/update', isUserAuthenticated, userControllers.updateProfile);

module.exports = router;
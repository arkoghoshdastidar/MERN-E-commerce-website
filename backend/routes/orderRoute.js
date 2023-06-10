const express = require('express');
const router = express.Router();
const { newOrder } = require('../controllers/orderController');
const { isUserAuthenticated } = require('../middlewares/auth');

router.post('/order/new', isUserAuthenticated, newOrder);

module.exports = router;
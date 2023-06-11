const express = require('express');
const router = express.Router();
const { newOrder, getSingleOrder, myOrders } = require('../controllers/orderController');
const { isUserAuthenticated, authorizeRole } = require('../middlewares/auth');

// create a new order
router.post('/order/new', isUserAuthenticated, newOrder);

// get details of an order with provided order id
router.get('/order/:orderId', isUserAuthenticated, authorizeRole('admin'), getSingleOrder);

// get all the orders of logged in user
router.get('/orders/me', isUserAuthenticated, myOrders);

module.exports = router;
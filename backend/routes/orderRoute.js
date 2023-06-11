const express = require('express');
const router = express.Router();
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { isUserAuthenticated } = require('../middlewares/auth');

// create a new order
router.post('/order/new', isUserAuthenticated, newOrder);

// get details of an order with provided order id
router.get('/order/:orderId', isUserAuthenticated, getSingleOrder);

// get all the orders of logged in user
router.get('/orders/me', isUserAuthenticated, myOrders);

// get all orders -- admin only
router.get('/orders', isUserAuthenticated, getAllOrders);

// update order status -- admin only



module.exports = router;
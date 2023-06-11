const Order = require('../models/orderModel');
const ErrorHandler = require('../utils/errorHandler');

// create a new order
const newOrder = async (req, res, next) => {
    try {
        const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            user: req.user._id,
            payedAt: Date.now()
        });
        res.status(200).json({
            success: true,
            order
        });
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
}

// get logged in user orders
const getSingleOrder = async (req, res, next) => {
    try {
        const orders = await Order.findById(req.params.orderId).populate('user', 'name email');
        if (!orders) {
            return next(new ErrorHandler('No such order', 500));
        }
        res.status(200).json({
            success: true,
            orders
        });
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
}

// get single order
const myOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({
            user: req.user._id
        });
        res.status(200).json({
            success: true,
            orders
        });
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
}

module.exports = { newOrder, getSingleOrder, myOrders };
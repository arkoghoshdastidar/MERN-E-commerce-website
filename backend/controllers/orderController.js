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

module.exports = { newOrder };
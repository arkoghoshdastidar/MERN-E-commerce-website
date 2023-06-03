const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name, email, password, avatar: {
                public_id: 'This is a temporary public id',
                url: 'profile picture'
            }
        })
        res.status(201).json({
            success: true,
            user
        });
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
}

module.exports = { registerUser };
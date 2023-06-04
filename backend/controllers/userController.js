const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name, email, password, avatar: {
                public_id: 'This is a temporary public id',
                url: 'profile picture'
            }
        });

        sendToken(res, 201, user);
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
}

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // check if user did not provide an email or password
        if (!email || !password) {
            return next(new ErrorHandler(err.message, 401));
        }

        // check if email is a valid email or not
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorHandler("User not found", 401));
        }

        // check if password is a valid password of not
        const isPasswordCorrect = user.checkPassword(password);
        if (!isPasswordCorrect) {
            return next(new ErrorHandler("User not found", 401));
        }

        // return the user token with status code 200 
        sendToken(res, 200, user);
    } catch (err) {
        next(new ErrorHandler(err.message, 500));
    }
}

const logoutUser = async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    });
    res.status(200).json({
        success: true,
        message: "User logged out."
    });
}

module.exports = { registerUser, loginUser, logoutUser };
const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLenght: [30, 'Cannot exceed 30 characters'],
        minLenght: [5, 'Name should have more than 5 characters'],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter your email address'],
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLenght: [8, 'Password should be at least 8 characters long']
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

userSchema.pre('save', async function (req, res, next) {
    if (this.modifiedPaths().includes("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
})

module.exports = mongoose.model('User', userSchema);
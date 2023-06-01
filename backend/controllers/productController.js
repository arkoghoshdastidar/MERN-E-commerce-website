const Product = require('../models/productModel');
const ApiFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');

// create a new product
const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            product,
            success: true
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
}

// admin-route : get all the products
const getAllProducts = async (req, res, next) => {
    try {
        const apiFeature = new ApiFeatures(Product.find(), req.query);
        let products = await apiFeature.search().filter().query;
        res.status(200).json({
            products: {
                ...products
            },
            success: true
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
}

// admin-route : update product
const updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler('Product not found!', 500));
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            product
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
}

// admin-route : delete product
const deleteProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return next(new ErrorHandler('Product not found!', 500));
        }

        await Product.findByIdAndRemove(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!'
        })
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
}

const getProductDetails = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler('Product not found!', 500));
        }

        res.status(200).json({
            success: true,
            product
        })
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
}

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails };
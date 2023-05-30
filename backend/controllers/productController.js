const Product = require('../models/productModel');

// create a new product
const createProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        product,
        success: true
    });
}


// admin-route : get all the products
const getAllProducts = async (req, res, next) => {
    const products = await Product.find({});
    res.status(200).json({
        products: {
            ...products
        },
        success: true
    });
}

// admin-route : update product
const updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            success: false,
            message: 'Product not found!'
        });
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        success: true,
        product
    });
}

module.exports = { getAllProducts, createProduct, updateProduct };
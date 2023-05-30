const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, updateProduct } = require('../controllers/productController');

router.get('/products', getAllProducts);

router.post('/product/new', createProduct);

router.put('/product/:id', updateProduct);

module.exports = router;
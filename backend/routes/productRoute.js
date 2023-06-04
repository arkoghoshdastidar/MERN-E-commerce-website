const express = require('express');
const router = express.Router();
const isUserAuthenticated = require('../middlewares/auth');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');

router.get('/products',isUserAuthenticated, getAllProducts);

router.post('/product/new', createProduct);

router.put('/product/:id', updateProduct);

router.delete('/product/:id', deleteProduct);

router.get('/product/:id', getProductDetails);


module.exports = router;
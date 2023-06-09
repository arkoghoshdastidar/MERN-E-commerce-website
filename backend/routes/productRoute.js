const express = require('express');
const router = express.Router();
const {isUserAuthenticated, authorizeRole} = require('../middlewares/auth');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview} = require('../controllers/productController');

router.get('/products', getAllProducts);

router.post('/admin/product/new',isUserAuthenticated, authorizeRole("admin"), createProduct);

router.put('/admin/product/:id',isUserAuthenticated, authorizeRole("admin"), updateProduct);

router.delete('/admin/product/:id',isUserAuthenticated, authorizeRole("admin"), deleteProduct);

router.get('/product/:id', getProductDetails);

router.put('/review', isUserAuthenticated, createProductReview);

module.exports = router;
const express = require('express');
const router = express.Router();
const {isUserAuthenticated, authorizeRole} = require('../middlewares/auth');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');

router.get('/products', getAllProducts);

router.post('/product/new',isUserAuthenticated, authorizeRole("admin"), createProduct);

router.put('/product/:id',isUserAuthenticated, authorizeRole("admin"), updateProduct);

router.delete('/product/:id',isUserAuthenticated, authorizeRole("admin"), deleteProduct);

router.get('/product/:id', getProductDetails);

module.exports = router;
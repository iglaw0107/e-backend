const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const productController = require('../controllers/product.controller');
const categoryController = require('../controllers/category.controller');
const router = express.Router();



router.post('/create-product', authMiddleware, adminMiddleware,productController.create);
router.get('/products', authMiddleware, productController.getallproducts);
router.get('/product/:productId',authMiddleware, productController.getproduct);
router.put('/product/:productId', authMiddleware, adminMiddleware, productController.updateProduct);
router.delete('/product/:productId', authMiddleware, adminMiddleware, productController.deleteProduct);
router.get('/products', productController.searchProduct);

router.get('/categories', categoryController.getallCategory);
router.post('/categories', authMiddleware, adminMiddleware, categoryController.createCategory);

module.exports = router;
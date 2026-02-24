const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const productController = require('../controllers/product.controller');
const categoryController = require('../controllers/category.controller');
const router = express.Router();



router.get('/admin/products/search',authMiddleware, adminMiddleware ,productController.searchProduct)
router.post('/products/create', authMiddleware, adminMiddleware,productController.create);
router.put('/products/:id', authMiddleware, adminMiddleware, productController.updateProduct);
router.delete('/products/:id', authMiddleware, adminMiddleware, productController.deleteProduct);



router.get('/products', authMiddleware, productController.getallproducts);
router.get('/product/:id',authMiddleware, productController.getproduct);
router.get('/products/search', productController.searchProduct);

router.get('/categories', categoryController.getallCategory);
router.post('admin/categories', authMiddleware, adminMiddleware, categoryController.createCategory);

module.exports = router;
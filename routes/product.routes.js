const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const productController = require('../controllers/product.controller');
const categoryController = require('../controllers/category.controller');
const cartController = require('../controllers/cart.controller');
const orderController = require('../controllers/order.controller');
const router = express.Router();



router.get('/admin/products/search',authMiddleware, adminMiddleware ,productController.searchProduct)
router.post('/products/create', authMiddleware, adminMiddleware,productController.create);
router.put('/products/:id', authMiddleware, adminMiddleware, productController.updateProduct);
router.delete('/products/:id', authMiddleware, adminMiddleware, productController.deleteProduct);



router.get('/products', authMiddleware, productController.getallproducts);
router.get('/products/search', productController.searchProduct);
router.get('/product/:id',authMiddleware, productController.getproduct);


router.get('/categories', categoryController.getallCategory);
router.post('/admin/categories', authMiddleware, adminMiddleware, categoryController.createCategory);



router.post('/cart', authMiddleware, cartController.addToCart);
router.get('/cart', authMiddleware, cartController.getCart);
router.delete('/cart/:productId', authMiddleware, cartController.removeCart);


router.post('/orders', authMiddleware, orderController.createOrder);


router.get('/orders/my', authMiddleware, orderController.getMyOrder);
router.get('/orders/orders', authMiddleware, adminMiddleware, orderController.getAllOrders);
router.put('/orders/:id/cancel', authMiddleware, orderController.cancelOrder);


module.exports = router;
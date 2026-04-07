const Cart = require('../models/cart');
const Product = require('../models/product');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;

    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ msg: "Invalid data" });
    }

    const product = await Product.findById(productId);

    if (!product || !product.isActive) {
      return res.status(404).json({ msg: "Product not available" });
    }

    if (quantity > product.stock) {
      return res.status(400).json({ msg: "Not enough stock available" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity }]
      });
    } else {
      const existingItem = cart.items.find(
        item => item.product.toString() === productId
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;

        if (newQuantity > product.stock) {
          return res.status(400).json({ msg: "Stock exceeded" });
        }

        existingItem.quantity = newQuantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
    }

    res.status(200).json({ msg: "Product added to cart" });

  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};


exports.getCart = async (req, res) => {
    try{
        const cart = await Cart.findOne({user:req.user.userId})
            .populate('items.product', 'name price stock');

        if(!cart){
            return res.status(200).json({items: [] });
        }

        res.status(200).json(cart);
    }catch(error){
        res.status(500).json({msg:"Server error"});
    }
};


exports.removeCart = async (req, res) => {
    try{
        const {productId} = req.params;

        const cart = await Cart.findOne({user: req.user.userId});

        if(!cart) return res.status(404).json({msg:"Cart not found"});

        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );
        await cart.save();

        res.status(200).json({msg:"Item removed"});
    }catch(error){
        res.status(500).json({msg:"Server error"})
    }
}


// controllers/cart.controller.js
exports.updateCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({ msg: 'Invalid quantity' });
        }

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        if (quantity > product.stock) {
            return res.status(400).json({ msg: 'Not enough stock' });
        }

        const cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) return res.status(404).json({ msg: 'Cart not found' });

        const item = cart.items.find(
            i => i.product.toString() === productId
        );

        if (!item) return res.status(404).json({ msg: 'Item not in cart' });

        item.quantity = quantity;
        await cart.save();

        res.status(200).json({ msg: 'Cart updated' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};
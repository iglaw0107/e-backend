const Order = require('../models/order');
const Cart = require('../models/cart');
const Product = require('../models/product');
const mongoose = require('mongoose');

// exports.createOrder = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const userId = req.user.userId;
//     const { shippingAddress } = req.body;

//     if (!shippingAddress) {
//       return res.status(400).json({ msg: "Shipping address required" });
//     }

//     const cart = await Cart.findOne({ user: userId }).populate('items.product');

//     if (!cart || cart.items.length === 0) {
//       return res.status(400).json({ msg: "Cart is empty" });
//     }

//     let totalPrice = 0;
//     const orderItems = [];

//     for (const item of cart.items) {
//       const product = item.product;

//       if (!product || !product.isActive) {
//         throw new Error("Product unavailable");
//       }

//       if (product.stock < item.quantity) {
//         throw new Error("Insufficient stock");
//       }

//       product.stock -= item.quantity;
//       await product.save({ session });

//       totalPrice += product.price * item.quantity;

//       orderItems.push({
//         product: product._id,
//         name: product.name,
//         price: product.price,
//         quantity: item.quantity
//       });
//     }

//     const order = await Order.create([{
//       user: userId,
//       items: orderItems,
//       totalPrice,
//       shippingAddress
//     }], { session });

//     cart.items = [];
//     await cart.save({ session });

//     await session.commitTransaction();
//     session.endSession();

//     res.status(201).json({
//       msg: "Order placed successfully",
//       order: order[0]
//     });

//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();

//     res.status(500).json({ msg: error.message });
//   }
// };


exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { shippingAddress } = req.body;

    if (!shippingAddress) {
      return res.status(400).json({ msg: "Shipping address required" });
    }

    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ msg: "Cart is empty" });
    }

    let totalPrice = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = item.product;

      if (!product || !product.isActive) {
        return res.status(400).json({ msg: "Product unavailable" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ msg: "Insufficient stock" });
      }

      product.stock -= item.quantity;
      await product.save();

      totalPrice += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity
      });
    }

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalPrice,
      shippingAddress
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({
      msg: "Order placed successfully",
      order
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
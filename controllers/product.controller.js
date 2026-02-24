const Product = require('../models/product');
const mongoose = require('mongoose');

exports.create = async (req, res) => {
  try {
    const { name, price, stock, description, categories} = req.body;

    if (!name || price == null || stock == null) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({ message: "At least one category required" });
    }

    const validCategories = await Category.find({
      _id: { $in: categories },
      isActive: true
    });

    if (validCategories.length !== categories.length) {
      return res.status(400).json({ message: "Invalid categories provided" });
    }


    const product = await Product.create({
      name,
      price,
      stock,
      description,
      categories,
      createdBy: req.user.userId
    });

    res.status(201).json({
      message: 'Product created successfully',
      productId: product._id
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to create Product",
      error: error.message
    });
  }
};



exports.getallproducts = async (req, res) => {
  try{
    let products;

    if (req.user.role === 'admin') {
      products = await Product.find()
        .populate('categories', 'name')
        .populate('createdBy', 'name email');
    } else {
      products = await Product.find({ createdBy: req.user.userId });
    }

    res.status(200).json({products})
  }catch(error){
    console.error("Error fetching expenses:", error);
    res.status(500).json({msg:'Server error'});
  }
}

exports.getproduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    if(!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({msg:"Invalid product ID"});
    }

    let product;

    if(req.user.role === 'admin'){
      product = await Product.findById(productId);
    }else{
      product  = await Product.findOne({
        _id:productId,
        createdBy:req.user.userId
      });
    }

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};



exports.updateProduct = async (req, res) => {
  try{
    const productId = req.params.productId;
    const { name, price, stock, description, isActive } = req.body;

    const product = await Product.findOne({
      _id:productId,
      createdBy:req.user.userId
    });

    if(!product) return res.status(404).json({msg:"Product not found"});

    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;
    if (description !== undefined) product.description = description;
    if (isActive !== undefined) product.isActive = isActive;


    await product.save();



    res.status(200).json({
      message: 'Product update successfully',
      product
    });
  }catch(error){
      res.status(500).json({
      message: "Failed to update Product, server fail",
    });
  }
}



exports.deleteProduct = async (req, res) => {
  try{
    const productId = req.params.productId;
    const product = await Product.findOne({
      _id:productId,
      createdBy:req.user.userId
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    await product.deleteOne();

    res.status(200).json({
      msg: "Product deleted successfully"
    });
  }catch(error){
    res.status(500).json({msg:"Server err"});
  }
}


exports.searchProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || '';
    const minPrice = parseInt(req.query.minPrice) || 0;
    const maxPrice = parseInt(req.query.maxPrice) || Number.MAX_VALUE;
    const sort = req.query.sort || 'createdAt';

    const skip = (page - 1) * limit;

    const activeCategories = await Category.find({ isActive: true }).select('_id');
    const activeCategoryIds = activeCategories.map(cat => cat._id);

    const filter = {
      isActive: true,
      categories: { $in: activeCategoryIds },
      price: { $gte: minPrice, $lte: maxPrice },
      name: { $regex: search, $options: 'i' }
    };

    const allowedSortFields = ['price', 'createdAt', 'rating'];
    const sortField = allowedSortFields.includes(sort) ? sort : 'createdAt';
    
    const products = await Product.find(filter)
      .sort({ [sortField]: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      page,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      products
    });

  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};
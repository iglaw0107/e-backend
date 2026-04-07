const Review = require('../models/review');
const Product = require('../models/product');

exports.addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const productId = req.params.productId;

        // check if user already reviewed
        const existing = await Review.findOne({
            user: req.user.userId,
            product: productId
        });

        if (existing) {
            return res.status(400).json({ msg: 'Already reviewed this product' });
        }

        const review = await Review.create({
            user: req.user.userId,
            product: productId,
            rating,
            comment
        });

        // recalculate product rating
        const allReviews = await Review.find({ product: productId });
        const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

        await Product.findByIdAndUpdate(productId, {
            rating: avg.toFixed(1),
            numReviews: allReviews.length
        });

        res.status(201).json({ msg: 'Review added', review });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getProductReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId })
            .populate('user', 'name');

        res.status(200).json({ reviews });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};
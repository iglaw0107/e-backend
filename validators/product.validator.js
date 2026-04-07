const { body } = require('express-validator');

exports.productValidator = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be positive'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be non-negative'),
    body('categories').isArray({ min: 1 }).withMessage('At least one category required')
];
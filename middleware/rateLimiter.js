const rateLimit = require('express-rate-limit');

exports.globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: { msg: 'Too many requests, please try again later' }
});

exports.authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, // strict for login/register
    message: { msg: 'Too many attempts, please try again later' }
});
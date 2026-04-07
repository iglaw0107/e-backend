const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../validators/auth.validator');
const validate = require('../middleware/validate');


router.post('/register', registerValidator, validate, authcontroller.register);
router.post('/login', loginValidator, validate, authcontroller.login);


module.exports = router;
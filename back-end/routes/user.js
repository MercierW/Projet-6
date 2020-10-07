//IMPORT
const express = require('express');
const userCtrl = require('../controllers/user');
const emailValidator = require('../middleware/email-validator');
const limitCreateAccount = require("../middleware/limit-create-account");
const limitLoginAccount = require("../middleware/limit-login-account");

//CONSTANT
const router = express.Router();

//ROUTES
router.post('/signup', limitCreateAccount, emailValidator, userCtrl.signup);
router.post('/login', limitLoginAccount, userCtrl.login);

//EXPORT
module.exports = router;
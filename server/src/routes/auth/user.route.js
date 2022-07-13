'use strict';
const express = require('express'),
    router = express.Router(),
    auth = require('../../controllers/auth.controller'),
    userAuthController = require('../../controllers/user.system/user.auth.controller');




router.post('/register', userAuthController.createUser);
router.post('/login', auth.createJWToken, userAuthController.checkUserInfo);



    
router.route('/register/ifExistUsername').post(userAuthController.checkIfExistUsername);
router.route('/register/ifExistEmail').post(userAuthController.checkIfExistEmail);



module.exports = router;
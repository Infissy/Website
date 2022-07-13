const { validateJWToken } = require('../../controllers/auth.controller');

const router = require('express').Router(),
auth = require('../../controllers/auth.controller'),
userController = require('../../controllers/user.system/user.controller');



router.get('/user/', auth.validateJWToken, userController.GetUserInfo);
router.post('/user/delete',auth.validateJWToken,validateJWToken, userController.DeleteUser);
//router.get('/user/:id', userCtrl.GetPlayerInfo);
module.exports = router;
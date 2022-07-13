const router = require('express').Router(),
userController = require("../../controllers/user.system/user.controller"),
reportController = require("../../controllers/user.system/user.report.controller")
auth = require('../../controllers/auth.controller');


router.get('/reports',auth.validateJWToken_admin, userController.GetRoles);
router.post('/report', auth.validateJWToken,reportController.SendReport);
module.exports = router;
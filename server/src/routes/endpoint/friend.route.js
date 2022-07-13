const router = require('express').Router(),
    authController = require("../../controllers/auth.controller"),
    userController = require("../../controllers/social.system/user.friends");


    //This falls under public api, maybe use graphQL for this stuff
    router.get("/friends/:id", userController.GetFriendlist);
    router.get("/friends",authController.validateJWToken,userController.GetFriendlist);
    router.post("/friends/:id",authController.validateJWToken,userController.AddFriend);
    
    
    router.delete("/friends/:id");
    //TODO: continue friends handling
    module.exports = router;
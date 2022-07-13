//Momentarily I will use this only for one endpoint, later would be cool to have multiple endpoinds for multiple systems (Messages, Game, Login)



const router = require('express').Router(),
    eventController = require("../../controllers/event.system/event.generic"),
    authController= require("../../controllers/auth.controller")


    
    router.get("/subscribe",authController.validateJWToken, eventController.Subscribe);
   
  
    module.exports = router;
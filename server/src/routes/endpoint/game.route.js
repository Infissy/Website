const router = require('express').Router();
const queueController = require("../../controllers/game.system/user.queue");
const gameController = require("../../controllers/game.system/user.game");
const authController = require("../../controllers/auth.controller");

router.post("/enterqueue",authController.validateJWToken, queueController.EnterQueue);

router.get("/info/deck/:id",authController.validateJWToken,gameController.GetDeckCards);
router.get("/info/deck",authController.validateJWToken,gameController.GetDecks);


module.exports = router;
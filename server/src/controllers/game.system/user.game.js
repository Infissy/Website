const GameModel = require("../../models/game.model");

module.exports = {



    GetDeckCards: (req,res,next) => {

        if(req.params.id){
        }
            GameModel.getDeckCardsByID(
                req.user.UserID,
                req.params.id
                ).then(
                cards=>{
                    res.send(cards);
                }
        )


        
        
    },

    GetDecks: (req,res,next) =>{
        
        GameModel.getUserDecks(req.user.UserID).then(
            (decks)=>{
                res.send(decks);
            });
    

    }


        
}
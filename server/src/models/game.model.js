const {User, Effect} = require('../config/sqlize.config');

module.exports ={
   getDeckCardsByID: (userID, deckID)=>{
    return User.findOne({where: {UserID: userID}})
    .then(
        user=>{

            

            return user.getDecks({where: {ID : deckID}})
            .then((deck) =>{
                //Weird but should be only one deck with that id, it is a fixed value
                if(deck){
                    return deck[0].getCards({joinTableAttributes: [], include :[{
                        model: Effect,
                       
                    }]}).then(
                        cards => {
                            return cards;
                        }
                    )
                }
               
                
            });
        }
    )
    


   },
   
   getDeckCardExtendedByID: (userID, deckID)=>{
    return User.findOne({where: {UserID: userID}})
    .then(
        user=>{

            

            return user.getDecks({where: {ID : deckID}})
            .then((deck) =>{
                //Weird but should be only one deck with that id, it is a fixed value
                if(deck){
                    return deck[0].getCards({joinTableAttributes: [], include :[{
                        model: Effect,
                       
                    }]}).then(
                        cards => {
                            return cards;
                        }
                    )
                }
               
                
            });
        }
    )
    


   },


   getUserDecks: (userID) =>{
    return User.findOne({where: {UserID: userID}})
    .then(
        user=>{

            

            return user.getDecks({ raw: true } )
            .then(decks =>{
               
               if(decks)
                return decks;
                
            });
        }
    )
   }

}  
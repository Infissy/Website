const bodyParser = require('body-parser');
const { DeleteUser } = require('../../models/user.model');
const user= require('../../models/user.model'),
    helper = require('../../helpers/user'),
    passport = require('../../config/passport.config'),
    user_properties = require("../../helpers/user.enum");

module.exports = {
    //Next needed maybe? Momentum site uses it
    
    GetRoles: (req,res,next) => {
        if(req.user.UserID){
            
            user.GetBadges(req.user.UserID).then(data => res.send(`${data}`));

        }

    },
    
    

    GetUserInfo: async (req,res,next) => {
        if(req.user.UserID){


            try {
                //Copied from internet, needs renaming and better definition
                const [username, avatar, pui] = await Promises.all([
                    
                    user.GetUsername(req.user.UserID),
                    user.GetAvatar(req.user.UserID ),
                    user.GetPUI(req.user.UserID),
                
                
                
                ]);
                
                
                res.status(200).send({Username: username, Avatar: avatar, PUI: put});
    
                
                
            } catch (error) {
                
                res.status(501).send();
                console.error(error);                
            
            }
            
        }
        
        
    },


    DeleteUser: async(req,res,next) => {
        
        if(req.user.UserID){

            try {
    
    
               await user.DeleteUser(req.user.UserID);
                

               res.status(200).send();


               
            } catch (error) {
                res.status(501).send();
                console.error(error);
            }

        }
        

    }
    
}

   




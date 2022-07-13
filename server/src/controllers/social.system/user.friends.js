const user= require('../../models/user.model');
const social = require('../../models/friends.model');
module.exports = {

    AddFriend: (req,res,next) => {
        if(req.user.UserID){
            social.AddFriend(req.user.UserID,req.body.UserID);
        }
    },

    GetFriendlist: (req,res,next) => {
       
       
        if(req.params.id){
            
            user.GetFriendList(req.params.id).then(data => {

                console.log(data);
                res.send(`${data}`);
            }
            );

        }else{
            if(req.user.UserID){
                user.GetFriendList(req.user.UserID).then(data =>{
                    res.send(`${data}`);
                })
            }
        }
    }

}
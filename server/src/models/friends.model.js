const {User} = require('../config/sqlize.config');

module.exports ={
    AddFriend : (userID, friendID) =>{
        return User.findOne({where: {UserID: userID}})
        .then(
            user=>{
                user.addFriend(friendID)
                .then(res =>{
                        if(res)
                            return true;
                        else
                            return false;
                });
            }
        )
        

    }
}
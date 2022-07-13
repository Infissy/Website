const { Logger } = require("log4js");
const { async } = require("rxjs");
const {sequelize, User, UserData, UserCreds }= require("../config/sqlize.config");
const user_properties = require("../helpers/user.enum");
module.exports = {
                
    findUserCredentials: async (username, password, email, returnType)=>{
            

        let user = UserCreds.findOne({where: {loginUsername : username, password: password}});
            

    

        if(user){
            
            return user.get('UserID');
        }else{
            return false;
        }
        
    },
        
    checkIfExistUsername: async(data)=>{
    
        let user = await UserCreds.findOne({ attributes: ['loginUsername'], where: {loginUsername : data.username}})

      
        return user != null;
        
        },

        
    checkIfExistEmail: async(data)=>{
    
        let user = await UserCreds.findOne({ attributes: ['email'], where: {email : data.email}});
    
        
        return user != null;
    },


        
    GetUsername : async(userID) =>{
        

    
        let user =  await User.findOne({attributes : ['Username'], where: {UserID : userID}});
        

        return user.get('Username');
    },
        
            
        
        GetFriendList: (UserID) =>{
            return User.findOne({where: {UserID: UserID}})
            .then(
                user=>{
                    user.getFriend()
                    .then(friends=>{
                        
                        let friendList = [];
                        friends.forEach(friend => {
                            friendList.push(friend.UserID);
                        });
                        return friendList;
                        }
                    )
                }
            )
        }
        ,

        DeleteUser: async(userID) =>{
            
            
  


            try {
               
                const user = await User.findByPk(userID);

                await user.destroy();


            } catch (error) {
                
                console.error(error);

            }

            

        },


        
        CreateNewUser: async (userRegData) => {


    },
    GetAvatar : async(userID) =>{


    
        let user =  User.findOne({attributes : ['Avatar'], where: {UserID : userID}})
        
    
    
        return user.get('Avatar');
        

    },
    GetPUI : async(userID) =>{


    
        let user =  await User.findOne({attributes : ['PUI'], where: {UserID : userID}});
             
        
        
            
        return user.get('PUI');

    },
    
    GetBadges: async(UserID) =>{
        
        let user = await User.findOne({where: {UserID: UserID}})
        
        let roles = await user.getRoles();

        let rolesArray = [];
        roles.forEach(role => {
            rolesArray.push(role.ID);
        });
            

        return rolesArray;
    },
    
    GetFriendList: async (UserID) =>{
        let user = await User.findOne({where: {UserID: UserID}});


        
        let friends = await user.getFriend();


        let friendList = [];
        friends.forEach(friend => {
            friendList.push(friend.UserID);
        });

        return friendList;    
        
    }
    ,
    createNewUser: async (userRegData) => {
        let user;

        let transaction = await sequelize.transaction();

    
        try {
            
            let user = User.create({
                
                Username: userRegData.username,
                PUI: 1,
                Avatar: 1 
            },{transaction: t});
            
            await user.createUserCreds({
                email: userRegData.email,
                loginUsername: userRegData.username,
                password: userRegData.password
            },{transaction: t});
            
            
            await user.addRole(1 ,{transaction: t});
            
            
            await user.createUserData({DeckID: 1},{transaction: t});
            

            transaction.commit();
            
            
        }catch (error) {
                transaction.rollback();
                console.error(error);  
        }
                    


                                                
                    

                    

                                
                                    
        
              



    }
}



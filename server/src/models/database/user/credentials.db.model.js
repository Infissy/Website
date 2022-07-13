module.exports = (sequelize, type)=>{

    return sequelize.define('Credentials',{
        ID:{
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey : true,
        },
        
        loginUsername: {
            type: type.TEXT,
            
         
        },
        email: {
            type: type.TEXT,
          
        },
        password: {
            type: type.TEXT,
         
        },
        
        
      


    },{
        timestamps: false,
        schema: "User"
    })




 }
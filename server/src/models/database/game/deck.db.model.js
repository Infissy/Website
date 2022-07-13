'use strict';

module.exports= (sequelize,type) =>{
    return sequelize.define('Decks',{
        ID:{
            primaryKey:true,
            autoincrement:true,
            type:type.INTEGER
        },
        Name: {
            type: type.TEXT,
            notNull: true
        
          
        },
        Owner: {
            type: type.INTEGER
        }

    },{
        timestamps: false,
        schema: "Game"
    })
}
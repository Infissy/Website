
'use strict';

const CardModel = require("./card.db.model");

module.exports= (sequelize,type) =>{
    return sequelize.define('Card_Parameter',{
        ID:{
            primaryKey:true,
            autoincrement:true,
            unique: true,


            type:type.INTEGER,

            

        },
        Absolute:{
            type: type.INTEGER,
            allowNull: false,
        },
        Healable:{
            type: type.BOOLEAN,

            allowNull: false,
        },
        Targetable: {
            type: type.BOOLEAN,
            allowNull: false,
        },
        
        
    },{
        timestamps: false,
        schema: "Game"

    })
}
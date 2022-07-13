'use strict';

const CardParametersModel = require("./card_parameters.db.model");

module.exports= (sequelize,type) =>{
    return sequelize.define('Card',{
        ID:{
            primaryKey:true,
            autoincrement:true,
            type:type.INTEGER,

           
            
            allowNull: false,
        },
        Name:{
            type: type.TEXT,
            allowNull: false,
        },
        Description:{
            type: type.TEXT,
            allowNull: false
        },
        Image: {
            type: type.SMALLINT
        },

        
    },{
        timestamps: false,
        schema: "Game"

    })
}
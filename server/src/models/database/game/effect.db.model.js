'use strict';

module.exports= (sequelize,type) =>{
    return sequelize.define('Effect',{
        ID:{
            primaryKey:true,
            autoincrement:true,
            type:type.INTEGER
        },
        Name:{
            type: type.TEXT
        },
        Description:{
            type: type.TEXT
        },
        Type: {
            type: type.SMALLINT
        },
        Value: {
            type: type.INTEGER
        },
        Target:{
            type:type.SMALLINT
        }


    },{
        timestamps: false,
        schema: "Game",
        freezeTableName: true

    })
}
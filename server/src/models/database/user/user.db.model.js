'use strict';
 module.exports = (sequelize, type)=>{
    //TODO: Fix 
    return sequelize.define('User',{
        ID: {
            type: type.INTEGER,
            primaryKey : true,
            autoIncrement: true
        },
        Username: {
            type: type.TEXT,
            notNull: true
        
          
        },
        PUI: {
            type: type.SMALLINT,
            default: 1,
            notNull: true
        },
        Bio:{
            type: type.TEXT,
           
        },
        Avatar:{
            type: type.SMALLINT,
            notNull: true,
            default: 1
        },
        Points:{
            type: type.SMALLINT,
            notNull: true,
            default: 0
        }
        

    },{
        indexes:[{
                unique: true,
                fields: ['Username','PUI']
        }],
        timestamps: false,
        schema: "User"
    })




 }
module.exports = (sequelize, type)=>{

    return sequelize.define('Roles_Users',{
        ID: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true 

        },
        UserID:{
            type: type.INTEGER
        },

        RoleID: {
            type: type.INTEGER
        }

    },{
        timestamps: false,
        schema: "Social"
    });

}
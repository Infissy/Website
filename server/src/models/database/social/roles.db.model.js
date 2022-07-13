module.exports = (sequelize, type)=>{

    return sequelize.define('Roles',{
        ID: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        RoleName: {
            type: type.TEXT,
            notNull: true
           
        },
        RoleBadge: {
            type: type.SMALLINT,
            notNull: true
        }
       
    },{
        timestamps: false,
        schema: "Social"
    })
}
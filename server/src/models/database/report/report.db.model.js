module.exports = (sequelize, type)=>{
    //TODO: Fix 
    return sequelize.define('report',{
        ID: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        UserID: {
            type: type.INTEGER,
            notNull: true
           
        },
        ReportMessage: {
            type: type.TEXT,
            notNull: true
        },
        ReportType: {
            type: type.SMALLINT,
            notNull: true
        }
    },{
        timestamps: false,
        schema: "Report"
    })
}
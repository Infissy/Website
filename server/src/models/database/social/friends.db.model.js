module.exports = (sequelize, type)=>{
    //TODO: Fix 
    return sequelize.define('Friends',{
        ID: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true 

        },
        FriendID:{
            type: type.INTEGER
        },

        FriendToID: {
            type: type.INTEGER,
            validate: {

                isGreaterThanOtherField(value) {
                    if (parseInt(value) <= parseInt(this.FriendID)) {
                      throw new Error('FriendToID must be greater than FriendID.');
                    }
                  }
            }
        }

    },{
        timestamps: false,
        schema: "Social"
    });

}
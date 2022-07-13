module.exports = (sequelize, type)=>{

    return sequelize.define('Cards_Decks',{
        ID: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true 

        },
        CardID:{
            type: type.INTEGER
        },

        DeckID: {
            type: type.INTEGER
        }

    },{
        timestamps: false,
        schema: "Game"
    });

}
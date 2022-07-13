'use strict'
require('dotenv').config();

const logger = require('log4js').getLogger();
const authController = require('../controllers/auth.controller');


//Need user/admin account
const Sequelize = require('sequelize'),
    sequelize = new Sequelize(process.env.DATABASE_URL,{dialect: 'postgres',
     ssl: true,
     plain: true,
    raw: false,
     logging: console.log,
     dialectOptions: {
        ssl: true,
        
      }}),
    CardModel = require("../models/database/game/card.db.model"),
    DeckModel = require("../models/database/game/deck.db.model"),
    CardsDecksModel = require("../models/database/game/cards_decks.db.model"),
    EffectModel= require("../models/database/game/effect.db.model"),

    RoleModel = require("../models/database/social/roles.db.model"),
    ReportModel = require("../models/database/report/report.db.model"),
    UserModel = require("../models/database/user/user.db.model"),
    RolesUserModel = require("../models/database/social/roles_users.model"),
    FriendsModel = require('../models/database/social/friends.db.model'),
    CredentialModel = require("../models/database/user/credentials.db.model");



// checks the database connectivity

const User = UserModel(sequelize,Sequelize);
const Credential = CredentialModel(sequelize,Sequelize);
const Roles_User = RolesUserModel(sequelize,Sequelize);
const Role = RoleModel(sequelize,Sequelize);
const Report = ReportModel(sequelize,Sequelize);
const Friends = FriendsModel(sequelize,Sequelize);
const Deck = DeckModel(sequelize,Sequelize);
const Card = CardModel(sequelize,Sequelize);
const CardDeck = CardsDecksModel(sequelize,Sequelize);
const Effect = EffectModel(sequelize,Sequelize);

Card.belongsToMany(Deck, {through: CardDeck, foreignKey: 'CardID', otherKey: 'DeckID'});
User.hasMany(Deck,{foreignKey: 'Owner', onDelete: 'CASCADE', as: 'Decks',});

Role.belongsToMany(User, {through: Roles_User, foreignKey: 'RoleID'});
User.belongsToMany(Role, {through: Roles_User, foreignKey: 'UserID'});
User.belongsToMany(User, {through: Friends, as: 'Friend', foreignKey: 'FriendToID', otherKey:'FriendID'});


Card.hasMany(Effect,{foreignKey: 'CardID', onDelete: 'CASCADE'});
Effect.belongsTo(Card);



User.hasOne(Credential, {foreignKey: 'ID', onDelete: 'CASCADE'});
Credential.belongsTo(User, {foreignKey : 'ID'});


(async ()=>{

  try{

    await sequelize.authenticate()
    
  
    console.log('Connection has been established successfully.');
  
  
  
    await sequelize.createSchema('"User"',{});
  
    
    await sequelize.createSchema('"Report"',{});
    await sequelize.createSchema('"Social"',{});
    await sequelize.createSchema('"Game"',{});
    await sequelize.sync({force : true})

    await Role.create({});
  

  }catch(err)  {

    console.error(err)

  }

})();

  module.exports = {sequelize,
          Effect,
          User: User,
          UserCreds: Credential,
          Roles_Users: Roles_User,
      };
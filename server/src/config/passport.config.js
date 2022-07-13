'use strict';

var passport = require('passport'),

    user = require("../models/user.model"),

    LocalStrategy = require('passport-local').Strategy,
    CustomStrategy = require('passport-custom'),
    passportJWT = require("passport-jwt"),
    JWTStrategy   = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt;
    


passport.use(new JWTStrategy({

  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : process.env.JWT_SECRET
  }, (payload, done) =>{  
  
  

  return done(null, payload);

}));


passport.use('admin', new CustomStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : process.env.JWT_SECRET
},
  function(payload, done) {
    let roles = user.GetBadges(payload).then((res,err) => {
      //Set properties
      
      if(err){
        done(err);
      }
      
      if(roles.includes(1)|| roles.includes(2) || roles.includes(6)){
        done(null, payload);
      }else{
        done(null,false);
      }

      
      
      
    });
    }
));


passport.use(new LocalStrategy(
  (username, password, done)=>{
    
   
    user.findUserCredentials(username,password,null,Boolean).then((res,err)=>{
     
      if(err){
        return done(err);
      }
      if(!res){
        return done(null,false,{message: "Incorrect credentials"});
      }
       
      return done(null,{UserID:res});

    });
  }  
));

module.exports = passport;
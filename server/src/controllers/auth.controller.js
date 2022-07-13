const jwt  = require("jsonwebtoken");

module.exports = {

    
    validateJWToken : (req,res,next) =>{
      passport.authenticate('jwt', { session: false }
        
      )(req,res,next)
    
    
    },

    validateJWToken_admin: (req,res,next) =>{
      passport.authenticate("admin",  {session:false} )(req,res,next)
    },

    createJWToken : (req,res,next)=>{
   
        passport.authenticate('local', { session: false , scope: req.body} ,(err,AuthInfo,info )=>{
          
          
          if(err){
            console.log(err);
          }
          if(AuthInfo){

            req.payload = jwt.sign(AuthInfo,process.env.JWT_SECRET);
            next();
          }
          

          

        })(req,res,next)   

}}
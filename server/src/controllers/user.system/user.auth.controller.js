
const user= require('../../models/user.model')
    helper = require('../../helpers/user'),
    passport = require('../../config/passport.config'),
    {register_data} = require("./user.schemas.js"),
    json_validator = require('ajv')(),
    
    logger = require('log4js').getLogger();

module.exports = {

    createUser: (req,res) =>{

        const validate = json_validator.compile(register_data);
        let query;
        const valid_data = validate(req.body);
        if(valid_data){

            user.CreateNewUser(req.body).then((query_result) =>{
                query = query_result;
                if(query_result){
                    res.status(200).send(true);
                }
                
                }).catch(err =>{
                    if(err){

                        console.error(err);
                        res.status(400).send(false);

                    }
                        
                });
        }
        else{
            //TODO: Differentiate between loggers
            logger.error(`Register data input schema not valid, received ${req.body}`);
            
            
            res.send(false);
        
        } 
    },
    
    checkUserInfo: (req,res,next)=>{
        res.send({JWT_TOKEN: req.payload});
       
    },

    
    checkIfExistUsername: (req,res)=>{
    
        user.checkIfExistUsername(req.body)
            .then(checkExistUsername => 
                res.send(checkExistUsername));
       
    },

    checkIfExistEmail: (req,res)=>{
    
        user.checkIfExistEmail(req.body)
            .then(checkExistEmail => 
                res.send(checkExistEmail));
       
    },

}
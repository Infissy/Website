
const axios = require("axios");
const expect = require("chai").expect;
const { env } = require('process');
const dotenv = require('dotenv').config();
const log4js = require('log4js');


var logger = log4js.getLogger();
logger.level = "debug";

const Register = async() => {
     const url = "http://localhost:" + process.env.PORT + "/auth/register";
    return axios.post(url,{
                    
                        username: 'Admin',
                        password: 'Admin',
                        email: 'Admin@Admin.com',
                         
                });

    
}

const Login = async() => {
     const url = "http://localhost:" + process.env.PORT + "/auth/login";
    return axios.post(url,
        {
            
                username: 'Admin',
                password: 'Admin'
                
        }
    )

    
}

const DeleteUser = async(JWT_TOKEN) => {

    const url = "http://localhost:" + process.env.PORT + "/dashboard/user/delete";
    return axios.post(url,
        {},
       {headers: {Authorization: `Bearer ${JWT_TOKEN}`}},
    );
}



describe("Auth API", ()=>{
 
    
    before( () =>{
        //Insert login/create account

    })
    it("User Registration", async () =>{
        
    


            const registration_res = await Register();

            console.log("Registration!");

            expect(registration_res.status).to.equal(200);


            const login_res = await Login();  

            console.log("Login!");

            expect(login_res.status).to.equal(200);
        
            
            expect(login_res.data).to.key("JWT_TOKEN");  
            
            const deletion_res = await DeleteUser(login_res.data.JWT_TOKEN);
                
                   

            
            
            console.log("Deletion");



            expect(deletion_res.status).to.equal(200);



                
        
                
                
                
               
                

                
           


    })
    
  
    after(()=>{

        //Dispose account
    })
});
const WebSocket = require("ws");

const {EventCategory,QueueEvent, ENDPOINTS} = require("../server/game/properties/network.properties");
var expect = require('chai').expect;


const axios = require("axios");
describe("Connection to queue",()=>{
  
   

    it("Receive confirmation", (done)=>{
        let ws = {};
        
        ws = new WebSocket('ws://localhost:'+process.env.PORT);
        
    

            let url = ENDPOINTS.LOGIN;
            
          axios
            .post( url, 
                {
                    username: 'Admin',
                    password: 'Admin'
                    }
                )
            .then(res =>{

                expect(res.status).to.equal(200);
                
                ws.send(res.data.JWT_TOKEN);
                ws.once("message",(message)=>{
                let Message=  JSON.parse(message);
                
                expect(Message.EventType).to.equal(EventCategory.Queue);
                expect(Message.Event).to.equal(QueueEvent.Entered);

            
                done();
                ws.close();


              })


            }).catch(err=>{

                console.log(err);
            })

        
        
    
       
                
    }).timeout(5000);

});

describe("Create a game",()=>{
   
 
    let ws1 = {};

    it("Receive confirmation first client", (done)=>{



        ws1 = new WebSocket('ws://localhost:3000');
        
        let url = ENDPOINTS.LOGIN;
            
        axios
          .post( url, 
              {
                  username: 'Admin',
                  password: 'Admin'
                  }
              )
          .then(res =>{

              expect(res.status).to.equal(200);
              
              ws1.send(res.data.JWT_TOKEN);
              ws1.once("message",(message)=>{
              let Message=  JSON.parse(message);
              
              expect(Message.EventType).to.equal(EventCategory.Queue);
              expect(Message.Event).to.equal(QueueEvent.Entered);

          
              done();
             


            })


          }).catch(err=>{

              console.log(err);
          })

      
      
  
     
              
  }).timeout(5000);


       
       

   
    it("Receive confirmation second client", (done)=>{
        let ws2 = new WebSocket('ws://localhost:3000');  


        

        ws2.on("open",() => {


            
       
        
        let url = ENDPOINTS.LOGIN;
            
        axios
          .post( url, 
              {
                  username: 'Admin',
                  password: 'Admin'
                  }
              )
          .then(res =>{

              expect(res.status).to.equal(200);
              
              ws2.send(res.data.JWT_TOKEN);
              ws2.once("message",(message)=>{
              let Message=  JSON.parse(message);
              expect(Message.EventType).to.equal(EventCategory.Queue);
              expect(Message.Event).to.equal(QueueEvent.Entered);

                  ws2.once("message",(message)=>{
                      let Message = JSON.parse(message);
                      expect(Message.EventType).to.equal(EventCategory.Queue);
                      expect(Message.Event).to.equal(QueueEvent.GameFound);
      
                  
                          ws1.once("message",(message)=>{
                              let Message = JSON.parse(message);
                              expect(Message.EventType).to.equal(EventCategory.Queue);
                              expect(Message.Event).to.equal(QueueEvent.GameFound);
              
                              done();
                              ws1.close();
                          
                          });
          
                     
                      ws2.close();
                  });
          


            })


          }).catch(err=>{

              console.log(err);
          })

            
            


        });
    });

  


});



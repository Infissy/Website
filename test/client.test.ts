import WebSocket = require("ws")

import { ENDPOINTS, MessageFactory } from "../server/game_src/properties/properties.network"
import axios from "axios"

import { Message } from "../server/game_src/properties/message"

import { Client, RequestParameterType } from "../server/game_src/serverInstance/entities/client"
import {Card} from "../server/game_src/serverInstance/entities/card"
import { expectType } from "ts-expect"
import { EventCategory, InfoType } from "../server/game_src/serverInstance/entities/message"



interface JWT {
  JWT_Token: string;
}



describe("Get Deck", () => {
  it("DeckInitialization", (done) => {
    
    let wsServer: WebSocket.Server = new WebSocket.Server({
      port : Math.floor(Math.random() * 3000) + 3000
    });
    let port :number = wsServer.options.port;
    try {
      
      let url = ENDPOINTS.LOGIN;

      wsServer.on('connection', (ws) => {
          
        axios
          .post(url,
            {
              username: 'Admin',
              password: 'Admin'
            }
          )
          .then(res => {

            expect(res.status).toBe(200);
              
            expectType<JWT>(res.data)

            let client: Client = new Client(ws, res.data.JWT_TOKEN);
            
            client.RequestParameter(RequestParameterType.Deck).then((deckID) => {
              
           
              
              client.GetCards(deckID as number, 0).then((res) => {
                    
                expectType<Array<Card>>(res);
              
                console.table(res);

                done();
                wsServer.close();
              });

            })
              
          })


      })
    } catch (err) {
        
       
      wsServer.close();
      console.log(err);
    }
  
    



    
    let wsClient: WebSocket = new WebSocket('ws://localhost:' + port);



    
    wsClient.on("message", (deckRequest) => {
    
      let message: Message = JSON.parse(deckRequest as string);
      if (message.EventType === EventCategory.Request) {
        
        let response: Message = { EventType: EventCategory.Request, Event: InfoType.PlayerDeck, Flag: 2 };
        wsClient.send(MessageFactory(response));
      }

    })

    
  
      
    })

    






  it("Should Receive Cards",(done)=> {
    
      let ws: WebSocket = new WebSocket('ws://localhost:'+process.env.PORT);
      
  

          let url = ENDPOINTS.LOGIN;
      
    axios
      .post(url,
        {
          username: 'Admin',
          password: 'Admin'
        }
      )
      .then(res => {

        expect(res.status).toBe(200);
           
        expectType<JWT>(res.data)

        let client: Client = new Client(ws, res.data.JWT_TOKEN);
        

        client.GetCards(2,0).then((res) => {
              
          expectType<Array<Card>>(res);
          console.log(res);
          done();
        });
      
              


      }).catch((err) => {
        console.log(err);      
      })


    })

      
      
  
     
              



  })


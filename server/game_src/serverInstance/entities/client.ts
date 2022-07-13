
import axios, { AxiosRequestConfig } from "axios";
import {EventEmitter } from "events"
import WebSocket from "ws"


import { ENDPOINTS,  MessageFactory} from "../../properties/properties.network";
import { Card } from "../entities/card"
import { EventCategory, Message, InfoType } from "./message"
import { MaxCardNumber, Stats } from "../../properties/properties.game";




class ClientEventEmitter extends EventEmitter {}


export class Client {

  
  private webSocket: WebSocket;
  private JWToken: string;

  ClientEvent: ClientEventEmitter;
  
  constructor(webSocket: WebSocket, JWToken: string) {
    

    this.ClientEvent = new ClientEventEmitter();

    
    
    this.webSocket = webSocket;
    webSocket.on("message",this.OnMessage.bind(this));
    webSocket.on("error", this.OnError.bind(this));
    webSocket.on("close", this.OnClose.bind(this));



    
    this.JWToken = JWToken;


  }

   

  private OnMessage(this: any, params:string) {
    
    try {
      let message: Message = JSON.parse(params);
    
      
      switch (message.EventType) {
       
        case EventCategory.Request:
          


          //this.ClientEvent.emit('request', message.TextData || message.Data);
        
          

        case EventCategory.Game:

          
             
          break;
          case EventCategory.Info:
            break;   

      }

     
        
      
      
      
      //this.ClientEvent.emit('move', ());

      
    } catch (err) {
      console.error(err);
    } 
    
    
  }


  private OnError(params: Error)  {
    
  }

  private OnClose(params: string) {
    
  }


  RequestParameter(parameter: RequestParameterType) : Promise<number | string> {
    
    let message :Message = {EventType: EventCategory.Request};
    
    switch (parameter) {
      case RequestParameterType.Deck:

        message.Event = InfoType.PlayerDeck;
      
        break;
      case RequestParameterType.JWToken:
        message.Event = InfoType.JWToken;
      default:
        
        break;
    }

   
  
    //Return a promise with the data needed
    return new Promise((resolve, reject)  => {
      
      
      this.webSocket.send(MessageFactory(message)); 

        //Uses own event emitter for request type of message
        this.ClientEvent.once('request',(data) => {
          
        

          //Need to check better data validity
          if (typeof data == "string" || typeof data == "number")
          {
            resolve(data);

          }
          
            
          
          
         
        })
        
        
    
      });


    

  }

  SendPlayerInfo() {

    Request("GET", ENDPOINTS.GET_PLAYER_INFO, this.JWToken).then((res) => {

      let PlayerInfo: Stats = res;
    

      let message : Message = {EventType:  EventCategory.Info, Event: InfoType.Info , Payload: PlayerInfo };

      this.webSocket.send(MessageFactory(message));

    })
    
  }

  GetCards(DeckID: number, playerID: number): Promise<Array<Card>> {
    
    let message: Message = { EventType : EventCategory.Info , Event: InfoType.PlayerDeck};
   

    return Request("GET", `${ ENDPOINTS.GET_DECK_CARDS}${DeckID}` , this.JWToken).then((res)=>{

      let Cards: Array<Card> = res.map((cardInfo: Card, cardID:number) => {
        
        res[cardID].ID = cardID + MaxCardNumber * playerID;
        return cardInfo as Card;
      });
     
      //Dunno if this here is a good idea, not modular, everytime I get cards it sends them to the player
      let message : Message = {EventType:  EventCategory.Info, Event: InfoType.Info, Payload: res };
      this.webSocket.send(MessageFactory(message));
      
      return Cards;

    })
  }






  


}

export interface PlayerHandles{

  Move: Function;
  Status: Function;


}

export enum RequestParameterType {
  JWToken,
  Deck,

}



function Request  (Method: AxiosRequestConfig['method'],URL: AxiosRequestConfig['url'], Token: string, Data? : any) : Promise<any>  {
  

  return axios({
    method: Method,
    url: URL,
    headers: {
      Authorization: `Bearer ${Token}`
    },
    data: Data
  }).then((res) =>{
    if (res) {
      return res.data;
    }
  }, (err) => {
      console.log(err);
  })

  
}
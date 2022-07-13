
import {Message} from "../serverInstance/entities/message";
import {Card } from "../serverInstance/entities/card";



export namespace ENDPOINTS {
  const URL = 'http://localhost';
  
  export const LOGIN: string = `${URL}:${process.env.PORT}/auth/login`;


  export const ENTER_QUEUE: string = `${URL}:${process.env.PORT}/game/enterqueue`;
  
  
  export const GET_DECKS: string = `${URL}:${process.env.PORT}/game/info/deck`;
  export const GET_DECK_CARDS: string = `${URL}:${process.env.PORT}/game/info/deck/`;
  export const GET_PLAYER_INFO: string = `${URL}:${process.env.PORT}`;
}

export function MessageFactory(Message: Message) :string {
  


  return JSON.stringify(Message);
  
}




import { Stats } from "../../properties/properties.game";
import {Card} from "./card"



export enum EventCategory{
  //Compile 
  Queue,
  Info, //Send Informations
  Request, //Request Informations
  Game,
  Error
};



export enum QueueEvent{
  Entered,
  Exited,
  Error,
  GameFound
};


export enum InfoType{
  Info, //Username, PUI
  PlayerDecks, //All decks available
  PlayerDeck, //Single deck
  JWToken //Identification token
}


export interface Message{
  EventType: EventCategory;

  //Compile possible events
  Event?: QueueEvent | InfoType;


  Flag?: number;
  
  //Compile eventual possible arrays
  Payload?:  
      Array<Array<Number>> //Game move
   | Array<Card>
   | Stats
   | number;
}


/*

  Queue
    Entered,
    Exited,
    Error,
    GameFound

  GameInitialization
    Array<Card>

  Game
    PlayerMove
      ID, EffectID, TargetID





*/
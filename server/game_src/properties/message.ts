const { NumericLiteral } = require("typescript");
import {PlayerInfo} from "./properties.game"
import { EventCategory, InfoType, QueueEvent, Objects } from "./properties.network";
import {Card} from "../serverInstance/entities/card"






export interface Message{

  //TODO : x
  EventType: EventCategory;

  //Compile possible events
  Event?: QueueEvent | InfoType;


  Flag?: number;
  
  //Compile eventual possible arrays
  Payload?:  
      Array<Array<Number>> //Game move
   | Array<Card>
   | PlayerInfo
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
import { EventEmitter } from "ws";
import { InitializationValues, Stats } from "../../properties/properties.game";
import { Card } from "./card";
import { Client, RequestParameterType } from "./client";
import { CardMove, EffectManager } from "./effect.manager";

class PlayerEventEmitter extends EventEmitter {}


  
  export class Player {
    
    PlayerID: number;
    Draw() {
      throw new Error("Method not implemented.");
    }


    Client: Client;


    PlayerParameters: Stats;


   
    EnemyKnownParameters: Array<Stats> =[];
    EnemyKnownCards: Array<Array<Card>> = [];
  
  
  
    Move : Array<CardMove> = [];
   
    //Stuff to initialize
    Cards: Array<Card> = [];
   
  
    initialization: Promise<void[]>;
    WatchEnemy: any;

    PlayerEvent: any;
  

    
    constructor(Client: Client, PlayerID: number) {
      this.Client = Client;
      this.PlayerID = PlayerID;
  
   
      
      this.PlayerEvent = Client.ClientEvent;
  
      
      
      this.PlayerParameters = {
        Population: InitializationValues.Absolute,
        Resources: InitializationValues.Resources,
        Gold: InitializationValues.Gold
      }
      
  
  
      //Momentarily use only one, since it is duel, after though I might want to change this
      this.EnemyKnownParameters = [{
        Population: InitializationValues.Absolute,
        Resources: InitializationValues.Resources,
        Gold: InitializationValues.Gold
      }];
  
  
  
      
      let deckRequest = this.Client.RequestParameter(RequestParameterType.Deck)
        .then((deckID) => {
  
          return Client.GetCards(PlayerID, deckID as number);
        })
        .then((deck) => {
  
          this.Cards = deck;
  
        })
        .catch((err) => {
        
          console.error(err);
  
       })
      
  
      
  
      //Async tastk that initializes all the long taking parameters needed
      this.initialization = Promise.all([deckRequest]);
      
  
    }
  
  
  
  
    AttemptPlay(PlayerAffectResult:Array<Stats>,CardMoveResult:Array<Array<Card>>){
      
    }
  
    PlayCard(Card:Card,EffectIDs:Array<Number>,TargetIDs:Array<Number>){

      //Every time a players attempts to move he calls effectmanager, it returns to him the "attempted" values and sends them to the client
      //There is a queue of cards played, then it runs it again with both player actually doing stuff
      //The client should be able to alter the move stack, and confirm it

    }

  
    
    EnemyWatch(): Stats{
      
      return this.PlayerParameters;
  
    }
  
  
    Watch() {
      
      this.EnemyKnownParameters = this.WatchEnemy();
     
  
  
  
    }
  
  
  
  
   
      
  }


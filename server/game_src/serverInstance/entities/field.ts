"use strict";

import { Player } from "./player";
import { Card } from "./card";
import { CardEffect } from "./effect"
import { EffectManager , CardMove} from "./effect.manager";
import { GamePhases } from "../../properties/properties.game";
interface MovePriority{
  MoveExecuted: boolean;
  Executor: number;

}

export class Field{
  

  GamePhase: GamePhases = GamePhases.Draw;
  Players: Array<Player> = [];

  

;

  MovePriority: MovePriority;

  constructor(Players: Array<Player>) {

    this.MovePriority =
    {
      MoveExecuted: false,
      Executor: 0
    }

   

    this.Players[0] = Players[0];
    this.Players[1] = Players[1];



    this.Players[0].WatchEnemy = this.Players[1].EnemyWatch;
    this.Players[1].WatchEnemy = this.Players[0].EnemyWatch;


    this.Players.forEach((player, playerID)=>{
      player.PlayerEvent.on("move", () => {
      
        this.Action(playerID);
  
      })
  
    })

  }





  /*
  TODO 
  Player gets Infos from player and queued moves, sends them to a effect manager that exectutes everything, returns a big structure with all the moves applied and consequent effects

  */


  Attempt(Card: Card, PlayerID: number,EffectIDs: Array<number>, TargetIDs : Array<number>){
    
    //Check move validity, might want to insert this inside effect handler
    Card.Effects.forEach((effect,effectID) => {
        if(this.GamePhase === GamePhases.Play &&
          EffectIDs.includes(effectID) &&
          !(effect.Type === CardEffect.Type.Spawn) &&
          !(effect.Type === CardEffect.Type.Move)
          ){

            throw new Error("Invalid move by the player, tried to execute effects during play phase");
            
        }
    });

    let Move : CardMove = {
      CardMoved: Card,
      EffectIDs:EffectIDs,
      TargetsIDs: TargetIDs

    }
    let playerinfo = this.Players[PlayerID].EnemyKnownParameters.map((Playerinfo) =>{
      if(playerinfo === undefined)
        return this.Players[PlayerID].PlayerParameters;
      else
        return Playerinfo;

    })

    let MoveResult = EffectManager.Play(
      playerinfo,
      Move,
      this.Players[PlayerID].Cards,
      this.Players[PlayerID].EnemyKnownCards)

      //MoveResult.

  }

  Action(playerID: number) {
    if (this.MovePriority.MoveExecuted)
      this.ChangePhase();
    else {
      this.ChangePhase();
    }

  }

  ChangePhase() {
    
    switch (this.GamePhase) {
      case GamePhases.Draw:
       this.Players.forEach(player => {
          player.Draw();
        });
        break;
    
      default:
        break;
    }


  }



}
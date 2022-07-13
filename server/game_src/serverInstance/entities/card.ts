
"use strict";

import {Effect, EffectInfo} from "./effect"
import {} from "../../properties/properties.game"





export enum CardPosition {
    Deck,
    Hand,
    Defence,
    Attack,
    Graveyard
  }

export interface Card {
    ID: number;
    Absolute: number;
    Healable: boolean;
    Destructible: boolean;
    Targetable: boolean;
    Effects: Array<Effect>;
    Position:CardPosition;


   

}
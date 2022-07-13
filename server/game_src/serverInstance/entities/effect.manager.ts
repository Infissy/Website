
import { Stats } from "../../properties/properties.game";

import { Card , CardPosition} from "./card";
import { CardEffect, Effect } from "./effect";
import { CardEffectTarget} from "./effect";





export interface CardMove{
    CardMoved: Card,
    EffectIDs?: Array <number>,
    TargetsIDs?: Array<number>,
}


interface MoveResult{
    
    PlayerAffectResult?: Array<Stats>,
    CardAffectResult?: Array<Array<Card>>
}

export class EffectManager{


  
    //Move 


    
    

    //Players with already defined priority
    static Play(
        PlayersInfo: Array<Stats>,
        CardMove:CardMove,
        PlayersCards: Array<Card>,
        EnemyKnownCards:Array<Array<Card>>
        ): MoveResult 
        {

  
        let MoveResult : MoveResult;

        let PlayersAffectResults: Array<Stats>=[];
        let AffectedCards:Array<Array<Card>>=[];
        CardMove.CardMoved.Effects.forEach((effect,effectID)=>{
            let effectRes : (Array<Stats>|Array<Array<Card>>)[] = [];
            if(CardMove.TargetsIDs)
            {
                if(CardMove.EffectIDs?.includes(effectID))
                    {
                        //effectRes = this.HandleEffect(effect,,PlayersInfo, PlayersCards,EnemyKnownCards,CardMove.TargetsIDs[effectID]);

                      
                    }
                
            }else{
                //effectRes = this.HandleEffect(effect,PlayersInfo, EnemyKnownCards);

                

            }   

            (effectRes[0] as Array<Stats>).forEach((player , playerID) =>{
                          
                PlayersAffectResults[playerID].Gold += player.Gold;
                PlayersAffectResults[playerID].Population += player.Population;
                PlayersAffectResults[playerID].Resources += player.Resources;
            });

            (effectRes[1] as Array<Array<Card>>).forEach((cards,playerID) => {

                cards.forEach(resCard => {
                    let index  = AffectedCards[playerID].findIndex(card => card.ID === resCard.ID);
                    if(index != -1){


                      //#region Set cards
                        AffectedCards[playerID][index].Absolute += resCard.Absolute;
                        
                        AffectedCards[playerID][index].Destructible = resCard.Destructible;
                        
                        AffectedCards[playerID][index].Healable = resCard.Healable;
                        
                        AffectedCards[playerID][index].Position = resCard.Position;
                        
                        AffectedCards[playerID][index].Targetable = resCard.Targetable;
                        
                        //#endregion 



                    }



                });
               
            });
            
        
            
                    

        })

        
        
        MoveResult = {
            PlayerAffectResult:PlayersAffectResults,
            CardAffectResult:AffectedCards
        
        }
        
        


        return MoveResult;


    }


    static HandleEffect(
            Effect: Effect,
            PlayersInfo: Array<Stats>,
            Cards:Array<Array<Card>>,
            TargetID ?:number )
    
    {
        let PlayersAffectResults : Array<Stats> =[];
        let AffectedCards : Array<Array<Card>> = [];
        switch (Effect.Type) {
            
           
        //#region ValueIncrement
            case CardEffect.Type.ValueIncrement:
                switch (Effect.Target) {
                    case CardEffectTarget.Gold:
                        
                        PlayersAffectResults[TargetID as number].Gold += Effect.Value;
                        break;
                    case CardEffectTarget.Population:
                        PlayersAffectResults[TargetID as number].Population += Effect.Value;
                        break;
                    case CardEffectTarget.Resources:
                        PlayersAffectResults[TargetID as number].Resources+= Effect.Value;
                        break;

                    default:
                        EffectParsingError(
                            CardEffect.Type.ValueIncrement,
                            Effect.Target
                        )
                        break;
                      
                }

            //#endregion Value
        //#region PercentualIncrement
            case CardEffect.Type.PercentualIncrement:
                switch (Effect.Target) {
                    case CardEffectTarget.Gold:
                        PlayersAffectResults[TargetID as number].Gold += PlayersInfo[TargetID as number].Gold * Effect.Value / 100;
                        break;
                    case CardEffectTarget.Population:
                        PlayersAffectResults[TargetID as number].Population +=PlayersInfo[TargetID as number].Population * Effect.Value / 100;
                        break;
                    case CardEffectTarget.Resources:
                        PlayersAffectResults[TargetID as number].Resources+=PlayersInfo[TargetID as number].Resources * Effect.Value / 100;
                        break;
                    default:
                        EffectParsingError(
                            CardEffect.Type.PercentualIncrement ,
                            Effect.Target
                        )
                        break;

                    
                      
                }
            //#endregion
        //#region ValueBased
            case CardEffect.Type.ValueBased:
                //Define Static Values
                
                switch (Effect.Target) {
                    case CardEffectTarget.Targetable:
                        {
                            //TODO low priority, adjust redundancy
                            
                            //Here it should find the player index, (ID)
                            let cardPlayerIndex= Cards.findIndex(playerCards => playerCards.some(card => card.ID === TargetID));
                            
                            //And using the player id it searches for his card, it is redundant but for now might work
                            let cardPlayed = Cards[cardPlayerIndex].find(card => card.ID === TargetID);
                            
                            if(cardPlayed){
                                cardPlayed.Targetable = Effect.Value as any;
                                AffectedCards[cardPlayerIndex].push(  cardPlayed);
                            }
                                
                            
        
        
                        }
                       
                        
                        break;
                        
                    case CardEffectTarget.Healable:
                        {
                            //TODO low priority, adjust redundancy
                            
                            //Here it should find the player index, (ID)
                            let cardPlayerIndex= Cards.findIndex(playerCards => playerCards.some(card => card.ID === TargetID));
                            
                            //And using the player id it searches for his card, it is redundant but for now might work
                            let cardPlayed = Cards[cardPlayerIndex].find(card => card.ID === TargetID);
                            
                            if(cardPlayed){
                                cardPlayed.Healable = Effect.Value as any;
                                AffectedCards[cardPlayerIndex].push(  cardPlayed);
                            }
                                
                            
        
        
                        }
                        
                        
                        break;
                    case CardEffectTarget.Destructible:
                        {
                            //TODO low priority, adjust redundancy
                            
                            //Here it should find the player index, (ID)
                            let cardPlayerIndex= Cards.findIndex(playerCards => playerCards.some(card => card.ID === TargetID));
                            
                            //And using the player id it searches for his card, it is redundant but for now might work
                            let cardPlayed = Cards[cardPlayerIndex].find(card => card.ID === TargetID);
                            
                            if(cardPlayed){
                                cardPlayed.Destructible = Effect.Value as any;
                                AffectedCards[cardPlayerIndex].push(  cardPlayed);
                            }
                                
                            
        
        
                        }
                                
                        break;
                    default:

                        EffectParsingError(
                            CardEffect.Type.ValueBased,
                            Effect.Target
                        )
                        break;
                }
            
            break;
            //#endregion


            
            case CardEffect.Type.CardDraw:
                {
                    let drawCount = Effect.Value;
                    let deck = Cards[TargetID as number];

                    for(let i = 0; i < drawCount; i++){
                        if(deck[i].Position === CardPosition.Deck)
                            {
                                deck[i].Position = CardPosition.Hand;
                                AffectedCards[TargetID as number].push(deck[i]);
                                drawCount--;
                            }
                        }
                       

                    }

            
                        
                 
                    //Order array to mantain consistency
                    Cards[TargetID as number].sort((a,b)=>{

                        if(a.Position < b.Position)
                            return -1;
                        else{
                            
                            if(a.Position === b.Position)
                                return 0
                            else
                                return 1;
                        }
                    });
                    


                    break;
                }
          
            


        }


    }





function EffectParsingError(
    cardEffectType: CardEffect.Type,
    cardEffectTarget: CardEffectTarget
    )
    
    
    {
    console.error(`Couldn't handle Card effect, error during parsing 
                    ${CardEffect.Type
                        [cardEffectType]
                    }
                    as
                    ${CardEffectTarget
                        [cardEffectTarget]
                    }`);
                
                
    }
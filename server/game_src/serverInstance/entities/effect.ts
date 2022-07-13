

export namespace CardEffect{
    


   export enum Type

    
    {
        ValueIncrement,
        PercentualIncrement,
        ValueBased,
        CardDraw,
        EndGame,
        Spawn,
        Move,
        Effect
    }

}

export enum CardEffectTarget
{

    Gold,
    Resources,
    Population,
    Unit,
    Structure,
    Healable,
    Targetable,
    Destructible,
    None

}


export interface Effect{
    Type: CardEffect.Type;
    Value: number;
    Target: CardEffectTarget;
    
}

export interface EffectInfo extends Effect{
    Name: string;
    Description : string;
  };

  
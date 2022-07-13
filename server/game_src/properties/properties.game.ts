
export namespace InitializationValues {
  
  export const Absolute = 500;
  export const Gold = 250;
  export const Resources = 1500;
  
}

export interface Stats {
  Gold: number;
  Resources: number;
  Population: number;

}
  
  
export const MaxCardNumber = 60;



export enum GamePhases{
  Draw,
  Play,
  Move,
  Attack
  
}


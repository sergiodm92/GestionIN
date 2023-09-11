export interface Cementery{
    name: string
    place: string
    type: string
  }
  export interface CementeryState{
    cementery: Cementery[];
    isAllowedExpand: boolean 
  }
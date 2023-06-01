export interface Place{
    initials: string;
    name: string
  }
  export interface PlaceState{
    place: Place[];
    isAllowedExpand: boolean 
  }
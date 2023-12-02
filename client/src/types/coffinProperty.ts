export interface Property{
    initials: string;
    name: string
}
export interface CoffinPropertyState{
    types: Property[];
    sizes: Property[];
    colors: Property[];
    isAllowedExpand: boolean 
  }
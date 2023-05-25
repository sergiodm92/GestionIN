export interface Add {
    id: string;
    id_coffin: string;
    date: number;
    responsible: string;
    units: number;
    supplier: string;
    place: string;
  }

  export interface AddState {
    adds: Add[];
    add: Add;
    isAllowedExpand: boolean;
  }
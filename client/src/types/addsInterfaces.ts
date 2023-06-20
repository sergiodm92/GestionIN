export interface AddCoffin {
    id: string;
    id_coffin: string;
    date: number;
    responsible: string;
    units: number;
    supplier: string;
    place: string;
  }
  export interface AddMetalBox {
    id: string;
    id_doc: string;
    size: string;
    date: number;
    responsible: string;
    units: number;
    supplier: string;
    place: string;
  }
  export interface AddGeneral {
    id: string;
    id_doc: string;
    product: string;
    date: number;
    responsible: string;
    amount: number;
    supplier: string;
    place: string;
  }

  export interface AddCoffinState {
    addsCoffin: AddCoffin[];
    addCoffin: AddCoffin;
    isAllowedExpand: boolean;
  }

  export interface AddMetalBoxState {
    addsMetalBox: AddMetalBox[];
    addMetalBox: AddMetalBox;
    isAllowedExpand: boolean;
  }
  export interface AddGeneralState {
    addsGeneral: AddGeneral[];
    addGeneral: AddGeneral;
    isAllowedExpand: boolean;
  }

export interface Coffin {
  id: string;
  units: number;
  size: string;
  color: string;
  type: string;
  mbox: boolean;
  supplier: string;
}
export interface MetalBox {
  size: string;
  units: number;
  supplier: string;
}
export interface AddCoffin {
  id: string;
  date: number;
  responsible: string;
  place: string;
  coffins: Coffin[],
  metal_box: MetalBox[],
  state: string;
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
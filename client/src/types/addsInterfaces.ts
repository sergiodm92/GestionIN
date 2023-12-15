
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
  status: string;
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
export interface AddProducts {
  id: string;
  products: Products[];
  date: number;
  responsible: string;
  place: string;
  status: string;
}
export interface PostAddProducts {
  products: Products[];
  date: number;
  responsible: string;
  place: string;
  status: string;
}
export interface Product {
  id: string;
  name: string;
}
export interface Products {
  id: string;
  name: string;
  units: number;
}
export interface ProductsState {
  products: Products[];
  isAllowedExpand: boolean;
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
export interface AddProductsState {
  addsProducts: AddProducts[];
  addProducts: AddProducts;
  isAllowedExpand: boolean;
}
import { AddProducts, Products } from "./addsInterfaces";
import { Coffin } from "./interfaces";

export interface CoffinStock {
    id: string;
    place: string;
    type: string;
    size: string;
    color: string;
    metal_box: boolean;
  }
  export interface CoffinStockState {
    coffinStock: GetCoffinStock[];
    isAllowedExpand: boolean;
  }
  export interface Transfer {
    id_destiny: string;
    id_origin: string;
    units: number
  }
  export interface GetCoffinStock {
    supplier: string;
    type: string;
    mbox: boolean;
    size: string;
    id: string;
    units: number;
    color: string
  }
  export interface GetMetalBoxStock {
    id_add:string;
    size: string;
    place: string;
    units: number;
  }
  export interface GetProductsStock {
    products: AddProducts[];
    place: string;
  }
  

  export interface MetalBoxStock {
    id: string;
    place: string;
    size: string;
  }
  export interface MetalBoxStockState {
    metalBoxStock: GetMetalBoxStock[];
    isAllowedExpand: boolean;
  }
  export interface ProductsStockState {
    productsStock: Products[];
    isAllowedExpand: boolean;
  }
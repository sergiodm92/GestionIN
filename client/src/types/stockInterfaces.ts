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
    id_coffin: string;
    place: string;
    units: number;
    coffin: Coffin
  }

  export interface MetalBoxStock {
    id: string;
    place: string;
    size: string;
  }
  export interface MetalBoxStockState {
    stock: GetCoffinStock[];
    isAllowedExpand: boolean;
  }

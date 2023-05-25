import { Coffin } from "./interfaces";

export interface Stock {
    id: string;
    place: string;
    type: string;
    size: string;
    color: string;
    metal_box: boolean;
  }
  export interface StockState {
    stock: GetStock[];
    isAllowedExpand: boolean;
  }
  export interface Transfer {
    id_destiny: string;
    id_origin: string;
    units: number
  }
  export interface GetStock {
    id_coffin: string;
    place: string;
    units: number;
    coffin: Coffin
  }

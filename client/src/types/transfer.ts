import { Coffin } from "./interfaces";

export interface CoffinTransfer{
    date: number;
    add_id: string;
    coffin_group_id: string;
    place_origin: string;
    place_destiny: string;
    responsible: string;
    coffin: Coffin[];
}
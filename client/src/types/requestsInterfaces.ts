import { CoffinInitials, DateType } from "interfaces";
import { StockState } from "stockInterfaces";

export interface Request {
    id: string;
    id_deceased: string;
    date: number;
    place: string;
    funeral: string;
    id_coffin: string;
    holder_name: string;
    holder_relationship: string;
    policy: string;
    cetificate_number: number;
    way_to_pay: string;
    agreement: string;
    additional: string;
    wreath: boolean;
    present: string;
    cementery: string;
    burial_place: string;
    burial_time: string;
    cladding: string;
    service_improvement: string;
}
export interface RequestState {
  requests: Request[];
  isAllowedExpand: boolean;
}
export interface Deceased {
  id: string;
  id_request: string;
  name: string;
  dob: number;
  dod: number;
  pod: string;
  dni: string;
  leyend: string;
  news_paper: string;
  news_paper_name: string;
  tombstone: boolean;
}
export interface DeceasedState {
  deceaseds: Deceased[];
  isAllowedExpand: boolean;
}
export interface  FormDeceased {
  deceased: Deceased;
  setDeceased: any;
  date: DateType;
  setDate: any;
  birthDate: DateType;
  setBirthDate: any;
}
export interface  FormRequest {
  place: string;
  stock: StockState;
  request: Request;
  setRequest: any;
  currentDate: DateType;
  setCurrentDate: any;
  coffin: CoffinInitials;
  setCoffin: any;
}
export interface PostRequest{
  request: Request;
  deceased: Deceased
}
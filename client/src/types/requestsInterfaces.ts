import { CoffinInitials, DateType } from "../types/interfaces";
import { GetCoffinStock } from "../types/stockInterfaces";
import { Cementery } from "./cementery";
import { Place } from "./place";

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
    certificate_number: number;
    way_to_pay: string;
    agreement: string;
    additional: string;
    wreath: boolean;
    present: string;
    burial_place: string;
    burial_time: string;
    cladding: string;
    service_improvement: string;
}
export interface RequestState {
  requests: Request[];
  request: PostRequest;
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
  cementery: string;
  cementery_type: string;
  sector: string;
  parcel: string;
  level: number;
  first_level_name:string;
  second_level_name:string;
  religion_symbol: string;
}
export interface DeceasedState {
  deceaseds: Deceased[];
  deceased: Deceased;
  isAllowedExpand: boolean;
}
export interface  FormDeceased {
  deceased: Deceased;
  setDeceased: any;
  date: DateType;
  setDate: any;
  birthDate: string;
  setBirthDate: any;
  cementeries: Cementery[]
}
export interface  FormRequest {
  isOn: boolean;
  setIsOn: any;
  places: Place[];
  stock: GetCoffinStock[];
  request: Request;
  setRequest: any;
  currentDate: string;
  setCurrentDate: any;
  coffin: CoffinInitials;
  setCoffin: any;
}
export interface PostRequest{
  request: Request;
  deceased: Deceased
}
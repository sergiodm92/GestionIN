import { CoffinInitials, DateType } from "../types/interfaces";
import { GetCoffinStock } from "../types/stockInterfaces";
import { Products } from "./addsInterfaces";
import { Cementery } from "./cementery";
import { Place } from "./place";

export interface Request {
  id: string;
  id_deceased: string;
  date: number;
  place: string;
  funeral: string;
  id_add: string;
  id_coffin_group: string;
  id_add_metal_box: string;
  id_metal_box_group: string;
  holder_name: string;
  holder_relationship: string;
  policy: string;
  certificate_number: number;
  way_to_pay: string;
  agreement: string;
  additional: string;
  wreath: boolean;
  present: string;
  products: Products[];
  burial_place: string;
  burial_time: string;
  cladding: string;
  service_improvement: string;
}

export interface RequestService {
  id: string;
  id_deceased: string;
  date: number;
  place: string;
  funeral: string;
  id_add: string;
  id_coffin_group: string;
  id_add_metal_box: string;
  id_metal_box_group: string;
  additional: string;
  wreath: boolean;
  present: string;
  products: Products[];
  burial_place: string;
  burial_time: string;
  cladding: string;
  service_improvement: string;
  company: string;
}
export interface RequestState {
  requests: Request[];
  request: PostRequest;
  isAllowedExpand: boolean;
}
export interface ParticularRequestState {
  requests: RequestService[];
  request: PostParticularRequest;
  isAllowedExpand: boolean;
}
export interface Deceased {
  id: string;
  id_doc: string;
  id_request: string;
  name: string;
  dob: number;
  dod: number;
  pod: string;
  dni: string;
  leyend: string;
  news_paper: string;
  news_paper_name: string;
  tombstone: string;
  cementery: string;
  cementery_type: string;
  sector: string;
  parcel: string;
  level: number;
  first_level_name: string;
  second_level_name: string;
  religion_symbol: string;
}
export interface PostDeceased {
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
  tombstone: string;
  cementery: string;
  cementery_type: string;
  sector: string;
  parcel: string;
  level: number;
  first_level_name: string;
  second_level_name: string;
  religion_symbol: string;
}
export interface DeceasedState {
  deceaseds: Deceased[];
  deceased: Deceased;
  isAllowedExpand: boolean;
}
export interface FormDeceased {
  deceased: PostDeceased;
  setDeceased: any;
  date: DateType;
  setDate: any;
  birthDate: string;
  setBirthDate: any;
  cementeries: Cementery[];
  isCremation: boolean;
}
export interface FormRequest {
  isOn: boolean;
  setIsOn: any;
  places: Place[];
  request: Request;
  setRequest: any;
  currentDate: string;
  setCurrentDate: any;
  coffin: CoffinInitials;
  setCoffin: any;
}
export interface FormRequestService {
  isOn: boolean;
  setIsOn: any;
  places: Place[];
  request: RequestService;
  setRequest: any;
  currentDate: string;
  setCurrentDate: any;
  coffin: CoffinInitials;
  setCoffin: any;
}
export interface PostRequest {
  id_doc: string;
  request: Request;
  deceased: Deceased;
}
export interface PostParticularRequest {
  id_doc: string;
  request: RequestService;
  deceased: Deceased;
}
export interface PDFRequest {
  request: Request;
  deceased: PostDeceased;
  types: Place[];
  sizes: Place[];
  colors: Place[];
}
export interface PostNewRequest {
  request: Request;
  deceased: PostDeceased;
}
export interface PDFRequestService {
  request: RequestService;
  deceased: Deceased;
  types: Place[];
  sizes: Place[];
  colors: Place[];
  companies: Place[];
}
export interface PostRequestService {
  request: RequestService;
  deceased: PostDeceased;
}
export interface GetRequest {
  id: string;
  request: Request;
  deceased: Deceased;
}
export interface TombstoneStatus {
  doc_id: string;
  status: string;
}
export interface PutTombstoneStatus {
  data_put_status: TombstoneStatus[];
}

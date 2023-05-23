export interface DateType {
  day: string;
  month: string;
  year: string;
  time: string;
}
export interface Coffin {
  place: string;
  type: string;
  size: string;
  color: string;
  metal_box: boolean;
}
export interface CoffinInitials {
  place: Double;
  type: Double;
  size: Double;
  color: Double;
  metal_box: Double
}
export interface Double {
  name: string;
  initials: string
}
export interface Button {
  title: string;
}
export interface DobleButton {
  title1: string;
  title2: string;
  onClick1: any;
  onClick2: any;
}
export interface ButtonClick {
  title: string;
  onClick: any;
}
export interface Card1 {
  onClick: any;
  space1: string;
  space2: string;
  space3: number;
}

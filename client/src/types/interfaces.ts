export interface DateType {
  day: string;
  time: string;
}
export interface Coffin {
  id: string;
  supplier: string;
  units: number;
  type: string;
  size: string;
  color: string;
  mbox: boolean;
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
  title: any;
  loading: boolean;
  disabled: boolean;
}
export interface AddButton {
  title: any;
  loading: boolean;
  disabled: boolean;
  onClick: any;
}
export interface SmallButton {
  title: string;
  onClick: any
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
  space3: string;
}
export interface Card2 {
  onClick: any;
  space1: string;
  space2: string;
  space3: string;
  space4: number;
}
export interface SwitchButton{
  isOn: boolean;
  onClick: any
}
export interface DeleteButton{
  onClick: any
}

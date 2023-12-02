export interface Supplier{
    initials: string;
    name: string
}
export interface SupplierState{
    suppliers: Supplier[];
    isAllowedExpand: boolean 
  }
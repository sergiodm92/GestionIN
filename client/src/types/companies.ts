export interface Company{
    initials: string;
    name: string
}
export interface CompanyState{
    companies: Company[];
    isAllowedExpand: boolean 
  }
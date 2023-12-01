import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Company, CompanyState } from '../../types/companies';

const initialState: CompanyState = {
    companies: [],
    isAllowedExpand: true
}

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyData: (state, action: PayloadAction<Array<Company>>) => {
      state.companies = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  }
});

export const { setCompanyData, setIsAllowedExpand } = companySlice.actions;

export const getCompanies = (state: RootState) => state.companies.companies;
export const getIsAllowedExpand = (state: RootState) => state.companies.isAllowedExpand;

export default companySlice.reducer;
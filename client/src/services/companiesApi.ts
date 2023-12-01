import { AxiosResponse } from "axios";
import { apiClient } from "../utils/constants";
import { getAuthToken } from "./authService";
import { Company } from "../types/companies";

const token = getAuthToken()

// Post new company
export const postCompanyApi = async (
  data: Company
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.post("/companies", data, {
      headers: {
        "auth-token": token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// get all companies
export const getAllCompaniesApi = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get("/companies/all", {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
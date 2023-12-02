import { AxiosResponse } from "axios";
import { apiClient } from "../utils/constants";
import { getAuthToken } from "./authService";
import { Supplier } from "../types/suppliers";

const token = getAuthToken()

// Post new supplier
export const postSupplierApi = async (
  data: Supplier
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.post("/suppliers", data, {
      headers: {
        "auth-token": token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// get all suppliers
export const getAllSuppliersApi = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get("/suppliers/all", {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
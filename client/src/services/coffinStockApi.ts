import { AxiosResponse } from "axios";
import { apiClient } from "../utils/constants";
import { Transfer } from "../types/stockInterfaces";
import { getAuthToken } from "./authService";

const token = getAuthToken()

// get all coffin stock
export const getAllCoffinStockApi = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get("/coffins/all", {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get coffin stock by place
export const getCoffinStockByPlaceApi = async (
  place: string
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/stock/coffins/place/${place}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get coffin stock by coffin id
export const getCoffinStockByIdApi = async (id: string): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/coffin_stock/id/${id}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Post transfer coffin stock
export const postTransferCoffinStockApi = async (
  data: Transfer
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.post("/coffin_stock/transfer", data, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

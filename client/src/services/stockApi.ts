import { AxiosResponse } from "axios";
import { apiClient } from "../utils/constants";
import { Stock, Transfer } from "../types/stockInterfaces";
import { getAuthToken } from "./authService";

const token = getAuthToken()

// get all stock
export const getAllStockApi = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get("/stock/all", {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get stock by place
export const getStockByPlaceApi = async (
  place: string
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/stock/place/${place}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get stock by coffin id
export const getStockByIdApi = async (id: string): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/stock/id/${id}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Post stock
export const postStockApi = async (data: Stock): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.post("/stock", data, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Post transfer stock
export const postTransferStockApi = async (
  data: Transfer
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.post("/stock/transfer", data, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

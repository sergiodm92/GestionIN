import { AxiosResponse } from "axios";
import { apiClient } from "../utils/constants";
import { getAuthToken } from "./authService";

const token = getAuthToken()

// get all General stock
export const getAllGeneralStockApi = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get("/general_stock/all", {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get General stock by place
export const getGeneralStockByPlaceApi = async (
  place: string
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/general_stock/place/${place}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get General stock by General id
export const getGeneralStockByIdApi = async (id: string): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/general_stock/id/${id}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
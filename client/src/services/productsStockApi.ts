import { AxiosResponse } from "axios";
import { apiClient } from "../utils/constants";
import { getAuthToken } from "./authService";

const token = getAuthToken()

// get all Products stock
export const getAllProductsStockApi = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get("/stock/products/all", {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get Products stock by place
export const getProductsStockByPlaceApi = async (
  place: string
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/stock/products/place/${place}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

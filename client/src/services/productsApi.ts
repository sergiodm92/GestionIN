import { AxiosResponse } from "axios";
import { apiClient } from "../utils/constants";
import { getAuthToken } from "./authService";
import { Product, Products } from "../types/addsInterfaces";

const token = getAuthToken()

// Post place
export const postProductsApi = async (
  data: Product
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.post("/products", data, {
      headers: {
        "auth-token": token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// get all places
export const getAllProductsApi = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get("/products/all", {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
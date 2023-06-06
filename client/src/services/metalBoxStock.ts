import { AxiosResponse } from "axios";
import { apiClient } from "../utils/constants";
import { getAuthToken } from "./authService";

const token = getAuthToken()

// get all MetalBox stock
export const getAllMetalBoxStockApi = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get("/metal_box_stock/all", {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get MetalBox stock by place
export const getMetalBoxStockByPlaceApi = async (
  place: string
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/metal_box_stock/place/${place}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get MetalBox stock by MetalBox id
export const getMetalBoxStockByIdApi = async (id: string): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/metal_box_stock/id/${id}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
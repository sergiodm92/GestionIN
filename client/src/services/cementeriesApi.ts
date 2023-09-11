import { AxiosResponse } from "axios";
import { apiClient } from "../utils/constants";
import { getAuthToken } from "./authService";
import { Cementery } from "../types/cementery";

const token = getAuthToken()

// Post cementery
export const postCementeryApi = async (
  data: Cementery
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.post("/cementery", data, {
      headers: {
        "auth-token": token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// get all cementeries
export const getAllCementeriesApi = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get("/cementery/all", {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener cementerios por "type"
export const getCementeriesByTypeApi = async (type: string): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/cementery/by_type?type=${type}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener cementerios por "place"
export const getCementeriesByPlaceApi = async (place: string): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/cementery/by_place?place=${place}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
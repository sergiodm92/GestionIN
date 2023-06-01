import { AxiosResponse } from "axios";
import { apiClient } from "../utils/constants";
import { getAuthToken } from "./authService";
import { Place } from "../types/place";

const token = getAuthToken()

// Post place
export const postPlaceApi = async (
  data: Place
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.post("/place", data, {
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
export const getAllPlacesApi = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get("/place/all", {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
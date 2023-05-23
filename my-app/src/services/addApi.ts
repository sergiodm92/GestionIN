import { AxiosResponse } from "axios";
import { apiClient } from "../utils/constants";
import { Add } from "../types/addsInterfaces";
import { getAuthToken } from "./authService";

const token = getAuthToken()

// Post Add
export const postAddApi = async (data: Add): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.post("/add", data, {
      headers: {
        "auth-token": token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// get all adds
export const getAllAddsApi = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get("/add/all", {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get limit adds
export const getLimitAddsApi = async (
  limit: string
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/add/limit/${limit}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// get add by id
export const getAddsByIdApi = async (id: string): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/add/id/${id}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// get add by place
export const getAddsByPlaceApi = async (
  place: string
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/add/place/${place}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete add
export const deleteAddApi = async (id: string): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.delete(`/add/${id}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

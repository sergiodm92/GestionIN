import { AxiosResponse } from "axios";
import { apiClient } from "../utils/constants";
import { AddMetalBox } from "../types/addsInterfaces";
import { getAuthToken } from "./authService";

const token = getAuthToken()

// Post Add
export const postAddMetalBoxApi = async (data: AddMetalBox): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.post("/add_metal_box", data, {
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
export const getAllAddsMetalBoxApi = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get("/add_metal_box/all", {
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
export const getLimitAddsMetalBoxApi = async (
  limit: string
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/add_metal_box/limit/${limit}`, {
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
export const getAddMetalBoxByIdApi = async (id: string): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/add_metal_box/id/${id}`, {
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
export const getAddsMetalBoxByPlaceApi = async (
  place: string
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/add_metal_box/place/${place}`, {
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
export const deleteAddMetalBoxApi = async (id: string): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.delete(`/add_metal_box/${id}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
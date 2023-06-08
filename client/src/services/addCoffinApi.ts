import { AxiosResponse } from "axios";
import { apiClient } from "../utils/constants";
import { AddCoffin } from "../types/addsInterfaces";
import { getAuthToken } from "./authService";

const token = getAuthToken()

// Post Add
export const postAddCoffinApi = async (data: AddCoffin): Promise<AxiosResponse> => {
  try {
      const response = await apiClient.post("/add_coffin", data, {
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
export const getAllAddsCoffinApi = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get("/add_coffin/all", {
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
export const getLimitAddsCoffinApi = async (
  limit: string
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/add_coffin/limit/${limit}`, {
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
export const getAddCoffinByIdApi = async (id: string): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/add_coffin/id/${id}`, {
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
export const getAddsCoffinByPlaceApi = async (
  place: string
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/add_coffin/place/${place}`, {
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
export const deleteAddCoffinApi = async (id: string): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.delete(`/add_coffin/${id}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

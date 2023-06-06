import { AxiosResponse } from "axios";
import { apiClient } from "../utils/constants";
import { AddGeneral } from "../types/addsInterfaces";
import { getAuthToken } from "./authService";

const token = getAuthToken()

// Post Add
export const postAddGeneralApi = async (data: AddGeneral): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.post("/add_general", data, {
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
export const getAllAddsGeneralApi = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get("/add_general/all", {
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
export const getLimitAddsGeneralApi = async (
  limit: string
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/add_general/limit/${limit}`, {
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
export const getAddGeneralByIdApi = async (id: string): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/add_general/id/${id}`, {
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
export const getAddsGeneralByPlaceApi = async (
  place: string
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/add_general/place/${place}`, {
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
export const deleteAddGeneralApi = async (id: string): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.delete(`/add_general/${id}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

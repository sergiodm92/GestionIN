import { AxiosResponse } from "axios";
import { apiClient } from "../utils/constants";
import { AddProducts, PostAddProducts } from "../types/addsInterfaces";
import { getAuthToken } from "./authService";

const token = getAuthToken()

// Post Add
export const postAddProductsApi = async (data: PostAddProducts): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.post("/add_products", data, {
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
export const getAllAddsProductsApi = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get("/add_products/all", {
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
export const getLimitAddsProductsApi = async (
  limit: string
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/add_products/limit/${limit}`, {
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
export const getAddProductsByIdApi = async (id: string): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/add_products/id/${id}`, {
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
export const getAddsProductsByPlaceApi = async (
  place: string
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/add_products/place/${place}`, {
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
export const deleteAddProductsApi = async (id: string, id_doc: string): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.delete("/add_products/", {
      headers: {
        "auth-token": token,
      },
      data: {
        id: id,
        id_doc: id_doc
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};
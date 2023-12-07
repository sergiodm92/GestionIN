import { AxiosResponse } from "axios";
import { apiClient } from "../utils/constants";
import { PDFRequest, PDFRequestService } from "../types/requestsInterfaces";
import { getAuthToken } from "./authService";

const token = getAuthToken()

// Post request
export const postRequestApi = async (
  data: PDFRequest
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.post("/request", data, {
      headers: {
        "auth-token": token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Post request
export const postRequestServiceApi = async (
  data: PDFRequestService
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.post("/particular_request", data, {
      headers: {
        "auth-token": token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// get all requests
export const getAllRequestsApi = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get("/request/all", {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get all servicesRequests
export const getAllParticularRequestsApi = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get("/particular_request/all", {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get limit requests
export const getLimitRequestsApi = async (
  limit: string
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/request/limit/${limit}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get requests by id
export const getRequestsByIdApi = async (
  id: string
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/request/id/${id}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get particular requests by id
export const getParticularRequestsByIdApi = async (
  id: string
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/particular_request/id/${id}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get requests by id
export const getRequestsByPlaceApi = async (
  place: string
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/request/place/${place}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// delete request
export const deleteRequestApi = async (id: string): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.delete(`/request/${id}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

import { AxiosResponse } from "axios";
import { apiClient } from "../utils/constants";
import { getAuthToken } from "./authService";

const token = getAuthToken()

// get all deceaseds
export const getAllDeceasedApi = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get("/deceased/all", {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get deceased by name
export const getDeceasedByNameApi = async (
  name: string
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/deceased/name/${name}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get all deceaseds without tombstone
export const getDeceasedWithoutTombstoneApi =
  async (): Promise<AxiosResponse> => {
    try {
      const response = await apiClient.get("/deceased/without_tombstone", {
        headers: {
          "auth-token": token,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

// put deceased tombstone true
export const putDeceasedTombstoneApi = async (id: string): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.put(`/deceased/tombstone/${id}`, {}, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// get deceased by id
export const getDeceasedByIdApi = async (
  id: string
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/deceased/id/${id}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get deceased by id
export const getDeceasedByRequestIdApi = async (
  id: string
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/deceased/id_request/${id}`, {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

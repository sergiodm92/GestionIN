import { AxiosResponse } from "axios";
import { apiClient } from "../utils/constants";
import { getAuthToken } from "./authService";
import { Property } from "../types/coffinProperty";

const token = getAuthToken()

//------------TYPES----------------
// Post new type
export const postTypeApi = async (
  data: Property
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.post("/coffin_options/types", data, {
      headers: {
        "auth-token": token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
// get all types
export const getAllTypesApi = async (): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get("/coffin_options/types/all", {
      headers: {
        "auth-token": token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//------------SIZES----------------
// Post new size
export const postSizeApi = async (
    data: Property
  ): Promise<AxiosResponse> => {
    try {
      const response = await apiClient.post("/coffin_options/sizes", data, {
        headers: {
          "auth-token": token,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  // get all sizes
  export const getAllSizesApi = async (): Promise<AxiosResponse> => {
    try {
      const response = await apiClient.get("/coffin_options/sizes/all", {
        headers: {
          "auth-token": token,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  //------------COLORS----------------
// Post new color
export const postColorApi = async (
    data: Property
  ): Promise<AxiosResponse> => {
    try {
      const response = await apiClient.post("/coffin_options/colors", data, {
        headers: {
          "auth-token": token,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  // get all colors
  export const getAllColorsApi = async (): Promise<AxiosResponse> => {
    try {
      const response = await apiClient.get("/coffin_options/colors/all", {
        headers: {
          "auth-token": token,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
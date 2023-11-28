import { AxiosResponse } from "axios";
import { apiClient } from "../utils/constants";
import { getAuthToken } from "./authService";
import { PutTombstoneStatus } from "../types/requestsInterfaces";

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
// export const getDeceasedByNameApi = async (
//   name: string
// ): Promise<AxiosResponse> => {
//   try {
//     const response = await apiClient.get(`/deceased/name/${name}`, {
//       headers: {
//         "auth-token": token,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// get all deceaseds without tombstone
// export const getDeceasedWithoutTombstoneApi =
//   async (): Promise<AxiosResponse> => {
//     try {
//       const response = await apiClient.get("/deceased/without_tombstone", {
//         headers: {
//           "auth-token": token,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };

// put deceased tombstone true
export const putDeceasedTombstoneApi = async (json: PutTombstoneStatus): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.put(`/deceased/tombstone`, json, {
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
  id_doc: string
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get(`/deceased/id_doc/${id_doc}`, {
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
// export const getDeceasedByRequestIdApi = async (
//   id: string
// ): Promise<AxiosResponse> => {
//   try {
//     const response = await apiClient.get(`/deceased/id_request/${id}`, {
//       headers: {
//         "auth-token": token,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

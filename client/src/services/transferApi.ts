import { AxiosResponse } from "axios";
import { apiClient } from "../utils/constants";
import { getAuthToken } from "./authService";
import { CoffinTransfer } from "../types/transfer";

const token = getAuthToken()

// Post place
export const postCoffinTransferApi = async (
  data: CoffinTransfer
): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.post("/transfer/coffin", data, {
      headers: {
        "auth-token": token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
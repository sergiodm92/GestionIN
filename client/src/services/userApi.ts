import { AxiosResponse } from "axios";
import { apiClient } from "../utils/constants";
import { LoginUser, User } from "../types/userInterfaces";

// Post New User
export const postNewUserApi = async (data: User): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.post("/user/register", data);
    return response;
  } catch (error) {
    throw error;
  }
};

// User Login
export const LoginUserApi = async (data: LoginUser): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.post("/user/login", data);
    return response;
  } catch (error) {
    throw error;
  }
};

// export const token: string = localStorage.getItem("authToken") as string

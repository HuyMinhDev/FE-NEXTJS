import { User, LoginInput, LoginResponse } from "@/interfaces/users";
import fetcher from "./fetcher";
import axios from "axios";
// Đăng nhập
export const loginAuthApi = async (
  data: LoginInput
): Promise<LoginResponse> => {
  try {
    const response = await fetcher.post<LoginResponse>("/auth/login", {
      email: data.email,
      password: data.password,
    });
    console.log("Check user login: ", response);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Login failed:", error.response?.data ?? error.message);
      throw error;
    }

    if (error instanceof Error) {
      console.error("Login failed:", error.message);
      throw error;
    }

    throw new Error("Unknown error occurred during login");
  }
};

// Đăng ký
export const registerAuthApi = async (
  formData: Partial<User>
): Promise<{ message: string; user: User }> => {
  try {
    const response = await fetcher.post("/auth/register", formData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Register failed:", error.message);
    }

    if (axios.isAxiosError(error)) {
      console.error("Register failed:", error.response?.data ?? error.message);
      throw error;
    }

    throw new Error("Unknown error occurred during register");
  }
};

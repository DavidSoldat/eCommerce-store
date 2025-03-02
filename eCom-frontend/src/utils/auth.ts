import axios from "axios";
import toast from "react-hot-toast";
import { UserInfo } from "./Models";

const api = axios.create({
  baseURL: "http://localhost:8080/api/auth",
  withCredentials: true,
});

export const loginUser = async (email: string, password: string) => {
  try {
    const loginResponse = await api.post("/login", {
      email,
      password,
    });

    if (loginResponse.status >= 200 && loginResponse.status < 300) {
      return await getUserInfo();
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data || error.message);
      console.error(
        "Error during login: ",
        error.response?.data || error.message,
      );
    } else {
      console.error("Error during loign", error);
      toast.error("Error during loign");
    }
  }
};

export const registerUser = async (
  email: string,
  password: string,
  confirmPassword: string,
) => {
  try {
    const response = await api.post("/register", {
      email,
      password,
      confirmPassword,
    });

    if (response.status >= 200 && response.status < 300) {
      return await getUserInfo();
    } else {
      throw new Error(response.data || "Registration failed");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data || error.message);
      console.error(
        "Error during registration: ",
        error.response?.data || error.message,
      );
    } else {
      console.error("Error during registration", error);
      toast.error("Error during registration");
    }
  }
};

export const getUserInfo = async () => {
  try {
    const response = await api.get("http://localhost:8080/api/auth/me", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data || error.message);
      console.error(
        "Error during fetching data: ",
        error.response?.data || error.message,
      );
    } else {
      console.error("Error during fetching data", error);
      toast.error("Error during fetching data");
    }
  }
};

export const getUsers = async () => {
  return await api.get("/users", { withCredentials: true });
};

export const deleteUser = async (users: number[]) => {
  try {
    const response = await api.delete(`/users/delete/${users}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const editUser = async (userData: UserInfo) => {
  const userId = userData.id;
  try {
    console.log("User: ", userData);
    const response = await api.patch(`/users/${userId}`, userData);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export function loginGoogle() {
  window.location.href =
    "http://localhost:8080/api/auth/oauth2/authorization/google";
}

export async function logoutUser() {
  try {
    const response = await api.post("/logout");
    return response;
  } catch (error) {
    console.error(error);
  }
}

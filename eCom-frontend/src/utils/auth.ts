import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:8080/api/auth",
  withCredentials: true,
});

export const login = async (email: string, password: string) => {
  try {
    await api.post("/login", {
      email,
      password,
    });

    console.log("Login successful");
    return getUserInfo();
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

export const getUserInfo = async () => {
  try {
    const response = await api.get("http://localhost:8080/api/auth/me");
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

export const deleteUser = async (userId: number) => {
  try {
    const response = await api.delete(`/delete/${userId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export function loginGoogle() {
  window.location.href =
    "http://localhost:8080/api/auth/oauth2/authorization/google";
}

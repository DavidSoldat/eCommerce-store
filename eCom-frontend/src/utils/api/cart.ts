/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { AddToCartDto, RemoveFromCartDto } from "../DTO";

const api = axios.create({
  baseURL: "http://localhost:8080/api/",
  withCredentials: true,
});

export async function addToCart(data: AddToCartDto) {
  try {
    const response = await api.post("/cart/add", data);
    return response;
  } catch (error: any) {
    console.error("Status:", error.response?.status);
    console.error("Status:", error.response?.data);
    console.error("Status:", error.response);
  }
}

export async function getUserCart() {
  try {
    const result = await api.get("/cart/view");
    return result.data.cartItems;
  } catch (error: any) {
    console.error("Status:", error.response?.status);
    console.error("Status:", error.response?.data);
    console.error("Status:", error.response);
  }
}

export async function removeItemFromCart(deleteData: RemoveFromCartDto) {
  try {
    const response = await api.delete("/cart/remove", { data: deleteData });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function clearCartItems() {
  try {
    const response = await api.delete("/cart/clear", { withCredentials: true });
    return response;
  } catch (error) {
    console.error(error);
  }
}

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/",
  withCredentials: true,
});

export async function deleteProducts(ids: number[]) {
  console.log(ids);
}

export async function getProducts() {
  const response = await api.get("/products");
  return response.data;
}

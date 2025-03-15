import axios from "axios";
import { EditProductDto } from "./Models";

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

export async function editProduct(id: number, product: EditProductDto) {
  console.log("edit product ", product, " with id ", id);
  const response = await api.patch("/product", product);
  return response.data;
}

export async function getBrands() {
  const response = await api.get("/brands");
  return response.data;
}

export async function deleteBrands(ids: number[]) {
  console.log(ids);
}

export async function addBrand({ brandName }: { brandName: string }) {
  const response = await api.get("/brands");
  console.log(brandName);
  return response.data;
}

export async function getCategories() {
  const response = await api.get("/categories");
  return response.data;
}

import axios from "axios";
import { Brand } from "../types";
import { EditProductDto, ProductDetailsDto } from "../DTO";

const api = axios.create({
  baseURL: "http://localhost:8080/api/",
  withCredentials: true,
});

export async function deleteProducts(ids: number[]) {
  console.log(ids);
}

export async function getProductDetails(productId: number) {
  const response = await api.get(`/products/${productId}`);
  return response.data;
}

export async function addProduct(product: ProductDetailsDto) {
  const response = await api.get("/products", { data: product });
  return response.data;
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

export async function addBrand({ name }: { name: string }) {
  const response = await api.post("/brands/add", { name });
  console.log("adding brand " + name);
  return response.data;
}

export async function editBrand(brand: Brand) {
  const response = await api.patch("/brands/edit", brand);
  console.log("editing brand: " + brand.name);
  return response.data;
}

export async function getCategories() {
  const response = await api.get("/categories");
  return response.data;
}

export async function getColorsAndSizes() {
  const response = await api.get("/products/colorsAndSizes");
  return response.data;
}

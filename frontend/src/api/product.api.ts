import api from "../utils/axios";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export const getAllProducts = async (): Promise<Product[]> => {
  const { data } = await api.get("/products");
  return data.products;
};

export const getProductById = async (id: string): Promise<Product> => {
  const { data } = await api.get(`/products/${id}`);
  return data.product;
};

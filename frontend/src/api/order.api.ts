import api from "../utils/axios";

export interface Order {
  _id: string;
  items: any[];
  status: "success" | "failed" | "pending";
  amount: number;
  createdAt: string;
}

export const getMyOrders = async (): Promise<Order[]> => {
  const { data } = await api.get("/orders/my");
  return data.orders;
};

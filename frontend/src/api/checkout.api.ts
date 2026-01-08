import api from "../utils/axios";

export const createCheckoutSession = async (payload: {
  items: {
    productId: string;
    quantity: number;
  }[];
  email: string;
}) => {
  const { data } = await api.post("/checkout", payload);
  return data; // sessionUrl or sessionId
};

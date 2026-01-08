import api from "../utils/axios";
import type { LoginPayload, RegisterPayload } from "../types/auth.types";

export const loginUser = (payload: LoginPayload) =>
  api.post("/auth/login", payload);

export const registerUser = (payload: RegisterPayload) =>
  api.post("/auth/register", payload);

export const logoutUser = () => api.post("/auth/logout");

export const getCurrentUser = async () => {
  const { data } = await api.get("/user/me");
  return data;
};

import { api, apiWithNoAuth } from "../apiClient";

export const register = (body) => apiWithNoAuth.post("/api/auth/users/", body);

export const login = (body) =>
  apiWithNoAuth.post("/api/auth/token/login", body);

export const logout = (token) => api(token).post("/api/auth/token/logout/");

export const forgotPassword = (email) =>
  api.post("/account/forgot-password", { email });

export const changePassword = () => null;

export const resetPassword = (body) =>
  api.post("/account/reset-password", body);

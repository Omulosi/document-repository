import { api, apiWithNoAuth } from "../apiClient";

export const register = (body) => apiWithNoAuth.post("/auth/users/", body);

export const login = (body) => apiWithNoAuth.post("/auth/token/login", body);

export const logout = (token) => api(token).post("/auth/token/logout/");

export const forgotPassword = (email) =>
  api.post("/account/forgot-password", { email });

export const changePassword = () => null;

export const resetPassword = (body) =>
  api.post("/account/reset-password", body);

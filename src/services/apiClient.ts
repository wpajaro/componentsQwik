// src/services/apiClient.ts
import { refreshTokenService } from "./auth/handleLogin";

const API_BASE_URL = "https://secondly-sound-bear.ngrok-free.app";

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const accessToken = localStorage.getItem("accessToken");

  const headers = {
    "Content-Type": "application/json",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...options.headers,
  };

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      mode: "cors",
    });
  } catch (error) {
    console.error("Network error:", error);
    throw new Error("Error de conexión con el servidor");
  }

  // Token expirado
  if (response.status === 401) {
    const refreshed = await refreshTokenService();
    if (refreshed) {
      const newAccessToken = localStorage.getItem("accessToken");
      headers.Authorization = `Bearer ${newAccessToken}`;
      return await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
        mode: "cors",
      });
    } else {
      window.location.href = "/login";
      throw new Error("Sesión expirada");
    }
  }

  return response;
};
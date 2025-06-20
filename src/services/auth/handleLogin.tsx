import type { LoginResult } from "./autht";
import { jwtDecode } from "jwt-decode";
import { clearCacheModulos, setCachedModulos } from "@/context/contextModule";
import { apiClient } from "../apiClient";

/** Interfaces */
export interface DecodedUser {
  username: string;
  name: string;
}

export interface JwtPayload {
  user_id: number;
  exp: number;
  iat: number;
  jti?: string;
  token_type?: string;
  user: string | DecodedUser;
  [key: string]: any;
}

/** Auth: Login */
export const loginServices = async (
  username: string,
  password: string
): Promise<LoginResult> => {
  try {
    const response = await fetch("http://localhost:8000/api/auth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: null, data: { username, password } }),
      mode: "cors",
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || result.detail || "Error en la autenticación",
      };
    }

    const accessToken = result.data.access;
    const refreshToken = result.data.refresh;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    try {
      const res = await apiClient.get("/api/modules/user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      localStorage.setItem("modulosUsuario", JSON.stringify(res.data));
      // o si prefieres: setCachedModulos(res.data);
    } catch (err) {
      console.error("No se cargaron los módulos", err);
    }

    return {
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
      message: result.message || "Login exitoso",
    };
  } catch (error) {
    console.error("Error en login:", error);
    return {
      success: false,
      message: "Error de conexión con el servidor",
    };
  }
};

/** Auth: Refresh token */
export const refreshTokenService = async (): Promise<boolean> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return false;

  try {
    const response = await fetch("https://secondly-sound-bear.ngrok-free.app/api/auth/refresh-token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: null, data: { refresh: refreshToken } }),
      mode: "cors",
    });

    const result = await response.json();

    if (response.ok && result.data?.access) {
      localStorage.setItem("accessToken", result.data.access);
      if (result.data.refresh) {
        localStorage.setItem("refreshToken", result.data.refresh);
      }
      return true;
    }

    console.error("Error al refrescar token:", result.message || result.detail);
    return false;
  } catch (error) {
    console.error("Error de red al refrescar token:", error);
    return false;
  }
};

/** Cerrar sesión */
export const logout = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  clearCacheModulos();
  window.location.href = "/login";
};

/** Verifica autenticación */
export const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  if (!token) return false;

  const decoded = getUserFromToken();
  return decoded ? !isTokenExpired(decoded.exp) : false;
};

/** Obtener token de acceso */
export const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
};

/** Verifica si el token ha expirado */
export const isTokenExpired = (exp: number): boolean => {
  const currentTime = Math.floor(Date.now() / 1000);
  return exp < currentTime;
};

/** Obtener y decodificar usuario del token */
export const getUserFromToken = (): JwtPayload | null => {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    // Parsear 'user' si viene como string
    if (typeof decoded.user === "string") {
      const parsed = JSON.parse(decoded.user.replace(/'/g, '"'));
      if (parsed && typeof parsed === "object") {
        decoded.user = parsed;
      } else {
        return null;
      }
    }

    return decoded;
  } catch (err) {
    console.error("Error al decodificar token:", err);
    return null;
  }
};

/** Obtener nombre del usuario directamente */
export const getUserName = (): string | null => {
  const user = getUserFromToken();
  return typeof user?.user === 'object' ? user.user.name : null;
};

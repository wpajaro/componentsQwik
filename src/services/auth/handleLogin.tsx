// src/services/auth/handleLogin.tsx
import type { LoginResult } from "./autht";

/**
 * Servicio para realizar el login de usuarios
 * @param username Nombre de usuario o identificación
 * @param password Contraseña del usuario
 * @returns Promise<LoginResult> - Resultado del login
 */
export const loginServices = async (
  username: string,
  password: string
): Promise<LoginResult> => {
  try {
    const response = await fetch(
      "https://secondly-sound-bear.ngrok-free.app/api/auth/token/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: null,
          data: { username, password },
        }),
        mode: "cors",
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || errorData.detail || "Error en la autenticación",
      };
    }

    const result = await response.json();

    // Guardar tokens en localStorage
    localStorage.setItem("accessToken", result.data.access);
    localStorage.setItem("refreshToken", result.data.refresh);

    return {
      success: true,
      data: {
        accessToken: result.data.access,
        refreshToken: result.data.refresh,
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

/**
 * Servicio para refrescar el token de acceso
 * @returns Promise<boolean> - Indica si el refresh fue exitoso
 */
export const refreshTokenService = async (): Promise<boolean> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    console.error("No se encontró refresh token");
    return false;
  }

  try {
    const response = await fetch(
      "https://secondly-sound-bear.ngrok-free.app/api/auth/refresh-token/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: null,
          data: { refresh: refreshToken },
        }),
        mode: "cors",
      }
    );

    const result = await response.json();

    if (response.ok && result.data?.access) {
      // Actualizar tokens en localStorage
      localStorage.setItem("accessToken", result.data.access);
      
      // Si el backend devuelve un nuevo refresh token, actualizarlo
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

/**
 * Función para cerrar sesión
 * Elimina los tokens y redirige al login
 */
export const logout = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  // Redirigir a la página de login
  window.location.href = "/login";
};

/**
 * Verifica si hay un usuario autenticado
 * @returns boolean - True si hay un token de acceso válido
 */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("accessToken");
};

/**
 * Obtiene el token de acceso actual
 * @returns string | null - Token de acceso o null si no existe
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};
import { getAccessToken, refreshTokenService } from './auth/handleLogin';

const baseUrl = 'http://localhost:8000';

const request = async (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  body?: any,
  options: RequestInit = {}
): Promise<any> => {
  let token = getAccessToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    ...options,
  };

  let response = await fetch(`${baseUrl}${endpoint}`, config);

  // Si el token expiró, intenta refrescar
  if (response.status === 401) {
    const refreshed = await refreshTokenService();
    if (refreshed) {
      token = getAccessToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        response = await fetch(`${baseUrl}${endpoint}`, config);
      }
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.detail || 'Error en la solicitud');
  }

  return await response.json();
};

export const apiClient = {
  get: (endpoint: string, options?: RequestInit) =>
    request('GET', endpoint, undefined, options),

  post: (endpoint: string, body: any, options?: RequestInit) =>
    request('POST', endpoint, body, options),

  put: (endpoint: string, body: any, options?: RequestInit) =>
    request('PUT', endpoint, body, options),

  delete: (endpoint: string, options?: RequestInit) =>
    request('DELETE', endpoint, undefined, options),
};

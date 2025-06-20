import { apiClient } from "../apiClient";

export interface Modulo {
  id: number;
  nombre: string;
  descripcion?: string;
}

export const getModules = async (): Promise<Modulo[]> => {
  const res = await apiClient.get("/api/modulos/");
  return res.data;
};

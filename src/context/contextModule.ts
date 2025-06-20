import { type Modulo } from '@/types/Modulo'

//let cachedModulos: Modulo[] = [];

export const setCachedModulos = (modulos: Modulo[]) => {
  localStorage.setItem('modulosUsuario', JSON.stringify(modulos))
};

export function getCachedModulos(): Modulo[] | null {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const raw = localStorage.getItem('modulos');
    return raw ? JSON.parse(raw) : null;
  }
  return null;
};

export const clearCacheModulos = () => {
    localStorage.removeItem('modulosUsuarios');
}
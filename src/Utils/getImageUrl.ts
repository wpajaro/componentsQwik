export const getFullImageUrl = (path: string) =>
  path.startsWith('http') ? path : `http://localhost:8000${path}`;
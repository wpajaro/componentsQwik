export interface OpcionModulo {
  id: number;
  name: string;
  url: string;
}

export interface Modulo {
  id: number;
  name: string;
  description?: string;
  image: string;
  option: {
    id: number;
    name: string;
    url: string;
  }[];
}

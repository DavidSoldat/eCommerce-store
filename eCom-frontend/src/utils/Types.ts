export type Color = {
  id: number;
  color: string;
};

export enum logReg {
  "login",
  "register",
}
export type FormErrors = {
  [key: string]: string;
};

export interface RegisterResponse {
  data: string;
  status: number;
}

export interface User {
  name: string;
  email: string;
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

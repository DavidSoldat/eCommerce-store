import { JwtPayload } from "jwt-decode";

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

export interface UserInStorage {
  name: string;
  email: string;
}

export interface UserContextType {
  user: UserInStorage | null;
  setUser: (user: UserInStorage | null) => void;
}
export type Role = {
  authority: string;
};

export interface CustomJwtPayload extends JwtPayload {
  roles: Role[];
}

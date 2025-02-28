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

export interface Token {
  token: string | null;
}

export interface CustomJwtPayload extends JwtPayload {
  roles: string[];
}
export interface CountUpProps {
  target: number;
  duration?: number;
  start?: number;
}



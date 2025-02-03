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

export interface UserRedux {
  name: string;
  email: string;
}

export interface UserState {
  user: UserRedux | null;
}

export type Role = {
  authority: string;
};

export interface CustomJwtPayload extends JwtPayload {
  roles: Role[];
}
export interface CountUpProps {
  target: number;
  duration?: number;
  start?: number;
}

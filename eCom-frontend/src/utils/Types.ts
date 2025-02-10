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
  role: string;
}

export interface UserState {
  user: UserRedux | null;
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

export interface RolesRep {
  id: number;
  name: string;
}

export interface UserRep {
  id: number;
  email: string;
  username: string;
  roles: RolesRep[];
}

export interface FlattenedUserRep {
  id: number;
  email: string;
  username: string;
  roles: string;
}

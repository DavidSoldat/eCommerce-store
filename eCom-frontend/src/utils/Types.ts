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

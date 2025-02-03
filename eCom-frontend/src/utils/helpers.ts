import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "./Types";

export function discount(price: number, discountPercentage: number) {
  const discountAmount = (price * discountPercentage) / 100;
  return price - discountAmount;
}

export function formatNumber(num: number) {
  return num.toLocaleString();
}

export function isUserAdmin(token: string) {
  if (!token) return null;
  try {
    const decodedToken: CustomJwtPayload = jwtDecode(token);
    const roles = decodedToken.roles?.map((role) => role.authority);
    return roles ? roles.includes("ADMIN") : false;
  } catch (error) {
    console.log("Invalid token", error);
    return null;
  }
}

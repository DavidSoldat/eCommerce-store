import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload, FlattenedUserRep, UserRep } from "./Types";

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
    const roles = decodedToken.roles?.map((role) => role);
    return roles ? roles.includes("ROLE_ADMIN") : false;
  } catch (error) {
    console.log("Invalid token", error);
    return null;
  }
}
export function flattenUser(user: UserRep): FlattenedUserRep {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    roles: user.roles[0].name,
  };
}

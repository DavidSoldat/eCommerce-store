import { FlattenedUserRep, UserRep } from "./Types";

export function discount(price: number, discountPercentage: number) {
  const discountAmount = (price * discountPercentage) / 100;
  return price - discountAmount;
}

export function formatNumber(num: number) {
  return num.toLocaleString();
}


export function flattenUser(user: UserRep): FlattenedUserRep {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    roles: user.roles[0].name,
  };
}

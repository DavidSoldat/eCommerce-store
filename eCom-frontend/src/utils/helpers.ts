export function discount(price: number, discountPercentage: number) {
  const discountAmount = (price * discountPercentage) / 100;
  return price - discountAmount;
}

export function formatNumber(num: number) {
  return num.toLocaleString();
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

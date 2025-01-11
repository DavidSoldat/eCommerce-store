export function discount(price: number, discountPercentage: number) {
  const discountAmount = (price * discountPercentage) / 100;
  return price - discountAmount;
}

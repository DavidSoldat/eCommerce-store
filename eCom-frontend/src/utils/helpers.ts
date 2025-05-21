export function calculateDiscount(price: number, discountPercentage: number) {
  const discountAmount = (price * discountPercentage) / 100;
  return Math.round((price - discountAmount) * 100) / 100;
}

export function formatNumber(num: number) {
  return num.toLocaleString();
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function groupBrandsByLetter(brands: { id: number; name: string }[]) {
  return brands.reduce<Record<string, { id: number; name: string }[]>>(
    (acc, brand) => {
      const firstLetter = brand.name[0].toUpperCase();
      if (!acc[firstLetter]) acc[firstLetter] = [];
      acc[firstLetter].push(brand);
      return acc;
    },
    {},
  );
}

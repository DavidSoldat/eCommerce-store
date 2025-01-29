export interface UserEntity {
  id?: number;
  username: string;
  email: string;
  password: string;
}

export interface Product {
  id?: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productDiscount: number;
  productRating: number;
  productColors: string[];
  productSizes: string[];
  productImages: string[] | [];
  productQuantity?: number;
}

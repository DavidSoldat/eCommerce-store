export interface UserEntity {
  id?: number;
  username: string;
  email: string;
  password: string;
  role: string;
  reviews: Review[] | [];
}

export interface UserInfo {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface Product {
  id: number;
  productName: string;
  productPrice: number;
  productCategory: string;
  productDescription: string;
  productRating: number;
  genderCategory: string;
  productDiscount: number;
  productQuantity: number;
  productSizes: string[];
  productColors: string[];
  productImages: string[];
  reviews: Review[];
}

export interface Review {
  id?: number;
  reviewAuthor: UserEntity;
  reviewText: string;
  reviewRating: number;
  product: Product;
}

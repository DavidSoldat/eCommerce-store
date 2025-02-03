export interface UserEntity {
  id?: number;
  username: string;
  email: string;
  password: string;
  roles: string;
  reviews: Review[] | [];
}

export interface Product {
  id?: number;
  productName: string;
  productDescription: string;
  productCategory: string;
  productPrice: number;
  productDiscount: number;
  productRating: number;
  productColors: string[];
  productSizes: string[];
  productImages: string[] | [];
  productQuantity?: number;
  reviews: Review[] | [];
}

export interface Review {
  id?: number;
  reviewAuthor: UserEntity;
  reviewText: string;
  reviewRating: number;
  product: Product;
}

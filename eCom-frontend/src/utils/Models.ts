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

export interface ProductDetailsDto {
  productId: number;
  productName: string;
  productPrice: number;
  productDescription: string;
  productRating: number;
  productDiscount: number;
  productQuantity: number;
  genderCategory: string;
  createdAt: string;
  brandName: string;
  categoryName: string;
  colors: string[];
  sizes: string[];
  images: string[];
  reviews: string[];
}

export interface EditProductDto {
  productId: number;
  productName: string;
  productPrice: number;
  productDescription: string;
  productDiscount: number;
  genderCategory: string;
  brandName: string;
  categoryName: string;
  colors: string[];
  sizes: string[];
}

export interface Review {
  id?: number;
  reviewAuthor: UserEntity;
  reviewText: string;
  reviewRating: number;
  product: Product;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface CartItem {
  id: number;
  cart: Cart;
  product: Product;
  quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  cartItems: CartItem[];
}

export interface CartItemModel {
  image: string;
  title: string;
  size: string;
  color: string;
  discount: number;
  price: number;
  quantity: number;
}

import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email("Invalid email").nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const loginSchema = z.object({
  email: z.string().email("Invalid email").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const editUserSchema = z.object({
  id: z.number().nonnegative(),
  email: z.string().email("Invalid email").nonempty("Email is required"),
  username: z.string().nonempty("Username is required"),
  role: z.string().nonempty("Role is required"),
});

export const addProductSchema = z.object({
  productId: z.number().nonnegative(),
  productName: z.string().nonempty(),
  productPrice: z.number().nonnegative(),
  productDescription: z.string().nonempty(),
  productRating: z.number(),
  productDiscount: z.number(),
  productQuantity: z.number(),
  genderCategory: z.string(),
  createdAt: z.string(),
  brandName: z.string(),
  categoryName: z.string(),
  colors: z.string().array(),
  sizes: z.string().array(),
  images: z.string().array(),
  reviews: z.string().array(),
});

export const editProductSchema = z.object({
  productId: z.number().nonnegative(),
  productName: z.string().nonempty(),
  productPrice: z.number().nonnegative(),
  productDescription: z.string().nonempty(),
  productDiscount: z.number(),
  genderCategory: z.string(),
  brandName: z.string(),
  categoryName: z.string(),
  colors: z.string().array(),
  sizes: z.string().array(),
});

export const addBrandSchema = z.object({
  brandName: z.string().nonempty(),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z
    .string()
    .min(6, "Confirm password must be at least 6 characters"),
});

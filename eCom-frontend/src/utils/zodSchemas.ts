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
  roles: z.array(z.string()).nonempty("Roles are required"),
});

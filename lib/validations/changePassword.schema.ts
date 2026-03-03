import { z } from "zod";

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6, "Password must be at least 6 characters"),

  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[0-9]/, "Must include at least one number"),
});
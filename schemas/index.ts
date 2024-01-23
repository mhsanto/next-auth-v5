import * as z from "zod";
export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export const RegisterFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
  name: z.string().min(3).max(50),
});
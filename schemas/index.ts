import * as z from "zod";
export const LoginFormSchema = z.object({
	email: z.string().email(),
	password: z.string(),
	code: z.optional(z.string()),
});
export const RegisterFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(50),
	name: z.string().min(3).max(50),
});
export const ResetPasswordFormSchema = z.object({
	email: z.string().email({
		message: "Email is required",
	}),
});
export const NewPasswordFormSchema = z.object({
	password: z.string().min(6, {
		message: "Minimum 7 characters required",
	}),
});
export const SettingsSchema = z.object({
	password: z.string().min(6),
	newPassword: z.string().min(6),
	name: z.string().min(1).max(60),
	email: z.string().email(),
	role: z.string(),
	isTwoFactorEnabled: z.boolean(),
});

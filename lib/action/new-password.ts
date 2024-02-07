"use server";
import { getPasswordResetToken } from "@/data/reset-password-token";
import { getUserByEmail } from "@/data/user";
import { NewPasswordFormSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "../db";
export const newPassword = async (
	values: z.infer<typeof NewPasswordFormSchema>,
	token?: string | null,
) => {
	try {
		if (!token) return { error: "token is required" };

		const validateField = NewPasswordFormSchema.safeParse(values);

		if (!validateField.success) return { error: validateField.error };

		// Extract password from validated data
		const { password } = validateField.data;

		const existingToken = await getPasswordResetToken(token);

		if (!existingToken) return { error: "Invalid token" };

		// Check if the token has expired
		const hasExpired = new Date(existingToken.expiresAt) < new Date();
		if (hasExpired) return { error: "Token has expired" };

		// Check if the user associated with the token exists
		const existingUser = await getUserByEmail(existingToken.email);
		if (!existingUser) return { error: "User not found" };
		const comparePassword = await bcrypt.compare(
			password,
			existingUser.password as string,
		);

		if (comparePassword)
			return {
				error: "your current password cannot be same as your previous password",
			};
		// Hash the new password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Update the user's password in the database
		await db.user.update({
			where: {
				id: existingUser.id,
			},
			data: {
				password: hashedPassword,
			},
		});

		// Return success message
		return { success: "Password updated successfully" };
    
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
}  catch (error: any) {
		return { error: error.message };
	}
};

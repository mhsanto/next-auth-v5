"use server";

import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import * as z from "zod";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { Auth } from "@/lib/auth";
import { generateVerificationToken } from "../token";
import { sendVerificationEmail } from "../mail";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
	const user = await Auth();

	if (!user) {
		return { error: "Create an account or Sign In first" };
	}

	const dbUser = await getUserById(user.id as string);

	if (!dbUser) {
		return { error: "Unauthorized" };
	}

	if (user.isOAuth) {
		values.email = undefined;
		values.password = undefined;
		values.newPassword = undefined;
		values.isTwofactorEnabled = undefined;
	}

	if (values.email && values.email !== user.email) {
		const existingUser = await getUserByEmail(values.email);

		if (existingUser && existingUser.id !== user.id) {
			return { error: "Email is already in use" };
		}

		const verificationToken = await generateVerificationToken(values.email);
		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token,
		);

		return { success: "Verification email sent!" };
	}

	if (values.password && values.newPassword && dbUser.password) {
		const passwordsMatch = await bcrypt.compare(
			values.password,
			dbUser.password,
		);

		if (!passwordsMatch) {
			return { error: "Incorrect password!" };
		}

		const hashedPassword = await bcrypt.hash(values.newPassword, 10);
		values.password = hashedPassword;
		values.newPassword = undefined;
	}

	await db.user.update({
		where: { id: dbUser.id },
		data: {
			...values,
		},
	});

	return { success: "Settings Updated!" };
};

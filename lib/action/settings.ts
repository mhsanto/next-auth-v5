"use server";

import { SettingsSchema } from "@/schemas";
import { Auth } from "../auth";
import { db } from "../db";
import { getUserByEmail, getUserById } from "@/data/user";
import * as z from "zod";
export const settings = async (values: z.infer<typeof SettingsSchema>) => {
	const user = await Auth();
	if (!user) return { error: "Please Sign In or Create an Account" };
	const dbUser = await getUserById(user.id as string);
	if (!dbUser) return { error: "User not found" };
	if (user.isOAuth) {
		values.email = undefined;
		values.password = undefined;
		values.newPassword = undefined;
		values.isTwoFactorEnabled = undefined;
	}
	if (values.email && values.email !== dbUser.email) {
		const existingEmail = await getUserByEmail(values.email);
		if (existingEmail) return { error: "Email already exists" };
	}
	await db.user.update({
		where: { id: user.id },
		data: {
			...values,
		},
	});
	return { success: "Settings Updated" };
};

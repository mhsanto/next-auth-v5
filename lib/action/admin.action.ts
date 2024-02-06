"use server";
import { UserRole } from "@prisma/client";
import { currentRole } from "../auth";

export async function Admin() {
	const role = await currentRole();
	if (role === UserRole.ADMIN) {
		return { success: "ALLOWED" };
	}
	return { error: "NOT ALLOWED" };
}

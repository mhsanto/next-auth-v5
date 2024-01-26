"use server";

import { getUserById } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "../db";

export const newVerification = async (token: string) => {
  try {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) return { error: "Token not found" };
    const hasExpired = new Date(existingToken.expiresAt) < new Date();

    if (hasExpired) return { error: "Token has expired" };

    const existingUser = await getUserById(existingToken.email);

    if (!existingUser) return { error: "Email not found" };

    // Update the user's emailVerified and email fields
    await db.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
    return {success:"Email verified"}
  } catch (error) {
    console.log(`Error in newVerification: ${error}`);
  }
};

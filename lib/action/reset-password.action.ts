"use server";
import * as z from "zod";
import { ResetPasswordFormSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "../token";
import { sendPasswordResetEmail } from "../mail";

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordFormSchema>
) => {
  try {
    const validatedFields = ResetPasswordFormSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid form data" };
    }
    const { email } = values;

    const existingUser = await getUserByEmail(email);
    if (!existingUser?.email) return { error: "User not found" };

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token
    );

    return { success: "Password reset link sent to your email" };
  } catch (error) {
    console.log(`error in resetPassword action: ${error}`);
  }
};

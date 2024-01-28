"use server";
import * as z from "zod";
import { ResetPasswordFormSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

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

    return { success: "Password reset link sent to your email" };
  } catch (error) {
    console.log(`error in resetPassword action: ${error}`);
  }
};

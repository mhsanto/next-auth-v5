import { db } from "@/lib/db";

export const getPasswordResetToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordResetToken;
  } catch (error: any) {
    console.log(`error in getPasswordResetToken: ${error.message}`);
  }
};
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetEmail = await db.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordResetEmail;
  } catch (error: any) {
    console.log(`error in getPasswordResetEmail: ${error.message}`);
  }
};

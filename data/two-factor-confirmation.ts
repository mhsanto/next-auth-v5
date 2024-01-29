import { db } from "@/lib/db";

export const getTwoFactorConformationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { userId },
    });
    return twoFactorConfirmation;
  } catch (error) {
    console.log(`Error in getTwoFactorConformationByUserId: ${error}`);
  }
};

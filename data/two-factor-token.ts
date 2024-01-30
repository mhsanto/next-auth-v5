import { db } from "@/lib/db";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: {
        token,
      },
    });
    return twoFactorToken;
  } catch (error) {
    console.log(`Error in getTwoFactorTokenByToken: ${error}`);
  }
};

export const getTwoFactorTokenByEmail = (email: string) => {
  try {
    const twoFactorToken = db.twoFactorToken.findFirst({
      where: {
        email,
      },
    });
    return twoFactorToken;
  } catch (error) {
    console.log(`Error in getTwoFactorTokenByToken: ${error}`);
  }
};

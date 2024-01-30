"use server";
import { LoginFormSchema } from "@/schemas";
import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/token";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "../db";
import { getTwoFactorConformationByUserId } from "@/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof LoginFormSchema>) => {
  try {
    const validatedFields = LoginFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { email, password, code } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return { error: "Email does not exist " };
    }
    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
        existingUser.email!
      );
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );
      return { success: "Confirmation email has been sent to your account" };
    }
    // Check if the user has two-factor authentication enabled and has an email
    if (existingUser.isTwofactorEnabled && existingUser.email) {
      // If a code is provided
      if (code) {
        // Retrieve the two-factor token associated with the user's email
        const twoFactorToken = await getTwoFactorTokenByEmail(
          existingUser.email
        );
        // If no token is found, return an error
        if (!twoFactorToken) return { error: "Please enter correct code" };

        // If the provided code does not match the token, return an error
        if (twoFactorToken.token !== code)
          return {
            error: "Your code doesn't match check your email and try again",
          };
        const hasExpired = new Date(twoFactorToken.expiresAt) < new Date();
        if (hasExpired) return { error: "Your code has expired" };
        // Delete the used two-factor token
        await db.twoFactorToken.delete({
          where: {
            id: twoFactorToken.id,
          },
        });

        // Check if there's an existing two-factor confirmation for the user
        const existingConfirmation = await getTwoFactorConformationByUserId(
          existingUser.id
        );

        // If a confirmation exists, delete it
        if (existingConfirmation) {
          await db.twoFactorConfirmation.delete({
            where: {
              id: existingConfirmation.id,
            },
          });
        }

        // Create a new two-factor confirmation for the user
        await db.twoFactorConfirmation.create({
          data: {
            userId: existingUser.id,
          },
        });
      } else {
        // If no code is provided, generate a new two-factor token and send it to the user's email
        const twoFactorToken = await generateTwoFactorToken(existingUser.email);
        await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken.token);
        return { twoFactor: true };
      }
    }

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};

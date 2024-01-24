"use server";
import { LoginFormSchema } from "@/schemas";
import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
export const login = async (values: z.infer<typeof LoginFormSchema>) => {
  try {
    const validatedFields = LoginFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }
    const { email, password } = validatedFields.data;
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

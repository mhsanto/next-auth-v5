import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { LoginFormSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const isValidatedFields = LoginFormSchema.safeParse(credentials);
        if (isValidatedFields.success) {
          const { email, password } = isValidatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null;
          }
          const isPasswordMatch = await bcrypt.compare(password, user.password);
          if (isPasswordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

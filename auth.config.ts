import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginFormSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const isValidatedFields = LoginFormSchema.safeParse(credentials);
        if (isValidatedFields.success) {
          const { email, password } = isValidatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) {return null}
          const isPasswordMatch = await bcrypt.compare(password, user.password);
          if (isPasswordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { getTwoFactorConformationByUserId } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";

declare module "@auth/core" {
	interface Session {
		user: {
			role: string;
		} & DefaultSession["user"];
	}
}

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	adapter: PrismaAdapter(db),
	pages: {
		signIn: "/auth/login",
		error: "/auth/error",
	},
	events: {
		async linkAccount({ user }) {
			await db.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() },
			});
		},
	},
	callbacks: {
		async signIn({ user, account }) {
			//only allow Oauth without email verification
			if (account?.provider !== "credentials") return true;
			const existingUser = await getUserById(user.id as string);
			// do not allow login if email is not verified
			if (!existingUser?.emailVerified) return false;
			//todo add 2fa check
			if (existingUser.isTwofactorEnabled) {
				const twoFactorConfirmation = await getTwoFactorConformationByUserId(
					existingUser.id,
				);
				if (!twoFactorConfirmation) return false;
				//Delete two factor confirmation for next singin
				await db.twoFactorConfirmation.delete({
					where: { id: twoFactorConfirmation.id },
				});
			}
			return true;
		},
		// @ts-ignore
		async session({ session, token }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}
			if (token.role && session.user) {
				session.user.role = token.role as "ADMIN" | "USER";
			}
			if (session.user) {
				session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
			}
			if (session.user) {
				session.user.email = token.email;
				session.user.name = token.name;
				session.user.isOAuth = token.isOAuth as boolean;
			}
			return session;
		},
		async jwt({ token }) {
			const { sub } = token;
			if (!sub) return token;

			const existingUser = await getUserById(sub);
			token.name = existingUser?.name;
			token.email = existingUser?.email;
			token.sub = existingUser?.id;
			token.role = existingUser?.role;
			token.isTwoFactorEnabled = existingUser?.isTwofactorEnabled;

			if (!existingUser) return token;
			const existingAccount = await getAccountByUserId(existingUser.id);
			token.isOAuth = !!existingAccount;
			token.role = existingUser.role;
			return token;
		},
	},
	session: { strategy: "jwt" },
	...authConfig,
});

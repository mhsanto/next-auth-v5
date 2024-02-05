import { auth } from "@/auth";

export async function Auth() {
  const session = await auth();
  return session?.user;
}

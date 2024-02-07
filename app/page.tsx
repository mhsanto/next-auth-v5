import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
export default function Home() {
  return (
    <main className="flex gap-3 h-full flex-col items-center justify-center w-full bg-secondary-foreground text-white">
      <h1 className={cn("text-2xl font-semibold", font.className)}>
        NEXT AUTH V5
      </h1>
      <LoginButton asChild>
        <Button size="lg" variant="secondary">Sign In</Button>
      </LoginButton>
    </main>
  );
}

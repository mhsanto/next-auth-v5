"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { LoginForm } from "./login-form";
type LoginButtonProps = {
	children: React.ReactNode;
	mode?: "modal" | "redirect";
	asChild?: boolean;
};
const LoginButton: React.FC<LoginButtonProps> = ({
	children,
	mode = "redirect",
	asChild,
}) => {
	const router = useRouter();
	const handleClick = () => {
		router.push("/auth/login");
	};
	if (mode === "modal") {
		return (
			<Dialog>
				<DialogTrigger asChild={asChild}>
					{children}
					<DialogContent className="p-0 border-none bg-transparent w-auto">
						<LoginForm />
					</DialogContent>
				</DialogTrigger>
			</Dialog>
		);
	}

	// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
	return <span onClick={handleClick}>{children}</span>;
};

export default LoginButton;

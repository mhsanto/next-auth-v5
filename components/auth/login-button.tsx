"use client";

import { useRouter } from "next/navigation";

type LoginButtonProps = {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild: boolean;
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
  return <span onClick={handleClick}>{children}</span>;
};

export default LoginButton;

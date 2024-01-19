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
  const handleClick = () => {};
  return <span onClick={handleClick}>{children}</span>;
};

export default LoginButton;

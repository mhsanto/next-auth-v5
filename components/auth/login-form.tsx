import CardWrapper from "./card-wrapper";

export const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonHref="/auth/register"
      backButtonLabel="Create an account"
      showSocial={true}
    >
      Login Form
    </CardWrapper>
  );
};

import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Suspense } from "react";

const ForgotPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ForgotPassword;

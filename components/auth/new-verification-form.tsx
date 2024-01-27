"use client";
import { useSearchParams } from "next/navigation";
import CardWrapper from "./card-wrapper";
import { SyncLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/lib/action/verification.action";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Token not found");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data?.success as string);
        setError(data?.error as string);
      })
      .catch((error: any) => setError(error.message));
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Go to login page"
      headerLabel="Confirming your email address.."
    >
      <div className=" flex justify-center flex-col items-center gap-7">
        {!success && !error && <SyncLoader />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;

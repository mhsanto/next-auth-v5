"use client"
import { useSearchParams } from "next/navigation";
import CardWrapper from "./card-wrapper";
import { SyncLoader } from "react-spinners";
import { useCallback, useEffect } from "react";
const NewVerificationForm = () => {
const searchParams = useSearchParams()

const token = searchParams.get("token")
const onSubmit = useCallback(()=>{
    console.log(token)
},[token])

useEffect(()=>{
    onSubmit()
},[onSubmit])
  return (
    
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Go to login page"
      headerLabel="Confirming your email address.."
    >
      <div className=" flex justify-center ">
        <SyncLoader />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;

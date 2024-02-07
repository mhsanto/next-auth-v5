"use client";
import * as z from "zod";
import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { LoginFormSchema } from "@/schemas";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useState, useTransition } from "react";
import { login } from "@/lib/action/login.action";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get("callbackUrl") as string;
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already used in different provider"
      : undefined;

  const [isPending, startTransition] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<string | undefined>("");
  const [isError, setIsError] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    setIsError("");
    setIsSuccess("");
    startTransition(() => {
      login(values,callBackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setIsError(data.error);
          }
          if (data?.success) {
            form.reset();
            setIsSuccess(data.success);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setIsError("Something went wrong"));
    });
    console.log(values);
  }
  return (
    <CardWrapper
      headerLabel={ showTwoFactor ? "Your two-factor authentication code sent to your email address " : "Welcome Back"}
      backButtonHref="/auth/register"
      backButtonLabel="Create an account"
      showSocial={showTwoFactor ? false : true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          {showTwoFactor ? (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your verification code here</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="121212"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="emailaddress@gmail.com"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password here"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 text-xs font-normal"
                      asChild
                    >
                      <Link href="/auth/forgot-password">Forgot password?</Link>
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <FormError message={isError || urlError} />
          <FormSuccess message={isSuccess} />
          <Button type="submit" className="w-full" disabled={isPending}>
            { showTwoFactor ? "Verify" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

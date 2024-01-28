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

import { ResetPasswordFormSchema } from "@/schemas";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useState, useTransition } from "react";
import { login } from "@/lib/action/login.action";
export const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState<string | undefined>("");
  const [isError, setIsError] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ResetPasswordFormSchema>) {
    setIsError("");
    setIsSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        setIsSuccess(data?.success);
        setIsError(data?.error);
      });
    });
  }
  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonHref="/auth/login"
      backButtonLabel="Go back to login Page"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

          <FormError message={isError} />
          <FormSuccess message={isSuccess} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Send me the reset link
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

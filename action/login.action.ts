"use server";
import { LoginFormSchema } from "@/schemas";
import * as z from "zod";

export const login = (values: z.infer<typeof LoginFormSchema>) => {
  try {
    console.log(values);
  } catch (error) {}
};

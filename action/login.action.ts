"use server";
import { LoginFormSchema } from "@/schemas";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginFormSchema>) => {
  try {
    const validatedFields = LoginFormSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }
    return { success: "Email Sent" };
  } catch (error) {
    console.log(error);
  }
};
export const register = async (values: z.infer<typeof LoginFormSchema>) => {
  try {
    const validatedFields = LoginFormSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "In valid fields" };
    }
    return { success: "Email Sent" };
  } catch (error) {
    console.log(error);
  }
};

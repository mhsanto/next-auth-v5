"use server";
import * as z from "zod";
import bcrypt from "bcrypt";
import { RegisterFormSchema } from "@/schemas";
import { db } from "../db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterFormSchema>) => {
  try {
    const validatedFields = RegisterFormSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }
    const { email, name, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    //check if email is already existed
    const existingEmail = await getUserByEmail(email)
    if (existingEmail) {
      return { error: "Email already existed" };
    }
    await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return { success: "User created successfully" };
  } catch (error: any) {
    console.log(error.message);
  }
};

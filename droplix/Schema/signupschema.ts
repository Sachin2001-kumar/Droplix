import * as z from "zod";
import { email } from "zod/v4";

export const signupschema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Please Enter a valid E-mail" }),

    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Passowrd should minium of 8 characters" }),

    passwordConfirmation: z
      .string()
      .min(1, { message: "Please confirmed your password" })
      .min(8, { message: "Passowrd should minium of 8 characters" }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Password do not match!",
    path: ["passwordConfirmation"],
  });
// In refine you need explicitly define where you need to show the "password do not match error"

// In refine the data is property. It will collect the object data of the from or you can just say the all data of the input data of the form as object

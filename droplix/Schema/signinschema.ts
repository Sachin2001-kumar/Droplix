import * as z from "zod";

export const signinschema = z.object({
  identifier: z
    .string()
    .min(1, { message: "Emial is required !" })
    .email({ message: "Please Enter a Valid E-mail" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});

import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const validationSchema = toTypedSchema(
  z.object({
    username: z
      .string({
        required_error: "Username is required",
        invalid_type_error: "Username must be a string",
      })
      .nonempty({ message: "Can't be empty" })
      .min(1, { message: "Too short" }),
    password: z.string().optional(),
  })
);

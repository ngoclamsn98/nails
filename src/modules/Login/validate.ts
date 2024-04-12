import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const validationSchema = toTypedSchema(
  z.object({
    username: z
      .string({
        required_error: "Please enter your username",
        invalid_type_error: "Please enter your username",
      })
      .nonempty({ message: "Please enter your username" }),
    password: z
      .string({
        required_error: "Please enter your password",
        invalid_type_error: "Please enter your password",
      })
      .nonempty({ message: "Please enter your password" }),
  })
);

import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const validationSchema = toTypedSchema(
  z.object({
    barcode: z
      .string({
        required_error: "Bạn phải nhập Barcode",
        invalid_type_error: "Bạn phải nhập Barcode",
      })
      .min(1, { message: "Bạn phải nhập Barcode" }),
  })
);

import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const ProductSchema = z
  .object({
    selected: z.boolean().optional(),
    id: z.number().optional(),
  })
  .optional();

const PackagesSchema = z
  .object({
    selected: z.boolean().optional(),
    id: z.number().optional(),
    products: z.array(ProductSchema).optional(),
  })
  .optional();

export const validationSchema = toTypedSchema(
  z.object({
    total: z.object({
      money: z
        .number({
          required_error: "Giá tiền không hợp lệ",
          invalid_type_error: "Giá tiền không hợp lệ",
        })
        .min(1, { message: "Giá tiền không hợp lệ" }),
      type: z.string().optional(),
    }),
    tip: z.object({
      money: z
        .number({
          required_error: "Giá tiền không hợp lệ",
          invalid_type_error: "Giá tiền không hợp lệ",
        })
        .optional(),
      type: z.string().optional(),
    }),
    note: z.string().optional(),
    packages: z.array(PackagesSchema).optional(),
    paymentType: z.string().optional(),
  })
);

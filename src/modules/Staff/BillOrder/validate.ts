import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const ProductSchema = z
  .object({
    selected: z.boolean().optional(),
    id: z.number().optional(),
    price: z.any().optional(),
  })
  .optional();

const CategorySchema = z
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
    tip: z
      .number({
        required_error: "Giá tiền không hợp lệ",
        invalid_type_error: "Giá tiền không hợp lệ",
      })
      .optional(),
    note: z.string().optional(),
    categories: z.array(CategorySchema).optional(),
    paymentType: z.number().optional(),
    clientPhoneNumber: z.string().optional(),
    clientName: z.string().optional(),
  })
);

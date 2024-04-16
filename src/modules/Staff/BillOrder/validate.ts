import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const ProductSchema = z
  .object({
    id: z.number().optional(),
    price: z.any().optional(),
  })
  .optional();

const CategorySchema = z
  .object({
    id: z.number().optional(),
    products: z.array(ProductSchema).optional(),
  })
  .optional();

const PackageSchema = z.any(CategorySchema);

export const validationSchema = toTypedSchema(
  z.object({
    cash: z
      .number({
        required_error: "Giá tiền không hợp lệ",
        invalid_type_error: "Giá tiền không hợp lệ",
      })
      .optional(),
    tip: z
      .number({
        required_error: "Giá tiền không hợp lệ",
        invalid_type_error: "Giá tiền không hợp lệ",
      })
      .optional(),
    note: z.string().optional(),
    paymentType: z.number().optional(),
    clientPhoneNumber: z.string().optional(),
    clientName: z.string().optional(),
    packages: z.array(PackageSchema).optional(),
    saleDiv: z.number().optional(),
    discount: z.number().optional(),
  })
);

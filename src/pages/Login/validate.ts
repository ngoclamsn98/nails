import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const validationSchema = toTypedSchema(
  z.object({
    username: z
      .string({
        required_error: "Tên đăng nhập bắt buộc phải nhập",
        invalid_type_error: "Tên đăng nhập không đúng dịnh dạng",
      })
      .nonempty({ message: "Tên đăng nhập bắt buộc phải nhập" }),
    password: z
      .string({
        required_error: "Mật khẩu bắt buộc phải nhập",
        invalid_type_error: "Mật khẩu không đúng định dạng",
      })
      .nonempty({ message: "Mật khẩu bắt buộc phải nhập" }),
  })
);

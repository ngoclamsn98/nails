<template>
  <div class="w-full relative h-full flex items-center bg-content flex-col">
    <form
      @submit="onSubmit"
      class="gap-y-[10px] flex flex-col w-[80%] m-auto justify-between"
    >
      <h2 class="text-[32px] mb-[20px]">LITI <br />Nail & Hair</h2>
      <div class="flex flex-col justify-end">
        <InputText
          name="username"
          placeholder="Please enter username"
          class="mt-0"
        />
        <InputText
          name="password"
          type="password"
          placeholder="Please enter password"
          class="!mt-0"
        />
        <div class="w-full">
          <Button class="mb-[20px] w-full border-0">
            <template v-slot:text>Login</template>
          </Button>
        </div>
      </div>
    </form>
  </div>
</template>
  
<script setup>
import Button from "@/components/Button";

import InputText from "@/components/InputText";
import { useStore } from "vuex";
import { handlerCallApi } from "@/config/interceptors";
import { handleNextFocus } from "@/utils/handleNextFocus";
import { useForm } from "vee-validate";
import { validationSchema } from "./validate";
import { ROLES } from "@/constants/role";

const store = useStore();

const { handleSubmit } = useForm({
  validationSchema: validationSchema,
});

const onSubmit = (e) => {
  handleNextFocus(
    e,
    handleSubmit(async (values) => {
      const result = await handlerCallApi({
        method: "POST",
        url: "/auth/sign-in",
        body: values,
      });

      if ([ROLES.MASTER, ROLES.FC, ROLES.STORE].includes(result.role)) {
        store.commit("error/setError", {
          message: "Bạn không có quyền truy cập vào store!",
          type: "USER_MASTER",
        });
        return;
      }

      store.commit("user/authenticate", {
        data: result,
      });
    })
  );
};
</script>
  
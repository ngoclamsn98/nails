<template>
  <div class="w-full relative h-full flex items-center bg-blue-300 flex-col">
    <div class="h-[30%]">
      <div class="bg-sky-300 w-[200px] h-[200px] absolute top-[-135px] left-[-61px] rounded-[100%] z-20"></div>
      <div class="bg-sky-400 w-[700px] h-[700px] absolute top-[-450px] left-[-105px] rounded-[100%] z-10"></div>
    </div>
    <form
      @submit="onSubmit"
      class="gap-y-[10px] flex flex-col w-[80%] m-auto justify-between"
    >
      <h2 class="text-white text-[32px] mb-[20px]">LITI <br />Nail & Hair</h2>
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
          class="mt-0"
        />
        <div class="w-full sm:w-auto sm:w-9/10 md:w-11/12 lg:w-5/6 xl:w-4/5 2xl:w-3/4">
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

import { handleNextFocus } from "@/utils/handleNextFocus";
import { useForm } from "vee-validate";
import { validationSchema } from "./validate";

const store = useStore();

const { handleSubmit } = useForm({
  validationSchema: validationSchema,
});

const onSubmit = (e) => {
  handleNextFocus(
    e,
    handleSubmit((values) => {
      store.commit("user/authenticate", {
        token: values,
      });
    })
  );
};
</script>
  
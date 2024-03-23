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
      <h2 class="text-white text-[32px] mb-[20px]">Welcome Back</h2>
      <div class="flex flex-col justify-end">
        <InputText
          name="username"
          placeholder="Nhập tên đăng nhập"
        />
        <InputText
          name="password"
          type="password"
          placeholder="Nhập mật khẩu"
        />
        <div class="flex justify-between px-5 mt-[10px] items-center">
          <span class="text-white">Đăng nhập</span>
          <ButtonIcon>
            <template v-slot:icon>
              <ArrowNext />
            </template>
          </ButtonIcon>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import InputText from "@/components/InputText";
import ArrowNext from "@/components/Icon/ArrowNext";
import ButtonIcon from "@/components/ButtonIcon";
import { useStore } from "vuex";

// import useDisclosure from "@/hooks/useDisclosure";

import { useForm } from "vee-validate";
import { validationSchema } from "./validate";
import { handleNextFocus } from "@/utils/handleNextFocus";

const store = useStore();

const cameraRef = ref();
// const { isOpen, open, close } = useDisclosure();
const { handleSubmit } = useForm({
  validationSchema: validationSchema,
});

// const openCamera = () => {
//   open();
//   cameraRef.value.cameraOff();
// };

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

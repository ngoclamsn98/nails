<template>
  <div class="w-full relative h-full flex items-center bg-sky-200">
    <div class="bg-sky-300 w-[200px] h-[200px] absolute top-[-135px] left-[-61px] rounded-[100%] z-20"></div>
    <div class="bg-sky-400 w-[700px] h-[700px] absolute top-[-450px] left-[-105px] rounded-[100%] z-10"></div>
    <div class="h-[30%]"></div>
    <form @submit="onSubmit" class="gap-y-[10px] flex flex-col w-[80%] m-auto h-[485px] justify-end">
      <InputText name="username"/>
      <InputNumber name="age"/>
      <div class="flex justify-between px-5 mt-[10px] items-center">
        <span>Đăng nhập</span>
        <button class="w-[50px] h-[50px] rounded-full bg-sky-600">-></button>
      </div>
    </form>
  </div>
</template>

<script setup>
import InputNumber from '@/components/InputNumber';
import InputText from '@/components/InputText';
import { useForm } from 'vee-validate';
import { validationSchema } from './validate';

const { handleSubmit } = useForm({
  validationSchema,
});

const onSubmit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2));
});
</script>

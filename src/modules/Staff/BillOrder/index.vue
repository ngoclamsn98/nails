<template>
  <form class="flex justify-start items-start w-[90%] h-full flex-col m-auto" @submit="onSubmit">
    <h1 class="text-[26px] mt-[10px]">Note Checkout Bill</h1>
    <Packages />
    <Images />
    <div class="flex w-full border-t mt-[5px] border-gray">
      <div class="mt-[10px] flex items-center h-[80px] w-[90%] m-auto">
        <div class="mb-[13px] basis-8 inline-block">Tip</div>
        <InputNumber name="tip.money" class="flex-1"/>
        <SelectMoneyType name="tip.type" class="mb-[13px] ml-[5px]"/>
      </div>
    </div>
    <div class="flex w-full border-t mt-[5px] border-gray">
      <div class="mt-[10px] flex items-center h-[80px] w-[90%] m-auto">
        <span class="mb-[13px] basis-8">Total</span>
        <InputNumber name="total.money"/>
        <SelectMoneyType name="total.type" class="mb-[13px] ml-[5px]"/>
      </div>
    </div>
    <div class="flex w-full border-t mt-[15px] border-gray">
      <div class="mt-[10px] flex items-center h-[80px] w-[90%] m-auto">
        <span class="mb-[13px] basis-8">Note</span>
        <TextArea name="note"/>
      </div>
    </div>
    <div class="flex w-full border-t mt-[15px] border-gray">
      <div class="mt-[10px] flex items-center h-[50px] w-[90%] m-auto">
        <span class="basis-8 mr-[5px]">Store</span>
        <Select name="store" :options="stores" class="w-[100px]"/>
      </div>
    </div>
    <div class="flex w-full justify-center mt-[20px]">
      <Button>
        <template v-slot:text>Submit</template>
      </Button>
    </div>
  </form>
</template>
  
<script setup>
import Button from '@/components/Button';
import InputNumber from '@/components/InputNumber';
import Select from '@/components/Select';
import SelectMoneyType from '@/components/SelectMoneyType';
import TextArea from '@/components/TextArea';
import { handleNextFocus } from "@/utils/handleNextFocus";
import { useForm } from "vee-validate";
import Images from "./components/Images";
import Packages from "./components/Packages";
import { validationSchema } from "./validate";

const { handleSubmit } = useForm({
  validationSchema: validationSchema,
});

const onSubmit = (e) => {
  handleNextFocus(
    e,
    handleSubmit((values) => {
      console.log(values,'values');
      // store.commit("user/authenticate", {
      //   token: values,
      // });
    })
  );
};

const stores = [{label: 'store1', value: '1'}, {label: 'store2', value: '2'}]
</script>
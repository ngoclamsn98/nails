<template>
  <Header
    :isBack="true"
    title="Note Checkout Bill"
  >
    <template v-slot:content>
      <form
        class="flex justify-start items-start w-[90%] h-full flex-col m-auto"
        @submit="onSubmit"
      >
        <Packages />
        <Images />
        <div class="flex w-full border-t mt-[5px] border-gray">
          <div class="mt-[10px] flex items-center h-[80px] w-[90%] m-auto">
            <div class="mb-[13px] basis-8 inline-block">Tip</div>
            <InputNumber
              name="tip.money"
              class="flex-1"
            />
            <SelectMoneyType
              name="tip.type"
              class="mb-[13px] ml-[5px]"
            />
          </div>
        </div>
        <div class="flex w-full border-t mt-[5px] border-gray">
          <div class="mt-[10px] flex items-center h-[80px] w-[90%] m-auto">
            <span class="mb-[13px] basis-8">Total</span>
            <InputNumber name="total.money" />
            <SelectMoneyType
              name="total.type"
              class="mb-[13px] ml-[5px]"
            />
          </div>
        </div>
        <div class="flex w-full border-t mt-[15px] border-gray">
          <div class="mt-[10px] flex items-center h-[80px] w-[90%] m-auto">
            <span class="mb-[13px] basis-8">Note</span>
            <TextArea name="note" />
          </div>
        </div>
        <div class="flex w-full justify-center mt-[20px]">
          <Button class="mb-[20px]">
            <template v-slot:text>Submit</template>
          </Button>
        </div>
      </form>
    </template>
  </Header>
</template>
  
<script setup>
import Button from "@/components/Button";
import Header from "@/components/Header";
import InputNumber from "@/components/InputNumber";
import SelectMoneyType from "@/components/SelectMoneyType";
import TextArea from "@/components/TextArea";
import router from "@/routes";
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
      console.log(values, "values");
      router.push("/staff");
      // store.commit("user/authenticate", {
      //   token: values,
      // });
    })
  );
};

const stores = [
  { label: "store1", value: "1" },
  { label: "store2", value: "2" },
];
</script>
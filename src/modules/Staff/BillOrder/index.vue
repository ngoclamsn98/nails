<template>
  <Header
    :isBack="true"
    title="Note Checkout Bill"
  >
    <template v-slot:content>
      <form
        class="flex justify-start items-start w-[90%] h-full flex-col m-auto"
        @submit.prevent="onSubmit"
      >
        <Packages />
        <Camera />
        <div class="flex w-full border-t mt-[5px] border-gray">
          <div class="mt-[10px] flex items-center h-[80px] w-[90%] m-auto">
            <div class="mb-[22px] basis-8 inline-block">Name</div>
            <InputText
              name="clientName"
              class="flex-1"
            />
          </div>
        </div>
        <div class="flex w-full border-t mt-[5px] border-gray">
          <div class="mt-[10px] flex items-center h-[80px] w-[90%] m-auto">
            <div class="mb-[22px] basis-8 inline-block">Phone</div>
            <InputText
              name="clientPhoneNumber"
              class="flex-1"
            />
          </div>
        </div>
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
        <div class="flex w-full border-t mt-[15px] border-gray">
          <div class="mt-[10px] flex items-center h-[80px] w-[90%] m-auto gap-x-2">
            <span class="mb-[13px]">Thanh toán</span>
            <SelectPaymentType
              name="paymentType"
              class="mb-[13px] ml-[5px]"
            />
          </div>
        </div>
        <div class="flex w-full justify-center mt-[20px]">
          <Button class="mb-[20px] w-[150px]">
            <template v-slot:text>Submit</template>
          </Button>
        </div>
      </form>
    </template>
  </Header>
</template>

<script setup>
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import Camera from "@/components/Camera_v2";
import Header from "@/components/Header";
import InputNumber from "@/components/InputNumber";
import SelectMoneyType from "@/components/SelectMoneyType";
import SelectPaymentType from "@/components/SelectPaymentType";
import TextArea from "@/components/TextArea";
import router from "@/routes";
import { STAFF } from "@/routes/path";
import { handleNextFocus } from "@/utils/handleNextFocus";
import { useForm } from "vee-validate";
import { getCurrentInstance, watch } from "vue";
import Packages from "./components/Packages";
import { validationSchema } from "./validate";

const { handleSubmit, values, setFieldValue } = useForm({
  validationSchema: validationSchema,
});

const instance = getCurrentInstance();
const app = instance.appContext.app;

watch(values, (newValues) => {
  const arrIndex = {};
  newValues.packages.forEach((value, index) => {
    arrIndex[index] = value.products.some((product) => product.selected);
  });

  Object.keys(arrIndex).forEach((index) =>
    setFieldValue(`packages.${index}.selected`, arrIndex[index])
  );
});

const onSubmit = (e) => {
  handleNextFocus(
    e,
    handleSubmit((values) => {
      app.$confirm({
        title: "Thêm Bill thành công",
        button: {
          yes: "Ok",
        },
        callback: (confirm) => {
          return router.push(STAFF.HOME);
          // store.commit("user/authenticate", {
          //   token: values,
          // });
        },
      });
    })
  );
};
</script>

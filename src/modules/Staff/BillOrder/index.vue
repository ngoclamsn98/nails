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
        <div class="flex w-full border-t border-gray-400">
          <div class="w-[90%] mx-auto">
            <InputText
              name="clientName"
              label="Name"
              :classes="classes"
            />
          </div>
        </div>
        <div class="flex w-full border-t border-gray-400">
          <div class="w-[90%] mx-auto">
            <InputText
              name="clientPhoneNumber"
              label="Phone"
              :classes="classes"
            />
          </div>
        </div>
        <div class="flex w-full border-t border-gray-400">
          <div class="w-[90%] mx-auto">
            <InputNumber
              name="tip.money"
              label="Tip"
              :classes="classes"
            />
          </div>
        </div>
        <div class="flex w-full border-t border-gray-400">
          <div class="w-[90%] mx-auto">
            <InputNumber name="total.money" label="Total" :classes="classes"/>
          </div>
        </div>
        <div class="flex w-full border-t border-gray-400">
          <div class="w-[90%] mx-auto"><TextArea name="note" class="flex-1" label="Note" :classes="classes"/></div>
        </div>
        <div class="flex w-full border-t border-gray-400">
          <div class="w-[90%] mx-auto">
            <SelectPaymentType
              name="paymentType"
              label="Thanh Toán"
              class="mt-[20px]"
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
import Camera from "@/components/Camera_v2";
import Header from "@/components/Header";
import InputNumber from "@/components/InputNumber";
import InputText from "@/components/InputText";
import SelectPaymentType from "@/components/SelectPaymentType";
import TextArea from "@/components/TextArea";
import router from "@/routes";
import { STAFF } from "@/routes/path";
import { handleNextFocus } from "@/utils/handleNextFocus";
import { useForm } from "vee-validate";
import { getCurrentInstance, reactive, watch } from "vue";
import Packages from "./components/Packages";
import { validationSchema } from "./validate";

const { handleSubmit, values, setFieldValue } = useForm({
  validationSchema: validationSchema,
});

const instance = getCurrentInstance();
const app = instance.appContext.app;

const classes = reactive({label: 'basis-12'})

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

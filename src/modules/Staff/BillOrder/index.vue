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
              :isMoney="true"
            />
          </div>
        </div>
        <div class="flex w-full border-t border-gray-400">
          <div class="w-[90%] mx-auto">
            <InputNumber
              name="total.money"
              label="Total"
              :classes="classes"
              :isMoney="true"
              :onBlur="onBlurTotal"
              :disabled="true"
            />
            <div class="w-full flex justify-end">
              <span
                class="text-gray-500 text-[14px]"
                v-show="amountUsd"
              >{{ amountUsd }} USD</span>
            </div>
          </div>
        </div>
        <div class="flex w-full border-t border-gray-400">
          <div class="w-[90%] mx-auto">
            <TextArea
              name="note"
              class="flex-1"
              label="Note"
              :classes="classes"
            />
          </div>
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
import { handleConvertVndToUSD } from "@/utils/api";
import { handleNextFocus } from "@/utils/handleNextFocus";
import { useForm } from "vee-validate";
import { onMounted, reactive, ref, watch } from "vue";
import Packages from "./components/Packages";
import { validationSchema } from "./validate";

const amountUsd = ref(null);
const classes = reactive({ label: "basis-12" });

const { handleSubmit, values, setFieldValue } = useForm({
  validationSchema: validationSchema,
});

watch(values, (newValues) => {
  const arrIndex = {};
  newValues.categories.forEach((value, index) => {
    arrIndex[index] = value.products.some((product) => product.selected);
  });

  Object.keys(arrIndex).forEach((index) =>
    setFieldValue(`categories.${index}.selected`, arrIndex[index])
  );
});

const onSubmit = (e) => {
  handleNextFocus(
    e,
    handleSubmit((values) => {})
  );
};

const onBlurTotal = async () => {
  const amount = await handleConvertVndToUSD(values.total.money);
  amountUsd.value = amount;
};

onMounted(() => {
  setFieldValue(`tip.money`, 111);
});
</script>

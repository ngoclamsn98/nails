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
        <Packages :collapses="data.collapses" />
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
              name="tip"
              label="Tip"
              :classes="classes"
              :isMoney="true"
            />
          </div>
        </div>
        <div class="flex w-full border-t border-gray-400">
          <div class="w-[90%] mx-auto flex items-center py-[10px]">
            <span class="basis-12">Total</span>
            <div class="flex flex-col text-gray-500 text-[14px]">
              <span class="ml-[10px]">
                {{ numberWithCommas(total) }} vnđ
                <InputCategory
                  :name="`cash`"
                  class="hidden"
                />
              </span>
              <span
                class="ml-[10px]"
                v-if="amountUsd"
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
import Camera from "@/components/CameraNormal";
import Header from "@/components/Header";
import InputNumber from "@/components/InputNumber";
import InputText from "@/components/InputText";
import SelectPaymentType from "@/components/SelectPaymentType";
import TextArea from "@/components/TextArea";
import { handleConvertVndToUSD, handleGetPackage } from "@/utils/api";
import { productToKey } from "@/utils/array";
import { handleNextFocus } from "@/utils/handleNextFocus";
import { useForm } from "vee-validate";
import { onMounted, provide, reactive, ref, watch } from "vue";
import Packages from "./components/Packages";
import InputCategory from "@/components/InputCategory";
import { numberWithCommas } from "@/utils/number";

const amountUsd = ref(null);
const total = ref(null);
const checkedArr = ref([]);

const classes = reactive({ label: "basis-12" });
const data = reactive({ collapses: [], categories: {} });

const { handleSubmit, values, setFieldValue } = useForm({
  // validationSchema: validationSchema,
});

const handleCheckedValue = (values) => {
  if (!values?.packages?.length) return [];
  const checkedList = [];
  values.packages.forEach((packages) => {
    packages?.categories?.forEach((category) => {
      category?.products?.forEach((product) => {
        checkedList.push(product.id);
      });
    });
  });
  checkedArr.value = checkedList;
  return checkedList;
};

const handleTotalAmount = (values) => {
  if (!values?.packages?.length) return values.tip || 0;

  const checkedList = [];
  values.packages.forEach((packages) => {
    packages?.categories?.forEach((category) => {
      category?.products?.forEach((product) => {
        if (category.id && product.id && product.price) {
          checkedList.push(product);
        }
      });
    });
  });

  const amountVnd = checkedList.reduce((init, value) => {
    return (init += +value.price);
  }, 0);

  return amountVnd + (values.tip || 0);
};

let timeout;

watch(values, (newValues) => {
  handleCheckedValue(newValues);

  const amountVnd = handleTotalAmount(newValues);

  const debounceTime = 1000;
  total.value = amountVnd;
  clearTimeout(timeout);
  timeout = setTimeout(async () => {
    amountUsd.value = await handleConvertVndToUSD(amountVnd);
    setFieldValue("cash", amountVnd);
  }, debounceTime);
});

const onSubmit = (e) => {
  handleNextFocus(
    e,
    handleSubmit((values) => {
      console.log(values, "values");
    })
  );
};

const handleIndividual = (selectedIndex) => {
  data.collapses = [...data.collapses].map((collapse, index) => {
    if (index === selectedIndex) {
      return { ...collapse, isExpanded: !collapse.isExpanded };
    }
    return collapse;
  });
};

onMounted(async () => {
  // Call api get packages;
  const response = await handleGetPackage();
  if (!response.length) {
    return;
  }
  data.collapses = response.map(({ name, id, categories }) => ({
    name,
    id,
    categories,
    isExpanded: false,
  }));

  data.categories = productToKey(response);
});

provide("handleIndividual", handleIndividual);
provide("values", values);
provide("checkedArr", checkedArr);
</script>

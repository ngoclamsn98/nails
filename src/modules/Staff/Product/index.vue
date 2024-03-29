<template>
  <Header
    :isBack="true"
    title="Buy Product"
  >
    <template v-slot:content>
      <form>
        <div class="shadow-custom p-3 rounded w-[95%] m-auto mt-[5px] overflow-y-scroll max-h-[300px]">
          <div
            class="flex border-b border-gray-200 py-[10px] text-[14px] items-center gap-x-2"
            v-for="(item,index) in data.products"
            :key="index"
          >
            <span class="flex break-words w-[40%]">
              <CheckBox
                class="!w-[20px]"
                :name="`products.${index}.selected`"
                :sub="{name: `products.${index}.id`, value:item.id }"
              />
              {{ item.name }}
            </span>
            <span class="flex break-words w-[30%] ">{{ numberWithCommas(item.price) }} VNĐ</span>
            <span class="flex break-words w-[20%]">
              <InputQuantity :name="`products.${index}.qty`" />
            </span>
          </div>
        </div>
      </form>
      <button @click="handleSubmitForm">aa</button>
    </template>
  </Header>
</template>

<script setup>
import Header from "@/components/Header";
import CheckBox from "@/components/CheckBox";
import InputQuantity from "@/components/InputQuantity";
import { numberWithCommas } from "@/utils/number";
import { reactive } from "vue";
import { useForm } from "vee-validate";

const data = reactive({
  products: new Array(6).fill(0).map((_, index) => ({
    name: "sữa ông thọ, dành cho người lớn tuổi, nhưng ai uống cũng được",
    id: index + 1,
    quantity: 1,
    price: 2000000,
  })),
});

const { handleSubmit } = useForm({
  // validationSchema: validationSchema,
});

const handleSubmitForm = handleSubmit((values) => {
  console.log(values);
});
</script>
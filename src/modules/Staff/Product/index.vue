<template>
  <Header
    :isBack="true"
    title="Buy Product"
  >
    <template v-slot:content>
      <Product />
    </template>
  </Header>
</template>

<script setup>
import Header from "@/components/Header";
import Product from "@/components/Product";
import { provide } from "vue";
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

provide("data", data);
provide("handleSubmitForm", handleSubmitForm);
</script>
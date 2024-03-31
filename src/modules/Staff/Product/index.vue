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
import { updateQuantity } from "@/utils/array";
import { provide } from "vue";
import { reactive } from "vue";
import { useForm } from "vee-validate";

const data = reactive({
  products: [],
});

const { handleSubmit, values } = useForm({
  // validationSchema: validationSchema,
});

const handleSubmitForm = handleSubmit((values) => {
  console.log(values);
});

const handleUpdateQuantityProduct = () => {
  data.products = updateQuantity(values.products, data.products);
};

const handleAddProduct = (product) => {
  data.products = [...data.products, product];
};

provide("data", data);
provide("handleSubmitForm", handleSubmitForm);
provide("handleUpdateQuantityProduct", handleUpdateQuantityProduct);
provide("handleAddProduct", handleAddProduct);
</script>
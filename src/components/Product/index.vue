<template>
  <ProductList />
  <ActionProduct />
  <SwipeProduct />
</template>

<script setup>
import ProductList from "@/components/ProductList";
import ActionProduct from "@/components/ActionProduct";
import SwipeProduct from "@/components/SwipeProduct";

import { updateQuantity } from "@/utils/array";
import { reactive, provide } from "vue";
import { useForm } from "vee-validate";

import { useNotification } from "vue-modern-notification";
const toast = useNotification();

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
  if (!data.products.find((p) => p.id === product.id)) {
    data.products = [...data.products, product];
    toast.success({
      title: "Thêm mới sản phẩm thành công",
    });
  }
};

provide("data", data);
provide("handleSubmitForm", handleSubmitForm);
provide("handleUpdateQuantityProduct", handleUpdateQuantityProduct);
provide("handleAddProduct", handleAddProduct);
</script>

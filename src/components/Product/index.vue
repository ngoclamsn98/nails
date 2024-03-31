<template>
  <ProductList />
  <ActionProduct :isDeleteBtn="handleShowDeleteBtn(values.products)" />
  <SwipeProduct />
</template>

<script setup>
import ProductList from "@/components/ProductList";
import ActionProduct from "@/components/ActionProduct";
import SwipeProduct from "@/components/SwipeProduct";

import {
  updateQuantity,
  handleShowDeleteBtn,
  deleteProduct,
} from "@/utils/array";
import { reactive, provide, getCurrentInstance } from "vue";
import { useForm } from "vee-validate";
import { notify } from "vue-modern-notification";

const instance = getCurrentInstance();
const app = instance.appContext.app;

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
    notify({
      color: "primary",
      title: "Thêm mới sản phẩm thành công",
      square: false,
      position: "top-right",
      duration: 1000,
      border: "primary",
      width: "70%",
    });
  }
};

const handleDeleteProduct = () => {
  app.$confirm({
    title: "Bạn có muốn xóa những sản phẩm đã chọn ?",
    button: {
      yes: "Ok",
      no: "No",
    },
    callback: (confirm) => {
      if (confirm) {
        data.products = deleteProduct(values.products, data.products);
        notify({
          color: "primary",
          title: "Xóa sản phẩm thành công",
          square: false,
          position: "top-right",
          duration: 1000,
          border: "primary",
          width: "70%",
        });
      }
    },
  });
};

provide("data", data);
provide("handleSubmitForm", handleSubmitForm);
provide("handleUpdateQuantityProduct", handleUpdateQuantityProduct);
provide("handleAddProduct", handleAddProduct);
provide("handleDeleteProduct", handleDeleteProduct);
</script>

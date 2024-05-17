<template>
  <Header
    :isBack="true"
    title="Import Product"
  >
    <template v-slot:content>
      <Product />
    </template>
  </Header>
</template>
  
<script setup>
import Header from "@/components/Header";
import Product from "@/components/Product";

import { TYPE_PAGE } from "@/constants";
import { useForm } from "vee-validate";
import { provide } from "vue";

const { handleSubmit, values } = useForm({});

provide("typePage", TYPE_PAGE.IMPORT_PRODUCT);
provide("handleSubmit", handleSubmit);
provide("values", values);
</script>
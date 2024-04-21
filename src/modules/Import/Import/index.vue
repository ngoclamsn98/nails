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

import { provide } from "vue";
import { TYPE_PAGE } from "@/constants";

provide("typePage", TYPE_PAGE.IMPORT_PRODUCT);
</script>
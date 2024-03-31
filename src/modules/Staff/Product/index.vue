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
</script>
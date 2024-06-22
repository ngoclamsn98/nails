<template>
  <div class="flex gap-x-[10px] w-full fixed bottom-0 h-[60px] py-[20px] items-center justify-center bg-content">
    <div class="w-[90%] flex gap-x-[10px]">
      <Button
        class="h-[40px]"
        :class="width"
        @click="handleSubmitForm"
        v-if="data.products.length"
      >
        <template v-slot:text>Submit</template>
      </Button>
      <SwipeProduct :width="width" />
    </div>
  </div>
</template>

<script setup>
import Button from "@/components/Button";
import SwipeProduct from "@/components/SwipeProduct";
import { inject } from "vue";

const handleSubmitForm = inject("handleSubmitForm");
const data = inject("data");

const activeItem = [data.products.length, true].filter(
  (active) => active
).length;
const width =
  activeItem === 1 ? "w-full" : activeItem === 2 ? "w-1/2" : "w-1/3";
</script>
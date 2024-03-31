<template>
  <div
    class="flex gap-x-[10px] mt-[20px] pl-[5px]"
    v-if="data.products.length"
  >
    <Button
      class="bg-red w-[100px] h-[40px]"
      @click="handleDeleteProduct"
      v-if="isDeleteBtn"
    >
      <template v-slot:text>Xóa</template>
    </Button>
    <Button
      class="w-[150px] h-[40px]"
      @click="handleSubmitForm"
    >
      <template v-slot:text>Submit</template>
    </Button>
  </div>
</template>

<script setup>
import Button from "@/components/Button";
import { inject } from "vue";
defineProps({
  isDeleteBtn: { type: Boolean, default: false },
});

const handleSubmitForm = inject("handleSubmitForm");
const handleDeleteProduct = inject("handleDeleteProduct");
const data = inject("data");
</script>
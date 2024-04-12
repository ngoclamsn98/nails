<template>
  <Header
    :isBack="true"
    title="Home"
    redirect="/store"
  >
    <template v-slot:content>
      <div class="flex flex-col w-[90%] m-auto gap-y-[10px] justify-center h-full">
        <RouterLink
          v-for="page in pages"
          :key="page.link"
          :to="page.link"
        >
          <div
            class="shadow-custom rounded-lg h-[200px] flex justify-center items-center text-[26px] border border-gray-300"
            v-wave="{ color: 'blue' }"
          >
            {{ page.label }}
          </div>
        </RouterLink>
      </div>
    </template>
  </Header>

</template>

<script setup>
import Header from "@/components/Header";
import { ref } from "vue";

const pages = ref([
  { label: "Bill Order", link: "/staff/bill-order" },
  { label: "Buy Product", link: "/staff/product" },
]);
</script>
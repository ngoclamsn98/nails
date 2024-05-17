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
              class="bg-button  text-white shadow-custom rounded-lg h-[200px] flex justify-center items-center text-[26px] border border-gray-300"
              v-wave="{ color: 'blue' }"
              v-if="page.roles.includes(userData.permission)"
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
import { STORAGE_KEY } from "@/constants";
import { PERMISSION } from "@/constants/role";
import storageUtils from "@/utils/storageUtils";
import { ref } from "vue";
  const userData = storageUtils.get(STORAGE_KEY.USER_DETAIL);
  const pages = ref([
    {
      label: "Bill Order",
      link: "/staff/bill-order",
      roles: [PERMISSION.MANAGER, PERMISSION.NAILER],
    },
    {
      label: "Import Product",
      link: "/import/import-product",
      roles: [PERMISSION.MANAGER, PERMISSION.STOCKER],
    },
    {
      label: "Buy Product",
      link: "/buy-product",
      roles: [PERMISSION.MANAGER, PERMISSION.STOCKER,PERMISSION.NAILER],
    },
  ]);
</script>
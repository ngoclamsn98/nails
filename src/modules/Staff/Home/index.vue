<template>
   <Header :isBack="true" title="Home">
    <template  v-slot:content>
      <div class="flex flex-col w-[90%] m-auto gap-y-[10px] justify-center h-full">
      <RouterLink to="/staff/bill-order">
        <div class="card-shadow h-[200px] flex justify-center items-center text-[26px]">
          Bill Order
        </div>
      </RouterLink>
      <RouterLink to="/bill-order">
        <div class="card-shadow h-[200px] flex justify-center items-center text-[26px]">
          Product
        </div>
      </RouterLink>
    </div>
    </template>
  </Header>
  
</template>

<script setup>
import Header from "@/components/Header";
</script>
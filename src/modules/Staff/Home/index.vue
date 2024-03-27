<template>
  <Header
    :isBack="true"
    title="Home"
  >
    <template v-slot:content>
      <div class="flex flex-col w-[90%] m-auto gap-y-[10px] justify-center h-full">
        <RouterLink to="/staff/bill-order">
          <div class="shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-sm h-[200px] flex justify-center items-center text-[26px]">
            Bill Order
          </div>
        </RouterLink>
        <RouterLink to="/bill-order">
          <div class="shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-sm h-[200px] flex justify-center items-center text-[26px]">
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
<template>
  <form>
    <div class="shadow-custom p-3 rounded w-[95%] m-auto mt-[5px] overflow-y-scroll max-h-[500px]">
      <div
        class="flex border-b border-gray-200 py-[10px] text-[14px] items-center gap-x-2"
        v-for="(item,index) in data.products"
        :key="index"
      >
        <span class="flex break-words w-[40%]">
          <CheckBox
            class="!w-[20px]"
            :name="`products.${index}.selected`"
            :sub="{name: `products.${index}.id`, value:item.id }"
          />
          {{ item.name }}
        </span>
        <span class="flex break-words w-[30%]">{{ numberWithCommas(item.price * item.quantity) }} VNĐ</span>
        <span class="flex break-words w-[20%]">
          <InputQuantity
            :name="`products.${index}.quantity`"
            @changeQuantity="handleSetDataProduct"
          />
        </span>
      </div>
    </div>
  </form>
</template>

<script setup>
import CheckBox from "@/components/CheckBox";
import InputQuantity from "@/components/InputQuantity";
import { numberWithCommas } from "@/utils/number";
import { inject } from "vue";

const data = inject("data");
const handleSetDataProduct = inject("handleSetDataProduct");
</script>

<template>
  <div
    class="shadow-custom rounded w-[90%] mx-auto mt-[5px] overflow-y-scroll max-h-[500px]"
    v-if="data.products.length"
  >
    <div class="flex flex-col p-3">
      <div
        class="flex border-b border-gray-200 py-[10px] text-[14px] items-center gap-x-2"
        v-for="(item,index) in data.products"
        :key="index"
      >
        <span class="flex break-words w-[40%] items-center gap-x-[10px]">
          <span
            class="w-[24px] h-[24px]"
            @click="handleDeleteProduct(item.id)"
          >
            <Delete />
          </span>
          <CheckBox
            class="!w-[30px] mt-[3px] hidden"
            :name="`products.${index}.selected`"
            :checkedValue="item.id"
          />
          <span class="flex items-start flex-1">{{ item.nameApp }}</span>
        </span>
        <span
          class="flex break-words w-[30%]"
          v-if="productType"
        >{{ numberWithCommas(item.salesPrice * item.quantity) }} VNĐ</span>
        <span class="flex break-words flex-1 justify-end">
          <InputQuantity
            :name="`products.${index}.quantity`"
            @changeQuantity="handleUpdateQuantityProduct(item.id)"
          />
          <InputHidden
            :name="`products.${index}.id`"
            :defaultValue="item.id"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import CheckBox from "@/components/CheckBox";
import Delete from "@/components/Icon/Delete";
import InputHidden from "@/components/InputHidden";
import InputQuantity from "@/components/InputQuantity";
import { TYPE_PAGE } from "@/constants";
import { numberWithCommas } from "@/utils/number";
import { inject } from "vue";

const data = inject("data");

const productType = inject("typePage") === TYPE_PAGE.SALES_PRODUCT;
const handleUpdateQuantityProduct = inject("handleUpdateQuantityProduct");
const handleDeleteProduct = inject("handleDeleteProduct");
</script>

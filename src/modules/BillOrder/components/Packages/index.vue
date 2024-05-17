<template>
  <div
    v-for="(collapse, index) in collapses"
    :key="collapse.title"
    class="border-b w-full border-gray-200"
  >
    <div
      :id="'toggle_' + index"
      @click="handleIndividual(index)"
      :class="['Panel', { Active: collapse.isExpanded }]"
      :aria-expanded="collapse.isExpanded ? 'true' : 'false'"
      :aria-controls="'collapse_' + index"
      class="w-[90%] m-auto flex justify-start py-[5px] font-bold text-[17px]"
    >
      {{ collapse.name }}
    </div>
    <Collapse
      :when="collapse.isExpanded"
      :id="'collapse_' + index"
      role="region"
      class="CollapseContent w-[80%] m-auto"
    >
      <div
        v-for="(category, categoryIndex) in collapse.categories"
        :key="category.id"
        class="flex flex-col"
      >
        <CheckBox
          :label="category.nameApp"
          :name="`packages.${index}.categories.${categoryIndex}.id`"
          :checkedValue="category.id"
          :disabled="true"
        />
        <InputHidden
          :name="`packages.${index}.id`"
          :defaultValue="collapse.id"
        />
        <ul class="ml-[30px] flex flex-col mt-[5px]">
          <li
            v-for="(product, position) in category.products"
            :key="product.id"
            class="mb-[10px]"
          >
            <CheckBox
              :label="product.nameApp"
              :name="`packages.${index}.categories.${categoryIndex}.products.${position}.id`"
              :checkedValue="product.id"
            />
            <div
              class="flex justify-end text-[13px]"
              v-if="product.salesPrice"
            >{{numberWithCommas(product.salesPrice) }} vnđ
              <InputCategory
                :name="`packages.${index}.categories.${categoryIndex}.products.${position}.price`"
                class="hidden"
                :defaultValue="product.salesPrice"
              />
            </div>
            <div
              v-else
              class="flex w-full justify-end"
            >
              <InputCategory
                :name="`packages.${index}.categories.${categoryIndex}.products.${position}.price`"
                :disabled="!checkedArr.includes(product.id)"
              />
            </div>
          </li>
        </ul>
      </div>
    </Collapse>
  </div>
</template>
    
<script setup>
import CheckBox from "@/components/CheckBox";
import InputCategory from "@/components/InputCategory";
import InputHidden from "@/components/InputHidden";
import { numberWithCommas } from "@/utils/number";
import { inject } from "vue";
import { Collapse } from "vue-collapsed";

const handleIndividual = inject("handleIndividual");
const checkedArr = inject("checkedArr") || [];

const { collapses } = defineProps({
  collapses: { type: Array, default: [] },
});
</script>
<template>
  <div
    v-for="(collapse, index) in collapses"
    :key="collapse.title"
    class="border-b w-full border-gray-400"
  >
    <div
      :id="'toggle_' + index"
      @click="handleIndividual(index)"
      :class="['Panel', { Active: collapse.isExpanded }]"
      :aria-expanded="collapse.isExpanded ? 'true' : 'false'"
      :aria-controls="'collapse_' + index"
      class="w-[90%] m-auto flex justify-start py-[5px]"
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
          :label="category.name"
          :name="`packages.${index}.categories.${categoryIndex}.id`"
          :checkedValue="category.id"
          :disabled="true"
        />
        <ul class="ml-[30px] flex flex-col mt-[5px]">
          <li
            v-for="(product, position) in category.products"
            :key="product.id"
            class="mb-[10px]"
          >
            <CheckBox
              :label="product.name"
              :name="`packages.${index}.categories.${categoryIndex}.products.${position}.id`"
              :checkedValue="product.id"
            />
            <div
              class="flex justify-end text-[13px]"
              v-if="product.price"
            >{{numberWithCommas(product.price) }} vnđ
              <InputCategory
                :name="`packages.${index}.categories.${categoryIndex}.products.${position}.price`"
                class="hidden"
                :defaultValue="product.price"
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
import { reactive, inject } from "vue";
import { Collapse } from "vue-collapsed";
import InputCategory from "@/components/InputCategory";
import { numberWithCommas } from "@/utils/number";
import { useFieldValue } from "vee-validate";

const handleIndividual = inject("handleIndividual");
const checkedArr = inject("checkedArr") || [];

const classes = reactive({ input: "" });

const { collapses } = defineProps({
  collapses: { type: Array, default: [] },
});
</script>
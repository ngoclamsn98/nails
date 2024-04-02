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
      <CheckBox
        :label="collapse.title"
        :name="`packages.${index}.selected`"
        :sub="{name: `packages.${index}.id`, value:collapse.id }"
        :disabled="true"
      />
    </div>
    <Collapse
      :when="collapse.isExpanded"
      :id="'collapse_' + index"
      role="region"
      class="CollapseContent  w-[80%] m-auto"
    >
      <ul class="ml-[10px] flex flex-col mt-[5px]">
        <li
          v-for="(item, position) in collapse.products"
          :key="item.id"
          class="mb-[10px]"
        >
          <CheckBox
            :label="item.name"
            :name="`packages.${index}.products.${position}.selected`"
            :sub="{name: `packages.${index}.products.${position}.id`, value:item.id }"
          />
        </li>
      </ul>
    </Collapse>
  </div>
</template>
    
<script setup>
import CheckBox from "@/components/CheckBox";
import { ref } from "vue";
import { Collapse } from "vue-collapsed";

const packages = [
  {
    title: "Tóc",
    id: 1,
    products: [
      { name: "Nhuộm", id: 3 },
      { name: "Uốn", id: 4 },
    ],
  },
  {
    title: "Nails",
    id: 2,
    products: [
      { name: "làm móng tay", id: 1 },
      { name: "làm móng chân", id: 2 },
      { name: "sơn móng", id: 3 },
    ],
  },
];

const collapses = ref(
  packages.map(({ title, products, id }) => ({
    id,
    title,
    products,
    isExpanded: false,
  }))
);

function handleIndividual(selectedIndex) {
  collapses.value[selectedIndex].isExpanded =
    !collapses.value[selectedIndex].isExpanded;
}
</script>
<template>
  <div
    v-for="(question, index) in questions"
    :key="question.title"
    class="border-b w-full border-gray"
  >
    <div
      :id="'toggle_' + index"
      @click="handleIndividual(index)"
      :class="['Panel', { Active: question.isExpanded }]"
      :aria-expanded="question.isExpanded ? 'true' : 'false'"
      :aria-controls="'collapse_' + index"
      class="w-[90%] m-auto flex justify-start py-[5px]"
    >
      <CheckBox
        :label="question.title"
        :name="`packages[${index}].id`"
      />
    </div>
    <Collapse
      :when="question.isExpanded"
      :id="'collapse_' + index"
      role="region"
      class="CollapseContent  w-[80%] m-auto"
    >
      <ul class="ml-[10px] flex flex-col mt-[5px]">
        <li
          v-for="item in question.products"
          :key="item.id"
          class="mb-[10px]"
        >
          <CheckBox
            :label="item.name"
            :name="`products[${index}].id`"
          />
        </li>
      </ul>
    </Collapse>
  </div>
</template>
    
<script setup>
import { ref } from "vue";
import { Collapse } from "vue-collapsed";
import CheckBox from "@/components/CheckBox";

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
    ],
  },
];

const questions = ref(
  packages.map(({ title, products }) => ({
    title,
    products,
    isExpanded: false,
  }))
);

function handleIndividual(selectedIndex) {
  questions.value[selectedIndex].isExpanded =
    !questions.value[selectedIndex].isExpanded;
}
</script>
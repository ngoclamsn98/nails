<template>
  <div class="flex gap-x-1 items-center">
    <span @click="updateQty('minus')">－</span>
    <input
      v-model="numericValue"
      :data-focus="name"
      :name="name"
      type="text"
      class="w-[60px] text-[14px] border rounded-[5px] border-gray-200 focus-visible:border-[1px] focus-visible:outline-0 focus-visible:border-blue-500  transition duration-500 placeholder-gray-200 focus:outline-0 focus-within:outline-0"
    />
    <span @click="updateQty('plus')">＋</span>
  </div>
</template>

<script setup>
import { numberWithCommas } from "@/utils/number";
import { useField } from "vee-validate";
import { ref, watch, defineEmits } from "vue";

const props = defineProps({
  name: { type: String, required: true },
});

const emit = defineEmits(["changeQuantity"]);

const { value } = useField(() => props.name);

const numericValue = ref(value.value || 1);

watch(numericValue, (newValue) => {
  if (!newValue) {
    numericValue.value = 0;
    value.value = 0;
  } else {
    numericValue.value = newValue.toString().replace(/[^\d]/g, "");
    numericValue.value = numberWithCommas(+numericValue.value);
    value.value = numericValue.value.split(",").join("");
  }
  emit("changeQuantity");
});

const updateQty = (type) => {
  if (numericValue.value.toString().includes(",")) {
    numericValue.value = numericValue.value.split(",").join("");
  }
  if (type === "minus") {
    numericValue.value =
      numericValue.value - 1 <= 0 ? 0 : numericValue.value - 1;
    value.value = numericValue.value;
  } else {
    numericValue.value = +numericValue.value + 1;
    value.value = numericValue.value;
  }
};
</script>

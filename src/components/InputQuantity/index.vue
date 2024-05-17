<template>
  <div class="flex gap-x-1 items-center">
    <span @click="updateQty('minus')">－</span>
    <input
      v-model="numericValue"
      :data-focus="name"
      :name="name"
      :disabled="disabled"
      :ariaDisabled="disabled"
      @blur="onBlur"
      type="text"
      class="h-[30px] w-[60px] text-[14px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 focus-visible:ring-blue-500 outline-none focus-visible:ring-1 disabled:bg-gray-100"
    />
    <span @click="updateQty('plus')">＋</span>
  </div>
</template>

<script setup>
import { numberWithCommas } from "@/utils/number";
import { useField } from "vee-validate";
import { defineEmits, ref, watch } from "vue";
import { MAX_LENGTH } from "@/constants";

const props = defineProps({
  name: { type: String, required: true },
  disabled: { type: Boolean, default: false },
  onBlur: { type: Function, required: false },
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

    if (numericValue.value.length >= MAX_LENGTH) {
      numericValue.value = numericValue.value.slice(0, MAX_LENGTH);
    }

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
      numericValue.value - 1 <= 1 ? 1 : numericValue.value - 1;
    value.value = numericValue.value;
  } else {
    numericValue.value = +numericValue.value + 1;
    value.value = numericValue.value;
  }
};
</script>

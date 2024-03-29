<template>
  <div class="flex gap-x-[5px]">
    <label
      :for="name"
      v-if="label"
    >{{ label }}</label>
    <select
      :name="name"
      v-model="selectedValue"
      class="h-[30px] rounded-[10px] px-[5px]"
    >
      <option
        v-for="(option, index) in paymentTypes"
        :key="index"
        :value="option.value"
      >{{ option.label }}</option>
    </select>
    <span> {{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
import { ref, watch } from "vue";
import { paymentTypes } from "@/constants";
const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, required: false },
});

const { value, errorMessage } = useField(() => props.name);

const selectedValue = ref(value.value || 1);

watch(selectedValue, (newValue) => {
  value.value = newValue;
});
</script>

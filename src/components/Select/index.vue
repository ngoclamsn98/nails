<template>
  <div class="flex gap-x-[5px]">
    <label
      :for="label"
      v-if="label"
    >{{ label }}</label>
    <select
      :name="name"
      v-model="value"
      class="h-[30px] rounded-[10px] w-full px-[10px]"
    >
      <option
        v-for="(option,index) in options"
        :key="index"
        :value="option.value"
      >{{ option.label }}</option>
    </select>
    <span> {{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, required: false },
  options: { type: Array, default: [] },
});

const { value, errorMessage } = useField(() => props.name);
</script>
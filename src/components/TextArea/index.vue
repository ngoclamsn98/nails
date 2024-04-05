<template>
  <div class="flex flex-col gap-y-[2px] w-full mt-[18px]">
    <div class="flex gap-x-[10px] items-start">
      <span
        class="inline-flex h-[80px] items-center"
        :class="classes.label"
      >{{ label }}</span>
      <div class="flex flex-col gap-y-[5px] h-[98px] flex-1 ">
        <textarea
          v-model="value"
          :type="type"
          :placeholder="placeholder"
          :data-focus="name"
          :disabled="disabled"
          :ariaDisabled="disabled"
          class="border h-[80px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus-visible:ring-blue-500 outline-none focus-visible:ring-1 disabled:bg-gray-100"
        />
        <span class="text-red text-[13px]">{{ errorMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
const props = defineProps({
  name: { type: String, required: true },
  type: { type: String, required: false, default: "text" },
  placeholder: { type: String, required: false },
  label: { type: String, required: false },
  classes: { type: Object, default: {} },
  disabled: { type: Boolean, default: false },
});

const { value, errorMessage } = useField(() => props.name);
</script>

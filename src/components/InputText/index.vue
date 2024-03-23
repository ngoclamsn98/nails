<template>
  <div class="flex flex-col gap-y-[2px] h-[70px] w-full">
    <div class="flex gap-x-[10px] items-center">
      <span>{{ label }}</span>
      <input
        v-model="value"
        :type="type"
        :placeholder="placeholder"
        :data-focus="name"
        class="h-[45px] border rounded-[20px] pl-[20px] flex-1 border-white focus-visible:border-[1px] focus-visible:outline-0 focus-visible:border-blue-500  transition duration-500 placeholder-gray-200"
      />
    </div>
    <span class="text-red text-[13px] ml-[15px]">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
const props = defineProps({
  name: { type: String, required: true },
  type: { type: String, required: false, default: "text" },
  placeholder: { type: String, required: false },
  label: { type: String, required: false },
});

const { value, errorMessage } = useField(() => props.name);
</script>

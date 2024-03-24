<template>
  <div class="flex flex-col gap-y-[2px] w-full">
    <div class="flex gap-x-[10px] items-center">
      <input
        v-if="!value"
        v-model="value"
        type="checkbox"
        :data-focus="name"
        class="w-[20px] h-[20px]"
      />
      <span
        class="w-[20px] h-[20px] inline-block"
        @click="value = false"
        v-if="value"
      >
        <CheckBox />
      </span>
      <span @click="value = !value">{{ label }}</span>
    </div>
  </div>
</template>
  
<script setup>
import CheckBox from "@/components/Icon/CheckBox";
import { useField } from "vee-validate";
const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, required: false },
});

const { value } = useField(() => props.name);
</script>
  
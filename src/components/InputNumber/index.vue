<template>
  <div class="flex flex-col gap-y-[2px] h-[60px] w-full">
    <div class="flex gap-x-[10px] items-center">
      <span>{{ label }}</span>
      <input
        v-model="numericValue"
        :placeholder="placeholder"
        :data-focus="name"
        class="h-[45px] border rounded-[20px] pl-[20px] flex-1 border-gray-200 focus-visible:border-[1px] focus-visible:outline-0 focus-visible:border-blue-500  transition duration-500 placeholder-gray-200 focus:outline-0 focus-within:outline-0"
      />
    </div>
    <span class="text-red text-[13px] ml-[15px] inline-block">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { numberWithCommas } from '@/utils/number';
import { useField } from "vee-validate";
import { ref, watch } from "vue";

const props = defineProps({
  name: { type: String, required: true },
  placeholder: { type: String, required: false },
  label: { type: String, required: false },
});

const { value, errorMessage } = useField(() => props.name);

const numericValue = ref(value.value);

watch(numericValue, (newValue) => {
  numericValue.value = newValue.replace(/\D/, "");
  numericValue.value = numberWithCommas(newValue);
  if (!isNaN(numericValue.value)) value.value = +numericValue.value;
});
</script>

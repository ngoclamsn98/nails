<template>
  <div class="flex flex-col gap-y-[2px] w-[70%]">
    <div class="flex gap-x-[10px] items-start">
      <span class="inline-flex h-[30px] items-center">{{ label }}</span>
      <div class="flex flex-col flex-1 ">
        <div class="relative">
          <input
            v-model="numericValue"
            :placeholder="placeholder"
            :data-focus="name"
            :name="name"
            :ariaDisabled="disabled"
            :disabled="disabled"
            @blur="onBlur"
            type="text"
            class="h-[30px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus-visible:ring-blue-500 outline-none focus-visible:ring-1 disabled:bg-gray-100"
          />
          <div
            class="absolute right-0 flex items-center rounded-r-lg text-[12px] border-l border-gray-300 h-full top-0 w-[30px] text-black justify-center"
            v-if="isMoney"
          >vnđ</div>
        </div>
        <span class="text-red text-[13px]">{{ errorMessage }}</span>
      </div>
    </div>

  </div>
</template>

<script setup>
import { numberWithCommas } from "@/utils/number";
import { useField } from "vee-validate";
import { onMounted, ref, watch } from "vue";
import { any } from "zod";
import { MAX_LENGTH } from "@/constants";

const props = defineProps({
  name: { type: String, required: true },
  placeholder: { type: String, required: false },
  label: { type: String, required: false },
  isMoney: { type: Boolean, default: true },
  onBlur: { type: Function, required: false },
  disabled: { type: Boolean, default: false },
  defaultValue: { type: any, required: false },
});

const { value, errorMessage } = useField(() => props.name);

const numericValue = ref(value.value);

watch(numericValue, (newValue) => {
  if (!newValue) {
    numericValue.value = 0;
    value.value = 0;
    return;
  }
  numericValue.value = newValue.toString().replace(/[^\d]/g, "");
  numericValue.value = numberWithCommas(+numericValue.value);

  if (numericValue.value.length >= MAX_LENGTH) {
    numericValue.value = numericValue.value.slice(0, MAX_LENGTH);
  }

  if (numericValue.value.toString().includes(",")) {
    value.value = +numericValue.value.split(",").join("");
  } else {
    value.value = +numericValue.value;
  }
});

onMounted(() => {
  if (props.defaultValue) {
    numericValue.value = numberWithCommas(+props.defaultValue);
    value.value = props.defaultValue;
  }
});
</script>

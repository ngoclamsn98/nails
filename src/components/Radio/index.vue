<template>
  <div class="flex flex-col gap-y-[2px] w-full">
    <div class="flex gap-x-[10px] items-center">
      <input
        v-if="!checked"
        class="w-[20px] h-[20px]"
        :disabled="disabled"
        :value="checkedValue"
        :checked="checked"
        :name="name"
        @change="handleChange"
        type="checkbox"
      />
      <span
        class="w-[20px] h-[20px] inline-block"
        @click="handleChange"
        v-if="checked"
      >
        <CheckBox />
      </span>
      <span @click="handleChecked">{{ label }}</span>
    </div>

  </div>
</template>
  
<script setup>
import CheckBox from "@/components/Icon/CheckBox";
import { useField } from "vee-validate";
const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, required: false },
  disabled: { type: Boolean, default: false },
  checkedValue: { type: String, required: false },
});

const { checked, handleChange } = useField(() => props.name, undefined, {
  type: "radio",
  checkedValue: props.checkedValue,
});

const handleChecked = () => {
  if (!props.disabled) {
    handleChange();
  }
};
</script>
  
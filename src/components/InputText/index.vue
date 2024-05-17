<template>
  <div class="flex flex-col gap-y-[2px] w-full mt-[18px]">
    <div class="flex gap-x-[10px] items-start">
      <span
        v-if="label"
        class="inline-flex h-[42px] items-center"
        :class="classes.label"
      >{{ label }}</span>
      <div class="flex flex-col h-[60px] flex-1 relative">
        <input
          v-model="value"
          :type="inputType"
          :placeholder="placeholder"
          :data-focus="name"
          :name="name"
          :autocomplete="autocomplete"
          :disabled="disabled"
          :ariaDisabled="disabled"
          class="h-[42px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus-visible:ring-blue-500 outline-none focus-visible:ring-1 disabled:bg-gray-100"
        />

        <span
          class="w-[20px] h-20px absolute top-[13px] right-[10px]"
          v-if="type === 'password'"
          @click="handleShowPassword"
        >
          <Eyes />
        </span>
        <span class="text-red text-[13px]">{{ errorMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";
import Eyes from "@/components/Icon/Eyes";
import { onMounted, ref } from "vue";

const inputType = ref();

const props = defineProps({
  name: { type: String, required: true },
  type: { type: String, required: false, default: "text" },
  placeholder: { type: String, required: false },
  label: { type: String, required: false },
  autocomplete: { type: String, default: "off" },
  classes: { type: Object, default: {} },
  disabled: { type: Boolean, default: false },
});

const { value, errorMessage } = useField(() => props.name);

onMounted(() => {
  inputType.value = props.type;
});

const handleShowPassword = () => {
  inputType.value = inputType.value === "password" ? "text" : "password";
};
</script>

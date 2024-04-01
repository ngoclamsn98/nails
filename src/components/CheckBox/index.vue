<template>
  <div class="flex flex-col gap-y-[2px] w-full">
    <div class="flex gap-x-[10px] items-center">
      <input
        v-if="!value"
        v-model="value"
        type="checkbox"
        :data-focus="name"
        :name="name"
        class="w-[20px] h-[20px]"
        :disabled="disabled"
      />
      <span
        class="w-[20px] h-[20px] inline-block"
        @click="value = false"
        v-if="value"
      >
        <CheckBox />
      </span>
      <span @click="handleChecked">{{ label }}</span>
    </div>
    <input
      v-if="sub"
      type="text"
      class="hidden"
      :name="sub.name"
      v-model="valueSub"
    >
  </div>
</template>
  
<script setup>
import CheckBox from "@/components/Icon/CheckBox";
import { useField } from "vee-validate";
import { onMounted } from "vue";
const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, required: false },
  disabled: {type: Boolean, default: false},
  sub: {
    type: Object,
    required: false,
  },
});

const { value } = useField(() => props.name);
const { value: valueSub } = useField(() => props?.sub?.name || "");

onMounted(() => {
  if (props.sub) {
    valueSub.value = props.sub.value;
  }
});

const handleChecked = () => {
  if (!props.disabled) {
    value.value = !value.value
  }
}

</script>
  
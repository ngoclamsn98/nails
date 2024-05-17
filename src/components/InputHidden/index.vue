<template>
  <input
    v-model="value"
    :type="type"
    class="hidden"
  />
</template>

<script setup>
import { useField } from "vee-validate";
import { onMounted } from "vue";
const props = defineProps({
  name: { type: String, required: true },
  type: { type: String, required: false, default: "text" },
  defaultValue: { type: String, required: false },
});

const { value } = useField(() => props.name);

onMounted(() => {
  value.value = props.defaultValue;
});
</script>

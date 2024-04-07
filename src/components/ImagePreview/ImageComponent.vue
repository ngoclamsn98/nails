<template>
  <img
    :src="src"
    class="w-full"
  />
  <!-- <button @click="onClose">testClick</button> -->
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
});

// const emit = defineEmits(["close"]);

// const onClose = () => {
//   emit("close");
// };
</script>

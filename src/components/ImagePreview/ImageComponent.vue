<template>
  <img
    :src="src"
    class="w-full"
  />
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
});
</script>

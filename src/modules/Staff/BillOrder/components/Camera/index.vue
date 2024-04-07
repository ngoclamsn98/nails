<template>
  <CameraAdvance v-if="!ios" />
  <CameraNormal v-else />
</template>

<script setup>
import CameraAdvance from "@/components/CameraAdvance";
import CameraNormal from "@/components/CameraNormal";
import { getIOSVersion } from "@/utils/system";
import { ref } from "vue";
const ios = ref(getIOSVersion());
</script>

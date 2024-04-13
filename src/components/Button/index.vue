<template>
  <button
    v-if="!store.state.loading.isLoading"
    v-wave="{ color: 'blue' }"
    class="flex gap-x-[5px] px-[10px] h-[45px] items-center rounded-lg border border-gray-200 min-w-[100px] justify-center bg-button text-white"
  >
    <slot name="startButton" />
    <slot name="text" />
    <slot name="endButton" />
  </button>
  <Loading v-else />
</template>

<script setup>
import Loading from "@/components/Loading";
import { useStore } from "vuex";

const store = useStore();
</script>
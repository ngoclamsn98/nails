<template>
  <button
    v-if="!store.state.loading.isLoading"
    v-wave="{ color: 'blue' }"
    class="flex gap-x-[5px] px-[10px] h-[50px] items-center rounded-2xl border border-gray-200 min-w-[150px] justify-center bg-purple text-white"
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
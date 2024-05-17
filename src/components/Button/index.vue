<template>
  <div
    class="w-full justify-center flex"
    v-if="store.state.loading.isLoading && isLoading"
  >
    <div class="w-[45px]">
      <Loading />
    </div>
  </div>
  <button
    v-else
    v-wave="{ color: 'blue' }"
    class="flex gap-x-[5px] px-[10px] h-[45px] items-center rounded-lg border border-gray-200 min-w-[100px] justify-center bg-button text-white"
  >
    <slot name="startButton" />
    <slot name="text" />
    <slot name="endButton" />
  </button>
</template>

<script setup>
import Loading from "@/components/Loading";
import { useStore } from "vuex";
defineProps({
  isLoading: {
    type: Boolean,
    default: true
  }
})
const store = useStore();
</script>
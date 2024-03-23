<template>
  <button
    v-if="!store.state.loading.isLoading"
    class="w-[50px] h-[50px] rounded-full bg-sky-600 flex justify-center items-center"
    type="submit"
  >
    <slot name="icon" />
  </button>
  <Loading v-else />
</template>

<script setup>
import Loading from "@/components/Loading";
import { useStore } from "vuex";

const store = useStore();
</script>
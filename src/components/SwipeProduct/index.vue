<template>
  <div class="fixed right-2 bottom-3">
    <ButtonIcon>
      <template v-slot:icon><span
          class="text-white text-[20px]"
          @click="isOpen = true"
        >＋</span></template>
    </ButtonIcon>
    <SwipeModal
      v-model="isOpen"
      snapPoint="300px"
      :is-full-screen="false"
    >
      <button @click="isOpen = false">Close modal</button>
      Modal content
    </SwipeModal>
  </div>
</template>

<script setup>
import { SwipeModal } from "@takuma-ru/vue-swipe-modal";
import ButtonIcon from "@/components/ButtonIcon";
import Button from "@/components/Button";
const isOpen = ref(false);
import { ref } from "vue";
</script>
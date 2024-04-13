<template>
  <div class="flex items-center justify-center pt-[10px] pb-[30px]">
    <span
      v-for="i in 5"
      :key="i"
      @click="activeStar(i)"
    >
      <Star :class="{ 'text-yellow': i<= star }" />
    </span>
  </div>
  <div class="flex w-full justify-center">
    <button
      @click="submitForm"
      v-wave="{ color: 'blue' }"
      class="flex gap-x-[5px] px-[10px] h-[45px] items-center rounded-2xl border border-gray-200 min-w-[100px] justify-center bg-button text-white"
    >
      Đánh giá
    </button>
  </div>
</template>

<script setup>
import Star from "@/components/Icon/Star";
import router from "@/routes";

import { ref } from "vue";
const props = defineProps({
  values: { type: Array, require: true },
});

const emit = defineEmits(["close"]);

const star = ref(0);

const activeStar = (value) => {
  star.value = value;
};

const submitForm = () => {
  emit("close");
  router.push("/staff/home");
};
</script>
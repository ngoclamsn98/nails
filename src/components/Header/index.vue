<template>
  <div class="bg-white h-[60px] m-auto flex justify-start top-0 items-center sticky max-w-[500px] w-full shadow-lg shadow-slate-900/20 shadow-b-2 shadow-r-[3px] -shadow-spread-2">
    <span
      @click="handleBack"
      v-if="isBack"
      v-wave="{ color: 'blue' }"
    >
      <ArrowPrevious />
    </span>
    <span class="flex flex-1 justify-center text-[26px]">{{ title }}</span>
  </div>
  <div class="h-full overflow-y-auto overflow-x-hidden mt-[20px]">
    <slot name="content" />
  </div>
</template>

<script setup>
import ArrowPrevious from "@/components/Icon/ArrowPrevious";
import router from "@/routes";
const props = defineProps({
  isBack: { type: Boolean, required: false, default: false },
  title: { type: String, default: "" },
  redirect: { type: String, required: false },
});

const handleBack = () => {
  if (!props.redirect) {
    return router.go(-1);
  }
  router.push(props.redirect);
};
</script>
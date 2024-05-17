<template>
  <div class="bg-header h-[60px] m-auto flex justify-start top-0 items-center sticky max-w-[500px] w-full shadow-lg shadow-slate-900/20 shadow-b-2 shadow-r-[3px] -shadow-spread-2">
    <span
      @click="handleBack"
      v-if="isBack"
      v-wave="{ color: 'blue' }"
    >
      <ArrowPrevious />
    </span>
    <slot name="headerContent" />
    <span
      class="flex flex-1 justify-center text-[26px] text-white"
      v-if="title"
    >{{ title }}</span>
    <span
      class="mr-4 font-bold text-white text-[15px] max-w-[200px] break-all"
      v-if="isShowStore"
    >{{ store }}</span>
  </div>
  <div class="h-[90%] overflow-y-auto overflow-x-hidden mt-[20px]">
    <slot name="content" />
  </div>
</template>

<script setup>
import ArrowPrevious from "@/components/Icon/ArrowPrevious";
import router from "@/routes";
import storageUtils from "@/utils/storageUtils";
import { onMounted, ref } from "vue";
import { STORAGE_KEY } from "@/constants";
const props = defineProps({
  isBack: { type: Boolean, required: false, default: false },
  title: { type: String, default: "" },
  redirect: { type: String, required: false },
  isShowStore: { type: Boolean, default: true },
});

const store = ref(null);

onMounted(() => {
  store.value = storageUtils.get(STORAGE_KEY.STORE_DETAIL)?.name;
});

const handleBack = () => {
  if (!props.redirect) {
    return router.go(-1);
  }
  router.push(props.redirect);
};
</script>
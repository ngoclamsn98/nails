<template>
  <div class="flex flex-col w-[90%] m-auto gap-y-[10px] justify-center h-full">
    <div
      class="shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-sm h-[70px] flex justify-center items-center text-[26px]"
      v-wave="{ color: 'blue' }"
      v-for="store in data.store"
      :key="store.value"
      @click="handleChooseStore(store)"
    >
      {{ store.name }}
    </div>
  </div>
</template>
<script setup>
import router from "@/routes";

import { STAFF } from "@/routes/path";
import storageUtils from "@/utils/storageUtils";

import { reactive } from "vue";
const data = reactive({
  store: [
    { name: "Store1", value: 1 },
    { name: "Store2", value: 2 },
  ],
});
const handleChooseStore = (store) => {
  router.push(STAFF.HOME);
  storageUtils.set({ key: "store", data: store });
};
</script>

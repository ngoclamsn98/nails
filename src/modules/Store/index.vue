<template>
  <Header :isShowStore="false">
    <template v-slot:headerContent>
      <div class="w-[90%] flex mx-auto items-center justify-between">
        <div class="font-bold text-[20px]">Staff name</div>
        <Button @click="handleLogout"><template v-slot:text>Logout</template></Button>
      </div>
    </template>
    <template v-slot:content>
      <div class="flex flex-col w-[90%] m-auto gap-y-[10px] justify-center h-full">
        <div
          class="rounded-lg h-[70px] flex justify-center items-center text-[26px] border border-gray-300 shadow-custom"
          v-wave="{ color: 'blue' }"
          v-for="store in data.store"
          :key="store.value"
          @click="handleChooseStore(store)"
        >
          {{ store.name }}
        </div>
      </div>
    </template>
  </Header>

</template>
<script setup>
import router from "@/routes";
import { STAFF, LOGIN } from "@/routes/path";
import storageUtils from "@/utils/storageUtils";
import Header from "@/components/Header";
import Button from "@/components/Button";
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

const handleLogout = () => {
  storageUtils.remove("store");
  storageUtils.remove("token");
  router.push(LOGIN);
};
</script>

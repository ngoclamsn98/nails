<template>
  <Header :isShowStore="false">
    <template v-slot:headerContent>
      <div class="w-[90%] flex mx-auto items-center justify-between">
        <div class="font-bold text-[20px] text-white">{{ staffName }}</div>
        <Button @click="handleLogout" :isLoading="false"><template v-slot:text>Logout</template></Button>
      </div>
    </template>
    <template v-slot:content>
      <div class="flex justify-center h-full items-center" v-if="store.state.loading.isLoading">
        <Loading />
      </div>
      <div
        class="flex flex-col w-[90%] m-auto gap-y-[10px] justify-center"
        :class="data.store.length >=9 ? 'h-auto' : 'h-full'"
        v-else
      >
        <div
          class="rounded-lg h-[70px] flex justify-center items-center text-[26px] border border-gray-300 shadow-custom bg-button text-white break-all"
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
import Button from "@/components/Button";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { handlerCallApi } from "@/config/interceptors";
import { STORAGE_KEY } from "@/constants";
import router from "@/routes";
import { HOME, LOGIN } from "@/routes/path";
import storageUtils from "@/utils/storageUtils";
import { onBeforeMount, reactive, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const staffName = ref(null);

const data = reactive({
  store: [],
});
const handleChooseStore = (store) => {
  storageUtils.set({
    key: STORAGE_KEY.STORE_DETAIL,
    data: store
  });
  return router.push(HOME)
};

const handleLogout = () => {
  storageUtils.remove(STORAGE_KEY.STORE_DETAIL);
  storageUtils.remove(STORAGE_KEY.TOKEN_DATA);
  storageUtils.remove(STORAGE_KEY.USER_DETAIL);

  router.push(LOGIN);
};

const handleGetMe = async () => {
  const userStore = storageUtils.get(STORAGE_KEY.USER_DETAIL);

  if (userStore) {
    staffName.value = userStore?.staffName;
  }
};

const handleGetStore = async () => {
  const userStore = storageUtils.get(STORAGE_KEY.USER_DETAIL);
  const stores = await handlerCallApi({
    method: "GET",
    url: `/store/list/${userStore.fcId}`,
  });
  data.store = stores;
};

onBeforeMount(async () => {
  await handleGetMe();
  await handleGetStore();
});
</script>

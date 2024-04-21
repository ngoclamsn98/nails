<template>
  <Header :isShowStore="false">
    <template v-slot:headerContent>
      <div class="w-[90%] flex mx-auto items-center justify-between">
        <div class="font-bold text-[20px] text-white">{{ staffName }}</div>
        <Button @click="handleLogout"><template v-slot:text>Logout</template></Button>
      </div>
    </template>
    <template v-slot:content>
      <div class="flex flex-col w-[90%] m-auto gap-y-[10px] justify-center h-full">
        <div
          class="rounded-lg h-[70px] flex justify-center items-center text-[26px] border border-gray-300 shadow-custom bg-button text-white"
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
import { STAFF, LOGIN, MANAGER_STORE } from "@/routes/path";
import storageUtils from "@/utils/storageUtils";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { onBeforeMount, reactive, ref } from "vue";
import { ROLES } from "@/constants/role";
import { STORAGE_KEY } from "@/constants";
import { handlerCallApi } from "@/config/interceptors";
import { useStore } from "vuex";

const store = useStore();
const staffName = ref(null);

const data = reactive({
  store: [],
});
const handleChooseStore = (store) => {
  const role = storageUtils.get(STORAGE_KEY.TOKEN_DATA)?.role;
  storageUtils.set({ key: STORAGE_KEY.STORE_DETAIL, data: store });

  switch (role) {
    case ROLES.STAFF:
      router.push(STAFF.HOME);
      break;
    case ROLES.STORE:
      router.push(STAFF.HOME);
      break;
    default:
      break;
  }
};

const handleLogout = () => {
  storageUtils.remove(STORAGE_KEY.STORE_DETAIL);
  storageUtils.remove(STORAGE_KEY.TOKEN_DATA);
  router.push(LOGIN);
};

const handleGetMe = async () => {
  const userStore = storageUtils.get(STORAGE_KEY.USER_DETAIL);

  if (userStore) {
    staffName.value = storageUtils.get(STORAGE_KEY.USER_DETAIL)?.staffName;
  }

  const user = await handlerCallApi({
    method: "GET",
    url: "/user/me",
  });
  const usersData = {
    staffName: `${user.firstName} ${user.lastName}`,
    role: user.role,
    storeId: user.store.id,
    fcId: user.store.franchise.id,
  };
  store.commit("user/setUser", {
    data: usersData,
  });
  staffName.value = usersData.staffName;
};

const handleGetStore = async () => {
  const storeList = storageUtils.get(STORAGE_KEY.STORE_LIST);
  if (storeList) {
    data.store = storageUtils.get(STORAGE_KEY.STORE_LIST) || [];
  }
  const userStore = storageUtils.get(STORAGE_KEY.USER_DETAIL);
  const stores = await handlerCallApi({
    method: "GET",
    url: `/store/list`,
    params: { id: userStore.fcId },
  });
  data.store = stores;
  storageUtils.set({ key: STORAGE_KEY.STORE_LIST, data: stores });
};

onBeforeMount(async () => {
  await handleGetMe();
  await handleGetStore();
});
</script>

<template>
  <div class="fixed right-6 bottom-6">
    <ButtonIcon>
      <template v-slot:icon><span
          class="text-white text-[20px]"
          @click="isOpen = true"
        >＋</span></template>
    </ButtonIcon>
    <SwipeModal
      v-model="isOpen"
      snapPoint="300px"
    >
      <div class="flex gap-x-[15px] mr-2 items-center">
        <InputText
          name="name"
          placeholder="Nhập mã sản phẩm"
        />
        <Button
          class="h-[35px]"
          @click="handleSearchProduct"
        ><template v-slot:text>Tìm</template></Button>
      </div>
      <div class="flex justify-center">
        <span @click="handleOpenQr">
          <QrCodeIcon />
        </span>
      </div>

    </SwipeModal>
  </div>
  <QrCode
    @qrData="getQrData"
    @closeQr="close"
    ref="qrCode"
    v-if="isOpenQr"
  />
</template>

<script setup>
import Button from "@/components/Button";
import ButtonIcon from "@/components/ButtonIcon";
import QrCodeIcon from "@/components/Icon/QrCode";
import InputText from "@/components/InputText";
import QrCode from "@/components/QrCode";
import useDisclosure from "@/hooks/useDisclosure";
import { SwipeModal } from "@takuma-ru/vue-swipe-modal";
import { inject, ref, getCurrentInstance } from "vue";
const instance = getCurrentInstance();
const app = instance.appContext.app;
const { open: openQr, close, isOpen: isOpenQr } = useDisclosure();
const handleAddProduct = inject("handleAddProduct");

const isOpen = ref(false);
const qrCode = ref();

const getQrData = (data) => {
  handleAddProduct(data);
  close();
};

const handleOpenQr = () => {
  isOpen.value = false;
  openQr();
};

const handleSearchProduct = () => {
  isOpen.value = false;

  // app.$confirm({
  //   title: "Thêm Bill thành công",
  //   button: {
  //     yes: "Ok",
  //   },
  //   callback: (confirm) => {
  //     // store.commit("user/authenticate", {
  //     //   token: values,
  //     // });
  //   },
  // });
};
</script>

<style scoped>
:deep(.modal-style) {
  background-color: #f7f2fa !important;
}
</style>
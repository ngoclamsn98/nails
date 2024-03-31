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
    >
      <div class="flex gap-x-[15px] mr-2 items-start">
        <InputText
          name="name"
          placeholder="Nhập mã sản phẩm"
        />
        <Button class="h-[35px] mt-[8px]"><template v-slot:text>Tìm</template></Button>
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
import { SwipeModal } from "@takuma-ru/vue-swipe-modal";
import ButtonIcon from "@/components/ButtonIcon";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import QrCode from "@/components/QrCode";
import QrCodeIcon from "@/components/Icon/QrCode";
import useDisclosure from "@/hooks/useDisclosure";
// import { inject } from "vue";
import { ref, inject } from "vue";
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
</script>

<style scoped>
:deep(.modal-style) {
  background-color: #f7f2fa !important;
}
</style>
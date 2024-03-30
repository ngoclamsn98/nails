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
      snapPoint="100%"
    >
      <div class="flex gap-x-[15px] mr-2 items-start">
        <InputText
          name="name"
          placeholder="Nhập mã sản phẩm"
        />
        <Button class="h-[35px] mt-[8px]"><template v-slot:text>Tìm</template></Button>
      </div>
      <QrCode
        @qrData="getQrData"
        @openQr="openQr"
      />
    </SwipeModal>
    {{ resultQr }}
  </div>
</template>

<script setup>
import { SwipeModal } from "@takuma-ru/vue-swipe-modal";
import ButtonIcon from "@/components/ButtonIcon";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import QrCode from "@/components/QrCode";
import { ref } from "vue";

const isOpen = ref(false);
const snapPoint = ref("300px");
const resultQr = ref(null);

const getQrData = (data) => {
  snapPoint.value = "300%";
  resultQr.value = data;
  isOpen.value = false;
};

const openQr = () => {
  console.log("aaa");
  snapPoint.value = "100%";
};
</script>
<template>
  <div
    class="flex"
    @click="open"
  >
    <QrCodeIcon />
  </div>
  <div
    class="absolute w-full h-full z-[111] top-0 left-0 bg-[#d1d5db]"
    v-if="isOpen"
  >
    <QrStream @decode="onDecode" />
  </div>
</template>

<script setup>
import QrCodeIcon from "@/components/Icon/QrCode";
import { QrStream } from "vue3-qr-reader";
import useDisclosure from "@/hooks/useDisclosure";

defineProps({
  isOpen: { type: Boolean, default: false },
});

const { open, close, isOpen } = useDisclosure();

const onDecode = (data) => {
  if (data) {
    close();
    emit("qrData", data);
  }
};
</script>
<template>
  <div class="flex justify-center">
    <span @click="openQr">
      <QrCodeIcon />
    </span>
  </div>
  <div
    class="absolute w-full h-full z-[112221] top-0 left-0 bg-[#d1d5db]"
    v-if="isOpen"
  >
    <!-- <QrStream @decode="onDecode" /> -->
  </div>
  <div id="qr-code-full-region"></div>
</template>

<script setup>
import QrCodeIcon from "@/components/Icon/QrCode";
// import { QrStream } from "vue3-qr-reader";
import useDisclosure from "@/hooks/useDisclosure";
import { onMounted } from "vue";

defineProps({
  isOpen: { type: Boolean, default: false },
});

const onScanSuccess = (decodedText, decodedResult) => {
  console.log("result", decodedText, decodedResult);
};

onMounted(() => {
  const config = {
    fps: 10,
    qrbox: 250,
  };
  const html5QrcodeScanner = new Html5QrcodeScanner(
    "qr-code-full-region",
    config
  );
  html5QrcodeScanner.render(onScanSuccess);
});
const emit = defineEmits(["qrData", "openQr"]);

const { open, close, isOpen } = useDisclosure();

const onDecode = (data) => {
  if (data) {
    close();
    emit("qrData", data);
  }
};

const openQr = () => {
  open();
  emit("openQr");
};
</script>
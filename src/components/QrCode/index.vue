<template>
  <div class="fixed w-full h-full z-[222222] top-0 left-0 bg-[#d1d5db]">
    <QrStream @decode="onDecode">
      <div class="absolute flex justify-center items-center w-full h-full">
        <QrIcon />
      </div>
      <div
        class="absolute top-5 right-5"
        @click="closeQr"
      >
        <CloseIcon />
      </div>
    </QrStream>
  </div>

  <div id="qr-code-full-region"></div>
</template>

<script setup>
import QrIcon from "@/components/Icon/QrIcon";
import CloseIcon from "@/components/Icon/Close";

import { QrStream } from "vue3-qr-reader";

defineProps({
  isOpen: { type: Boolean, default: false },
});

const emit = defineEmits(["qrData", "closeQr"]);

const onDecode = (data) => {
  const obj = JSON.parse(data) || {};
  if (
    !data ||
    typeof obj !== "object" ||
    !Object.keys(obj).some((key) => ["id", "price"].includes(key))
  )
    return;
  emit("qrData", JSON.parse(data));
};

const closeQr = () => {
  emit("closeQr");
};
</script>
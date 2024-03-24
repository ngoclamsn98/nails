<template>
  <div class="w-full h-[100px] mt-[20px]">
    <div class="w-[90%] m-auto flex items-start gap-x-[20px]">
      <div>Image</div>
      <div
        class="w-[50px] h-[50px]"
        @click="openCamera"
      >
        <CameraIcon />
      </div>
      <img
        ref="imageRef"
        class="w-[100px] h-[100px] bg-center object-cover"
      />
    </div>
  </div>
  <Camera
    :isOpen="isOpen"
    ref="cameraRef"
    @closeCamera="closeCamera"
  />
</template>
<script setup>
import { ref } from "vue";
import useDisclosure from "@/hooks/useDisclosure";
import Camera from "@/components/Camera";
import CameraIcon from "@/components/Icon/Camera";

const cameraRef = ref();
const imageRef = ref();

const { open, close, isOpen } = useDisclosure();

const openCamera = () => {
  open();
  cameraRef.value.cameraOff();
};

const closeCamera = (data) => {
  close();
  imageRef.value.src = data.srcImage;
};
</script>
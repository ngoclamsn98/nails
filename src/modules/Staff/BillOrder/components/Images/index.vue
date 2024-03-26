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
      <ImagePreview :src="imageRef.value.src" class="w-[100px] h-[100px] bg-center object-cover" v-if="imageRef"/>
    </div>
  </div>
  <Camera
    :isOpen="isOpen"
    ref="cameraRef"
    @closeCamera="closeCamera"
  />
</template>
<script setup>
import Camera from "@/components/Camera";
import CameraIcon from "@/components/Icon/Camera";
import ImagePreview from "@/components/ImagePreview";
import useDisclosure from "@/hooks/useDisclosure";
import { ref } from "vue";

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
  imageRef.value.file = data.imageBlob;
};
</script>
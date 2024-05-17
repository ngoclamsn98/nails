<template>
  <div class="w-full min-h-[100px] mt-[20px]">
    <div class="w-[90%] m-auto flex items-start gap-x-[20px] h-[100px]">
      <div>Image</div>
      <div class="w-[50px] h-[50px]">
        <span @click="openCamera">
          <CameraIcon />
        </span>
        <div
          v-show="isOpen"
          class="fixed top-0 left-0  w-full h-full flex justify-center items-center z-30 bg-black"
        >
          <canvas
            id="canvas"
            class="hidden"
          ></canvas>
          <camera
            :resolution="{ width: 1024, height: 768 }"
            ref="camera"
            :autoplay="false"
            class="w-full h-full"
          >
          </camera>
          <div
            class="absolute z-50 w-[50px] h-[50px] border-[2px] border-white flex justify-center bottom-2 rounded-full"
            @click="takePicture"
          ></div>
          <span
            class="absolute z-50 right-2 top-2 text-white"
            @click="closeCamera"
          >
            <Close />
          </span>
        </div>
      </div>
      <ImagePreview :src="imageSrc" />
    </div>
  </div>

</template>

<script>
import CameraIcon from "@/components/Icon/Camera";
import Close from "@/components/Icon/Close";
import useDisclosure from "@/hooks/useDisclosure";
import Camera from "simple-vue-camera";
import { defineComponent, inject, ref } from "vue";

import ImagePreview from "@/components/ImagePreview";

export default defineComponent({
  components: {
    Camera,
    CameraIcon,
    ImagePreview,
    Close,
  },
  setup() {
    const camera = ref(null);
    const cameraIsOn = ref(false);
    const imageSrc = ref(null);
    const { open, close, isOpen } = useDisclosure();
    const handleSetImage = inject("handleSetImage");

    const cameraToggle = () => {
      cameraIsOn.value ? camera.value.stop() : camera.value.start();
      cameraIsOn.value = !cameraIsOn.value;
    };

    const openCamera = () => {
      open();
      cameraToggle();
    };

    const closeCamera = () => {
      close();
      cameraToggle();
    };

    const takePicture = async () => {
      const imageBlob = await camera.value.snapshot(
        { width: 400, height: 500 },
        "image/jpg",
        0.3
      );

      const imageFile = new File([imageBlob], `${new Date().getTime()}.png`, { type: 'image/png' });

      handleSetImage(imageFile);

      const url = URL.createObjectURL(imageBlob);
      imageSrc.value = url;
      close();
      cameraToggle();
    };

    return {
      camera,
      cameraIsOn,
      takePicture,
      isOpen,
      close,
      openCamera,
      imageSrc,
      closeCamera,
    };
  },
});
</script>
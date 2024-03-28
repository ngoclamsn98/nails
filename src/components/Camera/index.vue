<template>
  <div
    class="absolute w-full h-full z-[111] top-0 left-0 bg-[#d1d5db]"
    v-show="isOpen"
  >
    <!-- <camera
      :resolution="{ width: 768, height: 1024 }"
      ref="camera"
      :autoplay="false"
      class="flex justify-center items-end"
    >
      <div class="absolute w-full h-[50px] bottom-[30px] flex justify-center">
        <div
          @click="takePicture"
          class="w-[50px] h-[50px] rounded-full border-2"
        ></div>
      </div>

    </camera> -->
    <input
      id="fileInput"
      ref="fileInputRef"
      type="file"
      accept="image/*"
      capture="environment"
      @change="onFileInputChange"
    />
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeCamera({ srcImage, imageBlob }) {
      this.$emit("closeCamera", { srcImage });
    },
  },
  setup() {
    const startButtonRef = ref(null);
    const fileInputRef = ref(null);
    const imageRef = ref(null);

    const onFileInputChange = () => {
      const fileInput = fileInputRef.value;
      const image = imageRef.value;
      if (!fileInput || !image) {
        throw new Error("Implementation error, reference is null");
      }
      if (!fileInput.value) {
        return;
      }
      const file = fileInput.files?.[0];
      if (!file) {
        throw new Error("Implementation error, reference is null");
      }
      data.capturedImageSrc = URL.createObjectURL(file);
      screenState.value = ScreenState.Captured;
    };
    const takePicture = () => {
      startButtonRef.value?.click();
    };

    return {
      camera,
      cameraOff,
      cameraIsOn,
      takePicture,
      send_file,
      onFileInputChange,
    };
  },
});
</script>

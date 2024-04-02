<template>
  <div class="w-full h-[100px] mt-[20px]">
    <div class="w-[90%] m-auto flex items-start gap-x-[20px] h-[62px]">
      <div>Image</div>
      <div class="w-[50px] h-[50px]">
        <label for="fileInput">
          <span ref="startButtonRef">
            <Camera />
          </span>
          <input
            id="fileInput"
            ref="fileInputRef"
            type="file"
            accept="image/*"
            capture="environment"
            @change="onFileInputChange"
            class="hidden"
          />
        </label>
      </div>
      <ImagePreview :src="data.capturedImageSrc" />
    </div>
    <canvas
      id="canvas"
      class="hidden"
    ></canvas>
  </div>
</template>

<script setup>
import Camera from "@/components/Icon/Camera";
import ImagePreview from "@/components/ImagePreview";
import { handleResizeFile } from "@/utils/resizeImage";

import { reactive, ref } from "vue";

const data = reactive({
  capturedImageSrc: undefined,
});

const startButtonRef = ref(null);
const fileInputRef = ref(null);

const onFileInputChange = () => {
  const fileInput = fileInputRef.value;
  if (!fileInput) {
    throw new Error("Implementation error, reference is null");
  }
  if (!fileInput.value) {
    return;
  }
  const file = fileInput.files?.[0];
  if (!file) {
    throw new Error("Implementation error, reference is null");
  }
  handleResizeFile(file).then((result) => {
    data.capturedImageSrc = result;
  });
};
</script>
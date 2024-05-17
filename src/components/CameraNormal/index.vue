<template>
  <div class="w-full min-h-[100px] mt-[20px]">
    <div class="w-[90%] m-auto flex items-start gap-x-[20px] h-[100px]">
      <div>Image</div>
      <div class="w-[50px] h-[50px]">
        <label for="fileInput">
          <Camera />
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

import { reactive, ref, inject } from "vue";

const data = reactive({
  capturedImageSrc: undefined,
});

const fileInputRef = ref(null);

const handleSetImage = inject("handleSetImage");

const onFileInputChange = () => {
  const fileInput = fileInputRef.value;
  if (!fileInput) {
    throw new Error("Lỗi máy ảnh");
  }
  if (!fileInput.value) {
    return;
  }
  const file = fileInput.files?.[0];
  if (!file) {
    throw new Error("Lỗi máy ảnh");
  }
  handleResizeFile(file).then((result) => {
    data.capturedImageSrc = result;
    handleSetImage(result);
  });
};
</script>
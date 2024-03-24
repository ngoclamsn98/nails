<template>
  <div
    class="absolute w-full h-full z-[111] top-0 left-0 bg-[#d1d5db]"
    v-show="isOpen"
  >
    <camera
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

    </camera>
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
    closeCamera(srcImage) {
      this.$emit("closeCamera", { srcImage });
    },
  },
  setup() {
    const camera = ref(null);
    const cameraIsOn = ref(false);

    const cameraOff = () => {
      cameraIsOn.value ? camera.value.stop() : camera.value.start();
      cameraIsOn.value = !cameraIsOn.value;
    };

    const takePicture = async function () {
      const imageBlob = await camera.value.snapshot(
        { width: 768, height: 1024 },
        "image/png",
        0.5
      );

      const url = URL.createObjectURL(imageBlob);

      send_file(url);
      cameraOff();
      this.closeCamera(url);
    };

    const send_file = (blob_file) => {
      // Your send_file logic here
    };

    return {
      camera,
      cameraOff,
      cameraIsOn,
      takePicture,
      send_file,
    };
  },
});
</script>

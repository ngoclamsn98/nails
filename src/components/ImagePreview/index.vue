<template>
  <img
    :src="src"
    @click="open"
    class="w-[100px] h-[100px] bg-center object-cover pb-[10px]"
    v-if="src"
    id="preview"
  />
</template>
  
<script setup>
import { defineProps, h } from "vue";
import { getCurrentInstance } from "vue";
import ImageComponent from "./ImageComponent.vue";
const instance = getCurrentInstance();
const app = instance.appContext.app.config.globalProperties;

const props = defineProps({
  src: { type: String, required: false },
});

const open = () => {
  if (app.$modal) {
    app.$modal({ component: h(ImageComponent, { src: props.src }) });
  }
};
</script>

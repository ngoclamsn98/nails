<template>
  <router-view />
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { globalRouter } from "./routes/globalRouter";

const router = useRouter();
globalRouter.router = router;

export default {
  setup() {
    const value = ref("");
    return { value };
  },
};
</script>

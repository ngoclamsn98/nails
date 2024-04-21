<template>
  <router-view />
  <vue3-confirm-dialog />
</template>

<script setup>
import { getCurrentInstance, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

const instance = getCurrentInstance();
const app = instance.appContext.app;

watch(
  () => store.state.error.message,
  () => {
    if (store.state.error.message) {
      app.$confirm({
        title: store.state.error.message,
        button: {
          yes: "Ok",
        },
        callback: (confirm) => {
          if (confirm) {
            store.commit("error/setError", {
              message: null,
              type: null,
            });
          }
        },
      });
    }
  }
);
</script>
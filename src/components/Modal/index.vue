<template>
  <div
    id="nail-modal-custom"
    v-show="isOpen"
    class="fixed inset-0 z-[9199] grid place-items-center h-screen w-screen bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 modal"
  >
    <div class="m-4 rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl modal-content">
      <span
        @click="handleCloseModal"
        class="flex justify-end p-2"
      >
        <Close />
      </span>
      <h2
        class="font-bold text-[22px] px-[20px]"
        v-if="title"
      >{{ title }}</h2>
      <div class="p-4 font-sans text-base antialiased font-light leading-relaxed text-blue-gray-500 z-[1000]">
        <component
          :is="component"
          @close="handleCloseModal"
        ></component>
      </div>
    </div>
  </div>
</template>

<script setup>
import Close from "@/components/Icon/Close";
import useDisclosure from "@/hooks/useDisclosure";
import { onMounted } from "vue";

const { open, close, isOpen } = useDisclosure();

const props = defineProps({
  component: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
});

const handleCloseModal = () => {
  const modalContent = document.querySelector(".modal-content").classList;
  const modal = document.querySelector(".modal").classList;
  const nailModal = document.querySelector("#nail-modal-custom");

  modalContent.add("modal-content-out");
  modal.add("modal-content-fadeOut");

  setTimeout(() => {
    modalContent.remove("modal-content-out");
    modal.remove("modal-content-fadeOut");
    close();
    nailModal.remove();
  }, 300);
};

onMounted(() => {
  open();
});
</script>

<style scoped>
.modal {
  animation: fadeIn 0.3s ease-in-out forwards;
}

.modal-content {
  animation: scaleIn 0.3s ease-in-out forwards;
}

.modal-content-out {
  animation: scaleOut 0.3s ease-in-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.8);
  }
  to {
    transform: scale(1);
  }
}

@keyframes scaleOut {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
}
</style>
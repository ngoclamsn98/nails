<template>
     <button @click="openModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Open Modal</button>
    <div v-if="showModal" class="modal hidden fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-gray-300" @click="closeModal">
      <div class="modal-content bg-white p-[20px] border w-[80%]" @click.stop>
        <span class="close" @click="closeModal">&times;</span>
        <p>This is a modal with animation!</p>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const showModal = ref(false);

const openModal = () => showModal.value = true

const closeModal = () => {
    const modalContent = document.querySelector(".modal-content");
    modalContent.classList.add('modal-content-out');
    const modal = document.querySelector(".modal");
    modal.classList.add('fadeOut');
    setTimeout(() => {
        modalContent.classList.remove('modal-content-out');
        showModal.value = false;
        modal.classList.remove('fadeOut');
    }, 300);
}

</script>

<style scoped>
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
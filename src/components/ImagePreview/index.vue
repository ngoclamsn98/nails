<template>
    <img :src="src" @click="open"  class="w-[100px] h-[100px]"/>
    <div data-dialog-backdrop="dialog" data-dialog-backdrop-close="true" v-show="isOpen"
    class="pointer-events-none fixed inset-0 z-[9199] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
    <div data-dialog="dialog"
        class="relative m-4 rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl">
        <span @click="close" class="flex justify-end p-2"><Close /></span>
        <div
        class="relative p-4 font-sans text-base antialiased font-light leading-relaxed text-blue-gray-500 z-[1000]">
        <img :src="src" class="w-full"/>
        </div>
    </div>
    </div>
</template>
  
<script setup>
import Close from '@/components/Icon/Close';
import useDisclosure from "@/hooks/useDisclosure";

defineProps({
    src: { type: String, required: false },
});

const { open, close, isOpen } = useDisclosure();
</script>
  
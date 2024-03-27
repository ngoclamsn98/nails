<template>
    <div class=" h-[60px] m-auto flex justify-start top-0 left-0 items-center ">
        <span @click="handleBack" v-if="isBack"><ArrowPrevious /></span>
        <span class="flex flex-1 justify-center text-[26px]">{{ title }}</span>
    </div>
    <slot name="content"/>
</template>

<script setup>
import ArrowPrevious from '@/components/Icon/ArrowPrevious';
import router from "@/routes";
defineProps({
    isBack: {type: Boolean, required: false, default: false},
    title: {type: String, default: ''}
})

const handleBack = () => {
    router.go(-1);
}

</script>
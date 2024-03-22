<template> 
    <div class="flex flex-col gap-y-[2px] h-[60px] w-full">
        <div class="flex gap-x-[10px] items-center">
            <span>{{ label }}</span>
            <input v-model="value" :type="type" :placeholder="placeholder" class="h-[40px] border rounded-[10px] pl-[10px] border-gray flex-1"/>
        </div>
        <span class="text-red text-[13px] ml-[10px]">{{ errorMessage }}</span>
    </div>
</template>

<script setup>
import { useField } from 'vee-validate';
    const props =  defineProps({
        name: { type: String, required: true},
        type: { type: String, required: false, default: 'text' },
        placeholder:{ type: String, required: false},
        label: { type: String, required: false},
    });

    const { value, errorMessage } = useField(() => props.name);
</script>

<template> 
    <div class="flex flex-col gap-y-[2px] h-[60px] w-full">
        <div class="flex gap-x-[10px] items-center">
            <span>{{ label }}</span>
            <input v-model="numericValue" :placeholder="placeholder" class="h-[45px] border rounded-[15px] pl-[10px] border-white flex-1"/>
        </div>
        <span class="text-red text-[13px] ml-[15px] inline-block">{{ errorMessage }}</span>
    </div>
</template>

<script setup>
import { useField } from 'vee-validate';
import { ref, watch } from 'vue';

const props = defineProps({
    name: { type: String, required: true},
    type: { type: String, required: false},
    placeholder: { type: String, required: false},
    label: { type: String, required: false},
});

const { value, errorMessage } = useField(() => props.name);

const numericValue = ref(value.value);

watch(numericValue, (newValue) => {
    numericValue.value = newValue.replace(/\D/, '');

    if (!isNaN(numericValue.value))
        value.value = +numericValue.value;
});
</script>

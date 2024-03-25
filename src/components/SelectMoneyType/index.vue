<template>
    <div class="flex gap-x-[5px]">
        <label :for="name" v-if="label">{{ label }}</label>
        <select :name="name" :data-focus="name" v-model="selectedValue" class="h-[30px] rounded-[10px] px-[5px]">
            <option v-for="(option, index) in options" :key="index" :value="option.value">{{ option.label }}</option>
        </select>
        <span> {{ errorMessage }}</span>
    </div>
</template>

<script setup>
import { useField } from "vee-validate";
import { ref } from 'vue';
const props = defineProps({
    name: { type: String, required: true },
    label: { type: String, required: false },
});

const options = [
    { label: 'VNĐ', value: 'vnd'},
    { label: 'USD', value: 'usd'},
]

const { value, errorMessage } = useField(() => props.name);

const selectedValue = ref(value.value || 'vnd');

</script>

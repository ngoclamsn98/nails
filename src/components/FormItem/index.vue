<template> 
    <div class="flex flex-col gap-y-[2px] h-[60px] w-full">
        <div class="flex gap-x-[10px] items-center">
            <span>{{ label }}</span>
            <Field :name="name" :type="type" :placeholder="placeholder" class="h-[40px] border rounded-[10px] pl-[10px] border-gray flex-1"/>
        </div>
        <ErrorMessage :name="name" class="text-red text-[13px] ml-[10px]"/>
    </div>
</template>

<script setup>
    import { ErrorMessage, Field } from 'vee-validate';

    defineProps({
        name: { type: String, required: true},
        type: { type: String, required: false, default: 'text' },
        placeholder:{ type: String, required: false},
        label: { type: String, required: false},
    });
</script>
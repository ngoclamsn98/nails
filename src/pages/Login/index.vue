<template>
  <form @submit="onSubmit">
    <InputText name="username" />
    <InputNumber name="age"/>
    <button>Submit</button>
  </form>
</template>

<script setup>
import InputNumber from '@/components/InputNumber/index.vue';
import InputText from '@/components/InputText/index.vue';
import { useForm } from 'vee-validate';
import { validationSchema } from './validate';

const { handleSubmit } = useForm({
  validationSchema,
});

const onSubmit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2));
});
</script>

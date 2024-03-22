<template>
  <Form @submit="onSubmit" :validation-schema="validationSchema" class="w-[500px]">
    <FormItem name="username"/>
    <button>Submit</button>  
  </Form>
</template>

<script setup>
import FormItem from '@/components/FormItem/index.vue';
import { Form } from 'vee-validate';
import { validationSchema } from './validate';

function onSubmit(values) {
  alert(JSON.stringify(values, null, 2));
}

</script>
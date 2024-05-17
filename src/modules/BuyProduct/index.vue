<template>
    <Header
        :isBack="true"
        title="Buy Product"
    >
        <template v-slot:content>
            <Product />
        </template>
    </Header>
</template>

<script setup>
import Header from "@/components/Header";
import Product from "@/components/Product";
import { PayType, TYPE_PAGE } from "@/constants";

import { useForm } from "vee-validate";
import { onBeforeMount, provide } from "vue";


const { handleSubmit, values, setFieldValue } = useForm({});

onBeforeMount(async () => {
  setFieldValue("payType", PayType.CASH);
});

provide("typePage", TYPE_PAGE.SALES_PRODUCT);
provide("handleSubmit", handleSubmit);
provide("values", values);
</script>
<template>
  <div class="flex w-full border-t border-gray-200">
    <div class="w-[90%] mx-auto">
      <InputText
        name="clientName"
        label="Name"
        :classes="classes"
      />
    </div>
  </div>
  <div class="flex w-full border-t border-gray-200">
    <div class="w-[90%] mx-auto">
      <InputPhoneNumber
        name="clientPhoneNumber"
        label="Phone"
        :classes="classes"
      />
    </div>
  </div>
  <div class="flex w-full border-t border-gray-200">
    <div class="w-[90%] mx-auto">
      <InputNumber
        name="discount"
        label="Discount"
        :classes="classes"
        :isMoney="true"
      />
    </div>
  </div>
  <div class="flex w-full border-t border-gray-200">
    <div class="w-[90%] mx-auto">
      <InputNumber
        name="tip"
        label="Tip"
        :classes="classes"
        :isMoney="true"
      />
    </div>
  </div>
  <div class="flex w-full border-t border-gray-200">
    <div class="w-[90%] mx-auto flex items-center py-[10px]">
      <span :class="classes.label">Total</span>
      <div class="flex flex-col text-gray-500 text-[14px]">
        <span class="ml-[10px]">
          {{ numberWithCommas(total) }} VNĐ
          <InputCategory
            :name="`cash`"
            class="hidden"
            :disabled="true"
          />
        </span>
        <span class="ml-[10px]">{{ amountUsd }} USD</span>
      </div>
    </div>
  </div>
  <div class="flex w-full border-t border-gray-200">
    <div class="w-[90%] mx-auto">
      <TextArea
        name="note"
        class="flex-1"
        label="Note"
        :classes="classes"
      />
    </div>
  </div>
  <div class="flex w-full border-t border-gray-200">
    <div class="w-[90%] mx-auto flex mt-[18px]">
      <span class="basis-[75px]">Payment</span>
      <div>
        <Radio
          v-for="(payment,index) in paymentType.data"
          :label="payment.label"
          name="payType"
          :checkedValue="payment.value"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import InputCategory from "@/components/InputCategory";
import InputNumber from "@/components/InputNumber";
import InputPhoneNumber from "@/components/InputPhoneNumber";
import InputText from "@/components/InputText";
import Radio from "@/components/Radio";
import TextArea from "@/components/TextArea";
import { paymentTypes } from "@/constants";
import { numberWithCommas } from "@/utils/number";
import { reactive } from "vue";

defineProps({
  total: {
    type: Number,
    default: 0,
  },
  amountUsd: {
    type: Number,
    default: 0,
  },
});

const classes = reactive({ label: "basis-16" });
const paymentType = reactive({ data: paymentTypes });
</script>
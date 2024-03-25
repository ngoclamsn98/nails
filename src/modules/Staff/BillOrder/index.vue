<template>
  <form class="flex justify-start items-start w-[90%] h-full flex-col m-auto">
    <Packages />
    <Images />
    <div class="flex w-full border-t mt-[5px] border-gray">
      <div class="mt-[10px] flex items-center h-[80px] w-[90%] m-auto">
        <div class="mb-[13px] basis-8 inline-block">Tip</div>
        <InputNumber name="tip" class="flex-1"/>
        <SelectMoneyType name="tip.type" class="mb-[13px] ml-[5px]"/>
      </div>
    </div>
    <div class="flex w-full border-t mt-[5px] border-gray">
      <div class="mt-[10px] flex items-center h-[80px] w-[90%] m-auto">
        <span class="mb-[13px] basis-8">Total</span>
        <InputNumber name="total"/>
        <SelectMoneyType name="total.type" class="mb-[13px] ml-[5px]"/>
      </div>
    </div>
  </form>
</template>
  
<script setup>
import InputNumber from '@/components/InputNumber';
import SelectMoneyType from '@/components/SelectMoneyType';
import Images from "./components/Images";
import Packages from "./components/Packages";

</script>
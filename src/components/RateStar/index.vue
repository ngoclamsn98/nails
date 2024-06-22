<template>
  <div class="flex items-center justify-center pt-[10px] pb-[30px]">
    <span
      v-for="i in 5"
      :key="i"
      @click="activeStar(i)"
    >
      <Star :class="{ 'text-yellow': i<= star }" />
    </span>
  </div>
  <div class="flex w-full justify-center">
    <button
      @click="submitForm"
      v-wave="{ color: 'blue' }"
      class="flex gap-x-[5px] px-[10px] h-[45px] items-center rounded-2xl border border-gray-200 min-w-[100px] justify-center bg-button text-white"
    >
      <div class="flex items-center justify-center">
        <div
          v-if="loading"
          class="w-[30px] h-[30px] rounded-full animate-spin
                    border-2 border-solid border-blue-500 border-t-transparent shadow-md"
        ></div>
      </div>
      Đánh giá
    </button>
  </div>
</template>

<script setup>
import Star from "@/components/Icon/Star";
import { handlerCallApi } from "@/config/interceptors";
import { defineEmits, ref } from "vue";

const props = defineProps({
  values: { type: Object, require: true },
  handleOnCreateSale: { type: Function, default: () => {} },
});

const loading = ref(false);

const emit = defineEmits(["close"]);

const star = ref(0);

const activeStar = (value) => {
  if (loading.value) return;
  star.value = value;
};

const submitForm = async () => {
  if (loading.value) return;

  loading.value = true;
  const formData = new FormData();
  for (const [key, value] of Object.entries(props.values)) {
    formData.append(key, value);
  }

  formData.append("rateStar", star.value);

  try {
    await handlerCallApi({
      method: "POST",
      url: "/sale",
      body: formData,
    });
    emit("close");
    props.handleOnCreateSale();
    loading.value = false;
  } catch (error) {
    emit("close");
    props.handleOnCreateSale({
      title:
        error?.response?.data?.message ||
        "Lỗi!,vui lòng kiểm tra lại thông tin!",
    });
    loading.value = false;
  }
};
</script>
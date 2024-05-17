<template>
  <div class="w-full">
    <Button
      @click="isOpenSwipeModal = true"
      :class="width"
    >
      <template v-slot:text>Add Products</template>
    </Button>
    <SwipeModal
      v-model="isOpenSwipeModal"
      snapPoint="300px"
    >
      <form @submit="handleSearchProduct">
        <div class="flex gap-x-[15px] mr-2 items-center ml-[10px]">
          <InputText
            name="barcode"
            placeholder="Nhập mã sản phẩm"
          />
          <Button
            class="h-[35px] !w-[45px]"
            @click="handleSearchProduct"
          ><template v-slot:text>Tìm</template></Button>
        </div>
      </form>
      <div class="flex justify-center">
        <span @click="handleOpenQr">
          <QrCodeIcon />
        </span>
      </div>

    </SwipeModal>
  </div>
  <QrCode
    @qrData="getQrData"
    @closeQr="close"
    ref="qrCode"
    v-if="isOpenQr"
  />
</template>

<script setup>
import Button from "@/components/Button";
import QrCodeIcon from "@/components/Icon/QrCode";
import InputText from "@/components/InputText";
import QrCode from "@/components/QrCode";
import { handlerCallApi } from "@/config/interceptors";
import { STORAGE_KEY } from "@/constants";
import useDisclosure from "@/hooks/useDisclosure";
import { handleNextFocus } from "@/utils/handleNextFocus";
import storageUtils from "@/utils/storageUtils";
import { SwipeModal } from "@takuma-ru/vue-swipe-modal";
import { useForm } from "vee-validate";
import { inject, ref } from "vue";
import { validationSchema } from "./validationSchema";

defineProps({
  width: {
    type: String,
    default: "w-full",
  },
});

const { open: openQr, close, isOpen: isOpenQr } = useDisclosure();
const handleAddProduct = inject("handleAddProduct");

const isOpenSwipeModal = ref(false);
const qrCode = ref();

const { values, handleSubmit } = useForm({
  validationSchema: validationSchema,
});

const handleGetBarCode = async (barcode) => {
  const storeId = storageUtils.get(STORAGE_KEY.STORE_DETAIL)?.id;
  isOpenSwipeModal.value = false;
  close();
  const result = await handlerCallApi({
    method: "GET",
    url: `/product/barcode`,
    params: { storeId: storeId, barcode: barcode },
  });
  handleAddProduct(result);
};

const getQrData = async (barcode) => {
  await handleGetBarCode(barcode);
  isOpenSwipeModal.value = false;
  close();
};

const handleOpenQr = () => {
  isOpenSwipeModal.value = false;
  openQr();
};

const handleSearchProduct = (e) => {
  handleNextFocus(
    e,
    handleSubmit(async (_, actions) => {
      try {
        await handleGetBarCode(values.barcode);
      } catch (error) {
        isOpenSwipeModal.value = false;
        close();
      } finally {
        actions.resetForm();
      }
    })
  );
};
</script>

<style scoped>
:deep(.modal-style) {
  background-color: #f7f2fa !important;
}
</style>
<template>
  <ProductList />
  <div class="my-2"></div>
  <form
    class="flex justify-start items-start w-[90%] h-full flex-col mx-auto mb-[80px]"
    @submit.prevent="handleSubmitForm"
  >
    <InformationSale
      v-if="typePage === TYPE_PAGE.SALES_PRODUCT && data.products.length"
      :total="total"
      :amountUsd="totalUsd"
    />
    <Button class="hidden">Submit</Button>
  </form>
  <ActionProduct />
</template>

<script setup>
import ActionProduct from "@/components/ActionProduct";
import Button from "@/components/Button";
import InformationSale from "@/components/InformationSale";
import ProductList from "@/components/ProductList";
import RateStar from "@/components/RateStar";
import { TYPE_PAGE } from "@/constants";
import storageUtils from "@/utils/storageUtils";
import { STORAGE_KEY } from "@/constants";
import { BillOrderReqDto, SALE_TYPE } from "@/declaration";

import { handlerCallApi } from "@/config/interceptors";
import router from "@/routes";
import { HOME } from "@/routes/path";
import { handleConvertVndToUSD } from "@/utils/api";
import { deleteProduct, totalPrice, updateQuantity } from "@/utils/array";
import { handleNextFocus } from "@/utils/handleNextFocus";
import {
  getCurrentInstance,
  h,
  inject,
  provide,
  reactive,
  ref,
  toRaw,
  watch,
} from "vue";

const typePage = inject("typePage");
const handleSubmit = inject("handleSubmit");
const values = inject("values");

const instance = getCurrentInstance();
const app = instance.appContext.app;

const total = ref(0);
const totalUsd = ref(0);

const data = reactive({
  products: [],
});

const submitData = async (values) => {
  const storeId = storageUtils.get(STORAGE_KEY.STORE_DETAIL)?.id;
  const body = {
    storeId,
    stockIns: values.products.map((product) => ({
      productId: product.id,
      inCnt: product.quantity || 1,
    })),
  };

  await handlerCallApi({
    method: "post",
    url: "/stockIn",
    body: body,
  });

  app.$confirm({
    title: "Nhập kho thành công!",
    button: {
      yes: "Ok",
    },
    callback: (confirm) => {
      if (confirm) {
        router.push(HOME);
        return;
      }
    },
  });
};

const handlerImportProduct = () => {
  app.$confirm({
    title: "Bạn có muốn nhập kho ?",
    button: {
      yes: "Ok",
      no: "Không",
    },
    callback: (confirm) => {
      if (confirm) {
        submitData(values);
      }
    },
  });
};

const handlerBuyProduct = (values) => {
  const storeId = storageUtils.get(STORAGE_KEY.STORE_DETAIL)?.id;
  const products = values.products.map((product) => ({
    id: product.id,
    quantity: product.quantity || 1,
    packageId: null,
  }));

  const formData = new BillOrderReqDto({
    storeId,
    discount: values.discount || 0,
    clientName: values.clientName || '',
    clientPhoneNumber: values.clientPhoneNumber || '',
    payType: values.payType,
    tip: values.tip || 0,
    total: +total.value,
    file: null,
    saleType: SALE_TYPE.PRODUCT,
    products: JSON.stringify(products),
  });

  const handleOnCreateSale = (data) => {
    app.$confirm({
      title: data?.title || "Bán hàng thành công !",
      button: {
        yes: "Ok",
      },
      callback: (confirm) => {
        if (confirm && !data?.title) {
          router.push(HOME);
          return;
        }
      },
    });
  };

  app.config.globalProperties.$modal({
    component: h(RateStar, {
      values: formData,
      handleOnCreateSale: handleOnCreateSale,
    }),
    title: "Mức độ hài lòng của bạn!",
  });
};

const handleSubmitForm = (e) => {
  handleNextFocus(
    e,
    handleSubmit((values) => {
      if (typePage === TYPE_PAGE.IMPORT_PRODUCT) {
        handlerImportProduct();
        return;
      }
      handlerBuyProduct(values);
    })
  );
};

const handleUpdateQuantityProduct = () => {
  data.products = updateQuantity(values.products, data.products);
};

const handleAddProduct = (product) => {
  if (!data.products.find((p) => p.id === product.id)) {
    data.products = [...data.products, { ...product, quantity: 1 }];
  }
};

const handleDeleteProduct = (id) => {
  data.products = deleteProduct([id], data.products);
};

let timeout;

watch(data, async (newData) => {
  if (typePage === TYPE_PAGE.SALES_PRODUCT) {
    const usd = await handleConvertVndToUSD(
      totalPrice(toRaw(newData.products)) -
        (values.discount || 0) +
        (values.tip || 0)
    );
    total.value =
      totalPrice(toRaw(newData.products)) -
      (values.discount || 0) +
      (values.tip || 0);
    totalUsd.value = usd;
  }
});

watch(values, (newValues) => {
  if (typePage === TYPE_PAGE.SALES_PRODUCT) {
    const debounceTime = 1000;
    total.value =
      totalPrice(toRaw(data.products)) -
      (newValues.discount || 0) +
      (newValues.tip || 0);
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      totalUsd.value = await handleConvertVndToUSD(total.value);
    }, debounceTime);
  }
});

provide("data", data);
provide("handleSubmitForm", handleSubmitForm);
provide("handleUpdateQuantityProduct", handleUpdateQuantityProduct);
provide("handleAddProduct", handleAddProduct);
provide("total", total.value);
provide("totalUsd", totalUsd.value);
provide("handleDeleteProduct", handleDeleteProduct);
</script>

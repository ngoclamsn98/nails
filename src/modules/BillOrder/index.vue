<template>
  <Header
    :isBack="true"
    title="Bill Order"
  >
    <template v-slot:content>
      <form
        class="flex justify-start items-start w-[90%] h-full flex-col m-auto"
        @submit.prevent="onSubmit"
      >
        <div
          class="flex justify-center w-full"
          v-if="store.state.loading.isLoading"
        >
          <Loading />
        </div>
        <Packages
          :collapses="data.collapses"
          v-else
        />
        <Camera />
        <InformationSale
          :total="total"
          :amountUsd="amountUsd"
        />
        <div class="flex w-full justify-center mt-[20px]">
          <Button class="mb-[20px] w-[150px]">
            <template v-slot:text>Submit</template>
          </Button>
        </div>
      </form>
    </template>
  </Header>
</template>

<script setup>
import Button from "@/components/Button";
import Header from "@/components/Header";
import InformationSale from "@/components/InformationSale";
import Loading from "@/components/Loading";
import RateStar from "@/components/RateStar";
import { handlerCallApi } from "@/config/interceptors";
import { PayType } from "@/constants";
import { BillOrderReqDto, SALE_TYPE } from "@/declaration";
import router from "@/routes";
import { HOME } from "@/routes/path";
import { handleConvertVndToUSD } from "@/utils/api";
import {
  handleFormData,
  mapValueProductToCategory,
  productToKey,
} from "@/utils/array";
import { handleNextFocus } from "@/utils/handleNextFocus";
import { convertBase64ToFileBinary } from "@/utils/resizeImage";
import { useForm } from "vee-validate";
import {
  getCurrentInstance,
  h,
  onBeforeMount,
  provide,
  reactive,
  ref,
  watch,
} from "vue";
import { useStore } from "vuex";
import Camera from "./components/Camera";
import Packages from "./components/Packages";
import { handleProductPackage, isBase64 } from "./utils";
import storageUtils from "@/utils/storageUtils";
import { STORAGE_KEY } from "@/constants";

const store = useStore();
const amountUsd = ref(null);
const total = ref(null);
const checkedArr = ref([]);
const image = ref(null);

const instance = getCurrentInstance();
const app = instance.appContext.app;

const data = reactive({ collapses: [], categories: {} });

const { handleSubmit, values, setFieldValue } = useForm({
  // validationSchema: validationSchema,
});

const handleSetImage = (data) => {
  image.value = data;
};

const handleCheckedValue = (values) => {
  if (!values?.packages?.length) return [];
  const checkedList = [];
  values.packages.forEach((packages) => {
    packages?.categories?.forEach((category) => {
      category?.products?.forEach((product) => {
        checkedList.push(product.id);
      });
    });
  });
  checkedArr.value = checkedList;
  return checkedList;
};

const handleTotalAmount = (values) => {
  if (!values?.packages?.length) return values.tip || 0;

  const checkedList = [];
  values.packages.forEach((packages) => {
    packages?.categories?.forEach((category) => {
      category?.products?.forEach((product) => {
        if (category.id && product.id && product.price) {
          checkedList.push(product);
        }
      });
    });
  });

  const amountVnd = checkedList.reduce((init, value) => {
    return (init += +value.price);
  }, 0);

  const totalPerson = values.saleDiv || 1;
  const discount = values.discount || 0;
  const tip = values.tip || 0;

  return amountVnd * totalPerson + tip - discount;
};

let timeout;

watch(values, (newValues) => {
  const ids = handleCheckedValue(newValues);
  const keyValue = mapValueProductToCategory(
    ids.map((id) => id && id.toString()),
    data.categories
  );

  Object.keys(keyValue).forEach((key, index) => {
    setFieldValue(key, Object.values(keyValue)[index]);
  });

  const amountVnd = handleTotalAmount(newValues);

  const debounceTime = 1000;
  total.value = amountVnd;
  clearTimeout(timeout);
  timeout = setTimeout(async () => {
    amountUsd.value = await handleConvertVndToUSD(amountVnd);
    setFieldValue("cash", amountVnd);
  }, debounceTime);
});

const onSubmit = (e) => {
  handleNextFocus(
    e,
    handleSubmit((values) => {
      const result = handleFormData(values);

      if (typeof result === "string") {
        app.$confirm({
          title: result,
          button: {
            no: "Ok",
          },
        });
        return;
      }

      if (
        values?.clientPhoneNumber &&
        !/^(?:\d{10,12}|)$/.test(values.clientPhoneNumber)
      ) {
        app.$confirm({
          title: "Số điện thoại không hợp lệ!",
          button: {
            no: "Ok",
          },
        });
        return;
      }

      const products = handleProductPackage(values.packages);

      let file = null;

      if (isBase64(image.value)) {
        file = convertBase64ToFileBinary(image.value);
      } else {
        file = image.value || null;
      }

      const storeId = storageUtils.get(STORAGE_KEY.STORE_DETAIL)?.id;
      const formData = new BillOrderReqDto({
        storeId,
        discount: values.discount || 0,
        clientName: values.clientName || '',
        clientPhoneNumber: values.clientPhoneNumber || '',
        payType: values.payType,
        tip: values.tip || 0,
        total: +total.value,
        file: file,
        saleType: SALE_TYPE.PACKAGE,
        products: JSON.stringify(products),
      });

      const handleOnCreateSale = (data) => {
        app.$confirm({
          title: data?.title || "Tạo Bill thành công !",
          button: {
            yes: "Ok",
          },
          callback: (confirm) => {
            if (confirm && !data?.title) {
              return router.push(HOME);
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
    })
  );
};

const handleIndividual = (selectedIndex) => {
  data.collapses = [...data.collapses].map((collapse, index) => {
    if (index === selectedIndex) {
      return { ...collapse, isExpanded: !collapse.isExpanded };
    }
    return collapse;
  });
};

const handleGetPackages = async () => {
  const storeId = storageUtils.get(STORAGE_KEY.STORE_DETAIL)?.id;
  const result = await handlerCallApi({
    url: "/packages/staff",
    method: "GET",
    params: {
      storeId,
      currentPage: 1,
      pageSize: 1000,
    },
  });

  return result;
};

const handlePropertyPackage = (packages) => {
  if (packages?.length) {
    data.collapses = packages.map(({ name, id, categories }) => ({
      name,
      id,
      categories,
      isExpanded: false,
    }));
    data.categories = productToKey(packages);
  }
};

onBeforeMount(async () => {
  setFieldValue("payType", PayType.CASH);

  // Call api get packages;
  const response = await handleGetPackages();
  if (!response.data.length) {
    return;
  }

  handlePropertyPackage(response.data);
});

provide("handleIndividual", handleIndividual);
provide("values", values);
provide("checkedArr", checkedArr);
provide("handleSetImage", handleSetImage);
</script>

<template>
  <Header :isBack="true" title="Note Checkout Bill">
    <template v-slot:content>
      <form
        class="flex justify-start items-start w-[90%] h-full flex-col m-auto"
        @submit.prevent="onSubmit"
      >
        <Packages />
        <Camera />
        <div class="flex w-full border-t mt-[5px] border-gray">
          <div class="mt-[10px] flex items-center h-[80px] w-[90%] m-auto">
            <div class="mb-[13px] basis-8 inline-block">Tip</div>
            <InputNumber
              name="tip.money"
              class="flex-1"
            />
            <SelectMoneyType
              name="tip.type"
              class="mb-[13px] ml-[5px]"
            />
          </div>
        </div>
        <div class="flex w-full border-t mt-[5px] border-gray">
          <div class="mt-[10px] flex items-center h-[80px] w-[90%] m-auto">
            <span class="mb-[13px] basis-8">Total</span>
            <InputNumber name="total.money" />
            <SelectMoneyType
              name="total.type"
              class="mb-[13px] ml-[5px]"
            />
          </div>
        </div>
        <div class="flex w-full border-t mt-[15px] border-gray">
          <div class="mt-[10px] flex items-center h-[80px] w-[90%] m-auto">
            <span class="mb-[13px] basis-8">Note</span>
            <TextArea name="note" />
          </div>
        </div>
        <div class="flex w-full justify-center mt-[20px]">
          <Button class="mb-[20px]">
            <template v-slot:text>Submit</template>
          </Button>
        </div>
      </form>
    </template>
  </Header>
</template>

<script>
import Button from "@/components/Button";
import Camera from "@/components/Camera_v2";
import Header from "@/components/Header";
import InputNumber from "@/components/InputNumber";
import SelectMoneyType from "@/components/SelectMoneyType";
import TextArea from "@/components/TextArea";
import router from "@/routes";
import { STAFF } from "@/routes/path";
import { handleNextFocus } from "@/utils/handleNextFocus";
import { useForm } from "vee-validate";
import { getCurrentInstance } from 'vue';
import Packages from "./components/Packages";
import { validationSchema } from "./validate";
export default {
  components: {
    Button,
    Camera,
    Header,
    InputNumber,
    SelectMoneyType,
    TextArea,
    Packages,
  },
  setup() {
    const { handleSubmit } = useForm({
      validationSchema: validationSchema,
    });

    const instance = getCurrentInstance();
    const app = instance.appContext.app;
   
    const onSubmit = (e) => {
      handleNextFocus(
        e,
        handleSubmit((values) => {
          app.$confirm({
            title: 'Thêm Bill thành công',
            button: {
              yes: 'Ok'
            },
            callback: confirm => {
              return router.push(STAFF.HOME);
              // store.commit("user/authenticate", {
              //   token: values,
              // });
            }
          });
          
        })
      );
    };

    return {
      onSubmit,
    };
  },
};
</script>

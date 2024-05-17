import Modal from "@/components/Modal";
import { createApp, h } from "vue";

const ModalPlugin = {};

ModalPlugin.install = (app) => {
  app.config.globalProperties.$modal = ({ component, title }) => {
    const modalInstance = createApp({
      render() {
        return h(Modal, { component, title });
      },
    }).mount(document.createElement("div"));

    document.body.appendChild(modalInstance.$el);
  };
};

export default ModalPlugin;

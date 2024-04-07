import { createApp, h } from "vue";
import Modal from "@/components/Modal";

const ModalPlugin = {};

ModalPlugin.install = (app) => {
  app.config.globalProperties.$modal = ({ component }) => {
    const modalInstance = createApp({
      render() {
        return h(Modal, { component });
      },
    }).mount(document.createElement("div"));

    document.body.appendChild(modalInstance.$el);
  };
};

export default ModalPlugin;

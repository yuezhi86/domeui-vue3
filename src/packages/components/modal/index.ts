import Model from './index.vue';

let modalQueue: Array<{hideModal: () => void}> = [];

export * from './index.vue';
export const DeModal = Model;
export const DeConfirm = '';
export const DeAlert = '';
export const hideModal = () => {
  modalQueue.forEach((item) => {
    item.hideModal();
  });

  modalQueue = [];
};

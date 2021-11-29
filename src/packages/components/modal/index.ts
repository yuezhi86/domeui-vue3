import Model from './modal.vue';

type HideModal = () => void;
const modalQueue: Map<string, HideModal> = new Map();

export default modalQueue;
export function hideModal() {
  modalQueue.forEach((hideModal) => {
    hideModal();
  });
}

export * from './modal.vue';
export const DeModal = Model;

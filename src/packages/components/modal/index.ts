import Model from './modal.vue';

type HideModal = () => void;
const modalMap: Map<string, HideModal> = new Map();

export default modalMap;
export function hideModal() {
  modalMap.forEach((hideModal) => {
    hideModal();
  });
}

export * from './modal.vue';
export const DeModal = Model;

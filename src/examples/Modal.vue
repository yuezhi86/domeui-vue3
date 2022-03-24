<template>
  <section class="demo-group">
    <div class="item-group">
      <DeButton @click="showModal = true">打开</DeButton>
    </div>
  </section>
  <DeModal
    v-model="showModal"
    title="编辑设施-房间"
    class="abc de"
    :before-close="beforeClose"
  >
    <DeButton @click="showModal2 = true">打开</DeButton>
  </DeModal>
  <DeModal
    v-model="showModal2"
    title="编辑设施-房间"
    class="abc de"
    :before-close="beforeClose"
  >
    <DeInput />
  </DeModal>
</template>

<script lang="ts">
import {ref} from 'vue';
import {DeInput, DeButton, DeModal, ModalBeforeCloseAction} from '@/packages';

export default {
  components: {
    DeInput,
    DeButton,
    DeModal,
  },
  setup() {
    const showModal = ref(false);
    const showModal2 = ref(false);
    return {
      showModal,
      showModal2,
      beforeClose(action: ModalBeforeCloseAction) {
        if (action === 'confirm') {
          return new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, 3000);
          });
        }
      },
    };
  },
};
</script>

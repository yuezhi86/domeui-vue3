<template>
  <section class="demo-group">
    <div class="item-group">
      <DeButton @click="onShowModal">打开</DeButton>
    </div>
  </section>
  <DeModal v-model="showModal" title="编辑设施-房间"> </DeModal>
</template>

<script lang="ts">
import {ref} from 'vue';
import {DeButton, DeModal} from '@/packages';

export default {
  components: {
    DeButton,
    DeModal,
  },
  setup() {
    const showModal = ref(false);
    return {
      showModal,
      onShowModal() {
        showModal.value = true;
      },
    };
  },
};
</script>

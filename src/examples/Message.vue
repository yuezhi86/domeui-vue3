<template>
  <section class="demo-group">
    <div class="item-group"></div>
  </section>
</template>

<script lang="ts">
import {defineComponent, h} from 'vue';
import {DeMessage} from '@/packages';

export default defineComponent({
  components: {},
  setup() {
    DeMessage({
      content: 'ok',
      classNames: 'custom-message',
      render: () => h('div', '12345'),
    });
    DeMessage.info('Hello');
    DeMessage.success('Hello');
    DeMessage.error('Hello');
    DeMessage.warning('Hello');
  },
});
</script>

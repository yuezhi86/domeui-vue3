<template>
  <section class="demo-group">
    <div class="item-group"></div>
  </section>
</template>

<script lang="ts">
import {defineComponent, h} from 'vue';
import {DeMessage, DeIcon} from '@/packages';

export default defineComponent({
  components: {},
  setup() {
    DeMessage({
      content: h('div', '12345'),
      className: 'custom-message',
    });
    DeMessage.info('Hello');
    DeMessage.success('Hello');
    DeMessage.error('Hello');
    DeMessage.warning('Hello');

    return {
      title: h(DeIcon, {name: 'close-l'}),
    };
  },
});
</script>

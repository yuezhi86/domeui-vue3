<template>
  <section class="demo-group">
    <div class="item-group"></div>
  </section>
</template>

<script lang="ts">
import {defineComponent, h} from 'vue';
import {DeNotice} from '@/packages';

export default defineComponent({
  setup() {
    DeNotice({
      content: 'ok',
      classNames: 'custom-message',
      render: () => h('div', '12345'),
    });
    DeNotice.info('Hello');
    DeNotice.success('Hello');
    DeNotice.fail('Hello');
    DeNotice.warning('Hello');
  },
});
</script>

<template>
  <section class="demo-group">
    <div class="item-group">
      <DeButton @click="onClick">消息</DeButton>
    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {DeMessage, DeButton} from '@/packages';

export default defineComponent({
  components: {
    DeButton,
  },
  setup() {
    // DeMessage({
    //   title: '测试消息',
    //   duration: 0,
    //   closable: true,
    //   type: 'error',
    //   theme: 'bright',
    // });
    // DeMessage({
    //   title: '测试消息',
    //   duration: 0,
    //   closable: true,
    //   type: 'warning',
    //   theme: 'bright',
    // });
    // DeMessage({
    //   title: '测试消息',
    //   duration: 0,
    //   closable: true,
    //   type: 'success',
    //   theme: 'bright',
    // });
    // DeMessage({
    //   title: '测试消息',
    //   duration: 0,
    //   closable: true,
    //   theme: 'bright',
    // });
    // DeMessage.info('Hello', {duration: 5});
    // DeMessage.success('Hello', {duration: 4});
    // DeMessage.error('Hello', {duration: 3});
    // DeMessage.warning('Hello', {duration: 2});
    let i = 0;
    return {
      onClick() {
        DeMessage.warning('Hello' + i++, {duration: 1.5, closable: false});
      },
    };
  },
});
</script>

<template>
  <section class="demo-group">
    <div class="item-group">
      <DeButton plain @click="onClick('info')">消息</DeButton>
      <DeButton plain @click="onClick('success')">成功</DeButton>
      <DeButton plain @click="onClick('warning')">警告</DeButton>
      <DeButton plain @click="onClick('error')">错误</DeButton>
      <DeButton plain @click="onClick('warning', 0)">手动关闭</DeButton>
    </div>
    <div class="item-group">
      <DeButton @click="onClick2('info')">消息</DeButton>
      <DeButton @click="onClick2('success')">成功</DeButton>
      <DeButton @click="onClick2('warning')">警告</DeButton>
      <DeButton @click="onClick2('error')">错误</DeButton>
      <DeButton @click="onClick2('warning', 0)">手动关闭</DeButton>
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
    return {
      onClick(type: 'info' | 'success' | 'warning' | 'error', duration = 1.5) {
        DeMessage[type](
          ''.padEnd(Math.floor(100 * Math.random()), '消息内容'),
          {
            duration,
            closable: !duration,
          }
        );
      },
      onClick2(type: 'info' | 'success' | 'warning' | 'error', duration = 1.5) {
        DeMessage[type](
          ''.padEnd(Math.floor(100 * Math.random()), '消息内容'),
          {
            duration,
            closable: !duration,
            theme: 'bright',
          }
        );
      },
    };
  },
});
</script>

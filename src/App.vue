<template>
  <div id="app" class="demo-wrapper">
    <h1>Demo</h1>
    <section class="demo-group">
      <DeButton>按钮</DeButton>
    </section>
  </div>
</template>

<script lang="ts">
import DeButton from '@/packages/button/index.vue';

export default {
  components: {DeButton},
};
</script>

<style lang="less">
.demo-group {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #eee;
}
</style>

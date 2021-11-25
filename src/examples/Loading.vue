<template>
  <section
    class="demo-group"
    style="position: relative; height: 200px; background-color: #f0f0f0"
  >
    <h3>容器内的loading</h3>
    <DeLoading :fixed="false">加载中</DeLoading>
  </section>
  <section class="demo-group">
    <h3>全屏loading</h3>
    <DeButton @click="onShowLoading">showLoading 2s后自动关闭</DeButton>
  </section>
</template>

<script lang="ts">
import {DeLoading, showLoading, hideLoading, DeButton} from '@/packages';

export default {
  components: {
    DeLoading,
    DeButton,
  },
  setup() {
    return {
      onShowLoading() {
        showLoading();
        setTimeout(hideLoading, 2000);
      },
    };
  },
};
</script>

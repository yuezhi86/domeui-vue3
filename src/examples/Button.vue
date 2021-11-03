<template>
  <section class="demo-group">
    <div class="item-group">
      <h3>type: default</h3>
      <DeButton size="xsmall" type="default">xsmall</DeButton>
      <DeButton size="small" type="default">small</DeButton>
      <DeButton type="default">middle</DeButton>
      <DeButton size="large" type="default">large</DeButton>
      <DeButton size="xlarge" type="default">xlarge</DeButton>
      <DeButton disabled size="xlarge" type="default">xlarge</DeButton>
    </div>
    <div class="item-group">
      <h3>type: primary</h3>
      <DeButton size="xsmall">xsmall</DeButton>
      <DeButton size="small">small</DeButton>
      <DeButton>middle</DeButton>
      <DeButton size="large">large</DeButton>
      <DeButton size="xlarge">xlarge</DeButton>
      <DeButton disabled size="xlarge">xlarge</DeButton>
    </div>
    <div class="item-group">
      <h3>type: bright</h3>
      <DeButton size="xsmall" type="bright">xsmall</DeButton>
      <DeButton size="small" type="bright">small</DeButton>
      <DeButton type="bright">middle</DeButton>
      <DeButton size="large" type="bright">large</DeButton>
      <DeButton size="xlarge" type="bright">xlarge</DeButton>
      <DeButton disabled size="xlarge" type="bright">xlarge</DeButton>
    </div>
    <div class="item-group">
      <h3>type: second</h3>
      <DeButton size="xsmall" type="second">xsmall</DeButton>
      <DeButton size="small" type="second">small</DeButton>
      <DeButton type="second">middle</DeButton>
      <DeButton size="large" type="second">large</DeButton>
      <DeButton size="xlarge" type="second">xlarge</DeButton>
      <DeButton disabled size="xlarge" type="second">xlarge</DeButton>
    </div>
    <div class="item-group">
      <h3>type: text</h3>
      <DeButton size="xsmall" type="text">xsmall</DeButton>
      <DeButton size="small" type="text">small</DeButton>
      <DeButton type="text">middle</DeButton>
      <DeButton size="large" type="text">large</DeButton>
      <DeButton size="xlarge" type="text">xlarge</DeButton>
      <DeButton disabled size="xlarge" type="text">xlarge</DeButton>
    </div>
    <div class="item-group">
      <h3>plain</h3>
      <DeButton plain>primary</DeButton>
      <DeButton type="bright" plain>bright</DeButton>
      <DeButton type="second" plain>second</DeButton>
    </div>
    <div class="item-group">
      <h3>href</h3>
      <DeButton href="https://www.baidu.com" size="small" plain target="_blank">
        链接
      </DeButton>
      <DeButton size="small" type="bright" plain @click="onClick">
        点击
      </DeButton>
    </div>
    <section class="item-group">
      <h3>long and round</h3>
      <DeButton size="xlarge" long round>登录</DeButton>
    </section>
  </section>
</template>

<script lang="ts">
import {DeButton} from '@/packages';

export default {
  components: {DeButton},
  setup() {
    return {
      onClick() {
        alert('ok');
      },
    };
  },
};
</script>

<template>
  <section class="demo-group">
    <div class="item-group">
      <h3>theme: default</h3>
      <DeButton size="xsmall" theme="default">xsmall</DeButton>
      <DeButton size="small" theme="default">small</DeButton>
      <DeButton theme="default">middle</DeButton>
      <DeButton size="large" theme="default">large</DeButton>
      <DeButton size="xlarge" theme="default">xlarge</DeButton>
      <DeButton disabled size="xlarge" theme="default">xlarge</DeButton>
    </div>
    <div class="item-group">
      <h3>theme: primary</h3>
      <DeButton size="xsmall">xsmall</DeButton>
      <DeButton size="small">small</DeButton>
      <DeButton>middle</DeButton>
      <DeButton size="large">large</DeButton>
      <DeButton size="xlarge">xlarge</DeButton>
      <DeButton disabled size="xlarge">xlarge</DeButton>
    </div>
    <div class="item-group">
      <h3>theme: bright</h3>
      <DeButton size="xsmall" theme="bright">xsmall</DeButton>
      <DeButton size="small" theme="bright">small</DeButton>
      <DeButton theme="bright">middle</DeButton>
      <DeButton size="large" theme="bright">large</DeButton>
      <DeButton size="xlarge" theme="bright">xlarge</DeButton>
      <DeButton disabled size="xlarge" theme="bright">xlarge</DeButton>
    </div>
    <div class="item-group">
      <h3>theme: second</h3>
      <DeButton size="xsmall" theme="second">xsmall</DeButton>
      <DeButton size="small" theme="second">small</DeButton>
      <DeButton theme="second">middle</DeButton>
      <DeButton size="large" theme="second">large</DeButton>
      <DeButton size="xlarge" theme="second">xlarge</DeButton>
      <DeButton disabled size="xlarge" theme="second">xlarge</DeButton>
    </div>
    <div class="item-group">
      <h3>theme: text</h3>
      <DeButton size="xsmall" theme="text">xsmall</DeButton>
      <DeButton size="small" theme="text">small</DeButton>
      <DeButton theme="text">middle</DeButton>
      <DeButton size="large" theme="text">large</DeButton>
      <DeButton size="xlarge" theme="text">xlarge</DeButton>
      <DeButton disabled size="xlarge" theme="text">xlarge</DeButton>
    </div>
    <div class="item-group">
      <h3>theme: text-primary</h3>
      <DeButton size="xsmall" theme="text-primary">xsmall</DeButton>
      <DeButton size="small" theme="text-primary">small</DeButton>
      <DeButton theme="text-primary">middle</DeButton>
      <DeButton size="large" theme="text-primary">large</DeButton>
      <DeButton size="xlarge" theme="text-primary">xlarge</DeButton>
      <DeButton disabled size="xlarge" theme="text-primary">xlarge</DeButton>
    </div>
    <div class="item-group">
      <h3>plain</h3>
      <DeButton plain>primary</DeButton>
      <DeButton theme="bright" plain>bright</DeButton>
      <DeButton theme="second" plain>second</DeButton>
    </div>
    <div class="item-group">
      <h3>href</h3>
      <DeButton href="https://www.baidu.com" size="small" plain target="_blank">
        链接
      </DeButton>
      <DeButton size="small" theme="bright" plain @click="onClick">
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

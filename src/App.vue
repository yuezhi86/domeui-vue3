<template>
  <div id="app" class="demo-wrapper">
    <h1>Demo</h1>
    <section class="demo-group">
      <div class="item-group">
        <DeButton size="xsmall" type="default">xsmall</DeButton>
        <DeButton size="small" type="default">small</DeButton>
        <DeButton type="default">middle</DeButton>
        <DeButton size="large" type="default">large</DeButton>
        <DeButton size="xlarge" type="default">xlarge</DeButton>
        <DeButton disabled size="xlarge" type="default">xlarge</DeButton>
      </div>
      <div class="item-group">
        <DeButton size="xsmall">xsmall</DeButton>
        <DeButton size="small">small</DeButton>
        <DeButton>middle</DeButton>
        <DeButton size="large">large</DeButton>
        <DeButton size="xlarge">xlarge</DeButton>
        <DeButton disabled size="xlarge">xlarge</DeButton>
      </div>
      <div class="item-group">
        <DeButton size="xsmall" type="second">xsmall</DeButton>
        <DeButton size="small" type="second">small</DeButton>
        <DeButton type="second">middle</DeButton>
        <DeButton size="large" type="second">large</DeButton>
        <DeButton size="xlarge" type="second">xlarge</DeButton>
        <DeButton disabled size="xlarge" type="second">xlarge</DeButton>
      </div>
      <div class="item-group">
        <DeButton size="xsmall" type="bright">xsmall</DeButton>
        <DeButton size="small" type="bright">small</DeButton>
        <DeButton type="bright">middle</DeButton>
        <DeButton size="large" type="bright">large</DeButton>
        <DeButton size="xlarge" type="bright">xlarge</DeButton>
        <DeButton disabled size="xlarge" type="bright">xlarge</DeButton>
      </div>
      <div class="item-group">
        <DeButton size="xsmall" type="text">xsmall</DeButton>
        <DeButton size="small" type="text">small</DeButton>
        <DeButton type="text">middle</DeButton>
        <DeButton size="large" type="text">large</DeButton>
        <DeButton size="xlarge" type="text">xlarge</DeButton>
        <DeButton disabled size="xlarge" type="text">xlarge</DeButton>
      </div>
      <div class="item-group">
        <DeButton plain>primary</DeButton>
        <DeButton type="bright" plain>bright</DeButton>
        <DeButton type="second" plain>second</DeButton>
      </div>
    </section>
    <section class="demo-group">
      <DeButton size="large" long>large and long</DeButton>
    </section>
  </div>
</template>

<script lang="ts">
import {DeButton} from '@/packages';

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

.item-group {
  > * {
    margin: 10px;
  }
}
</style>

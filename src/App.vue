<template>
  <div id="app" class="demo-wrapper">
    <h1>ButtonDemo</h1>
    <ButtonDemo />
  </div>
</template>

<script lang="ts">
import ButtonDemo from './examples/Button.vue';

export default {
  components: {
    ButtonDemo,
  },
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

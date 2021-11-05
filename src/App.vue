<template>
  <div id="app" class="demo-wrapper">
    <h2>MessageDemo</h2>
    <MessageDemo />
    <h2>SwitchDemo</h2>
    <SwitchDemo />
    <h2>CheckboxDemo</h2>
    <CheckboxDemo />
    <h2>InputDemo</h2>
    <InputDemo />
    <h2>ButtonDemo</h2>
    <ButtonDemo />
  </div>
</template>

<script lang="ts">
import ButtonDemo from './examples/Button.vue';
import InputDemo from './examples/Input.vue';
import CheckboxDemo from './examples/Checkbox.vue';
import SwitchDemo from './examples/Switch.vue';
import MessageDemo from './examples/Message.vue';

export default {
  components: {
    ButtonDemo,
    InputDemo,
    CheckboxDemo,
    SwitchDemo,
    MessageDemo,
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

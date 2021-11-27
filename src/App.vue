<template>
  <div id="app" class="demo-wrapper">
    <h2>AvatarDemo</h2>
    <AvatarDemo />
    <h2>LoadingDemo</h2>
    <LoadingDemo />
    <h2>LoadingDemo</h2>
    <LoadingDemo />
    <h2>BadgeDemo</h2>
    <BadgeDemo />
    <h2>IconDemo</h2>
    <IconDemo />
    <h2>MessageDemo</h2>
    <NoticeDemo />
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
import NoticeDemo from './examples/Notice.vue';
import IconDemo from './examples/Icon.vue';
import BadgeDemo from './examples/Badge.vue';
import LoadingDemo from './examples/Loading.vue';
import AvatarDemo from './examples/Avatar.vue';

export default {
  components: {
    AvatarDemo,
    ButtonDemo,
    InputDemo,
    CheckboxDemo,
    SwitchDemo,
    NoticeDemo,
    IconDemo,
    BadgeDemo,
    LoadingDemo,
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

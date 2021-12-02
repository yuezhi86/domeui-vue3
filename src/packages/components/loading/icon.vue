<template>
  <div class="de-loading-icon">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

const name = 'loading-icon';
export default defineComponent({
  name,
  setup() {
    return {};
  },
});
</script>

<style lang="less">
@import '../../styles/mixins';
@import '../../styles/variables';
@import './style/variables';

@keyframes loading-animation {
  50% {
    opacity: 0.2;
    transform: scale(0.75);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.de-loading-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  .padding-y(8px);

  > div {
    width: @de-loading-icon-dot-size;
    height: @de-loading-icon-dot-size;
    background-color: @de-loading-icon-dot-color;
    border-radius: 100%;
    animation: loading-animation 0.9s 0s infinite linear;

    &:nth-child(2n-1) {
      animation-delay: -0.35s;
    }
  }
}
</style>

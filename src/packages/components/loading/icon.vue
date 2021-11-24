<template>
  <div class="ball-beat">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'Loading',
});
</script>
<style lang="less">
@import '~@/assets/styles/variables';
@import '~@/assets/styles/mixins';

@keyframes ball-beat {
  50% {
    opacity: 0.2;
    -webkit-transform: scale(0.75);
    transform: scale(0.75);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

.ball-beat {
  display: inline-block;

  > div {
    display: inline-block;
    width: 12px;
    height: 12px;
    background-color: @color-primary;
    border-radius: 100%;
    animation: ball-beat 0.9s 0s infinite linear;

    &:nth-child(2n-1) {
      animation-delay: -0.35s !important;
    }
  }
}
</style>

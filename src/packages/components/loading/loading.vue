<template>
  <section
    v-if="show"
    :class="{
      'popup-loading': popupLoading,
      'has-mask': showMask || mask,
    }"
    class="loading"
  >
    <div class="loading-inner">
      <div class="img-box">
        <div class="img">
          <Loading />
        </div>
      </div>
      <p>
        <slot>{{ content }}</slot>
      </p>
    </div>
  </section>
</template>

<script>
import Loading from './icon';

export default {
  name: 'PageLoading',
  components: {
    Loading,
  },
  props: {
    showMask: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mask: false,
      popupLoading: false,
      show: false,
      content: '正在加载...',
    };
  },
  mounted() {
    this.show = true;
  },
  methods: {
    hide() {
      this.show = false;
      this.$nextTick(() => {
        this.$destroy();
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variables';
@import '~@/assets/styles/mixins';

.loading {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  color: #666;

  &.has-mask {
    background-color: rgba(255, 255, 255, 0.7);
  }

  &.popup-loading {
    position: fixed;
    z-index: 2000;

    .loading-inner {
      background-color: rgba(242, 244, 246, 0.7);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    }
  }

  .loading-inner {
    .position-center();
    top: 45%;
    padding-top: 19px;
    padding-bottom: 19px;
    width: 124px;
    border-radius: 8px;
    text-align: center;
  }

  p {
    margin-top: 10px;
    margin-left: 5px;
  }

  .img-box {
    overflow: hidden;
    position: relative;
    height: 55px;
    z-index: 3;
    margin: 0 auto;
    padding-top: 15px;
    border-radius: 50%;
    box-sizing: border-box;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    .img {
      position: relative;
      width: 100%;
      height: 100%;
      line-height: 40px;
    }
  }
}
</style>
<style>
.popup-loading-show {
  overflow: hidden !important;
}
</style>

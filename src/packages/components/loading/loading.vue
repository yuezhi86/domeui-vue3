<template>
  <section :class="classList">
    <div class="de-loading__inner" :style="innerStyleList">
      <div class="de-loading__icon">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="de-loading__text">
        <slot>{{ text }}</slot>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {getConfig} from '../../config';

const name = 'de-loading';
const loadingConfig = getConfig('loading');
export default defineComponent({
  name,
  props: {
    text: {
      type: String,
      default: '正在加载...',
    },
    size: {
      type: Number,
      default: loadingConfig.size,
    },
    mask: {
      type: Boolean,
      default: true,
    },
    fixed: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const classList = computed(() => [
      name,
      {
        [`${name}__mask`]: props.mask,
        [`${name}__fixed`]: props.fixed,
      },
    ]);
    const innerStyleList = computed(() => {
      const size = props.size ? `${props.size}px` : '';
      return {
        width: size,
        height: size,
      };
    });

    return {
      classList,
      innerStyleList,
    };
  },
});

const a = {
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

<style lang="less">
@import '../../styles/variables';
@import '../../styles/mixins';

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
    .absolute-center();
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

<template>
  <section :class="classList" :style="styleList">
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
import {getIndexZ} from '../../utils';

const name = 'de-loading';
const globalConfig = getConfig();
export default defineComponent({
  name,
  props: {
    text: {
      type: String,
      default: globalConfig.loading.text,
    },
    size: {
      type: Number,
      default: globalConfig.loading.size,
    },
    mask: {
      type: Boolean,
      default: globalConfig.loading.mask,
    },
    fixed: {
      type: Boolean,
      default: globalConfig.loading.fixed,
    },
    scale: {
      type: [String, Number],
      default: '',
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
    const styleList = computed(() => {
      return {
        zIndex: props.fixed ? getIndexZ() : globalConfig.loading.zIndex,
      };
    });
    const innerStyleList = computed(() => {
      const size = props.size ? `${props.size}px` : '';
      return {
        width: size,
        height: size,
        transform: props.scale ? `scale(${props.scale})` : '',
      };
    });

    return {
      classList,
      styleList,
      innerStyleList,
    };
  },
});
</script>

<style lang="less">
.loading {
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

<template>
  <section :class="classList" :style="styleList">
    <div class="de-loading__inner" :style="innerStyleList">
      <div v-if="showIcon" class="de-loading__icon">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div v-if="showText" :class="textClassList">
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
    showText: {
      type: Boolean,
      default: true,
    },
    showIcon: {
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
    const textClassList = computed(() => [
      `${name}__text`,
      {
        [`${name}__text-fade`]: props.showText && !props.showIcon,
      },
    ]);

    return {
      classList,
      styleList,
      innerStyleList,
      textClassList,
    };
  },
});
</script>

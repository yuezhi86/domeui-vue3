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
import {computed, defineComponent, PropType} from 'vue';
import {getConfig} from '../../config';
import {getIndexZ} from '../../utils';

const name = 'de-loading';
const globalConfig = getConfig();
export type LoadingTheme = 'white' | 'black' | 'transparent';
export default defineComponent({
  name,
  props: {
    text: {
      type: String,
      default: globalConfig.loading.text,
    },
    theme: {
      type: String as PropType<LoadingTheme | string>,
      default: globalConfig.loading.theme,
      validator: (v: string) => ['white', 'black'].includes(v) || !!v,
    },
    transparent: {
      type: Boolean,
      default: globalConfig.loading.transparent,
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
      `${name}__${props.theme}`,
      {
        [`${name}__mask`]: props.mask,
        [`${name}__fixed`]: props.fixed,
        [`${name}__transparent`]: props.transparent,
      },
    ]);
    const styleList = computed(() => {
      return {
        zIndex: props.fixed ? getIndexZ() : globalConfig.loading.zIndex,
      };
    });
    const innerStyleList = computed(() => {
      return {
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

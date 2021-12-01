<template>
  <div :class="classList">
    <div
      v-if="(isAlways && !isDot) || count"
      :class="countClassList"
      :style="countStyle"
    >
      <slot v-if="!isDot" name="count">{{ count }}</slot>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {computed, CSSProperties, defineComponent, PropType} from 'vue';

const name = 'de-badge';

export type BadgeTheme = 'number' | 'dot';
export type BadgeSize = 'small' | 'middle';
export type BadgeMode = 'auto' | 'always';
export type BadgeOffset = Array<number>;
export default defineComponent({
  name,
  props: {
    value: {
      type: [Number, String],
      default: 0,
    },
    overflow: {
      type: [Number, String],
      default: 0,
    },
    theme: {
      type: String as PropType<BadgeTheme>,
      default: 'number',
    },
    size: {
      type: String as PropType<BadgeSize>,
      default: 'middle',
    },
    mode: {
      type: String as PropType<BadgeMode>,
      default: 'auto',
    },
    textColor: {
      type: String,
      default: '',
    },
    backgroundColor: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    offset: {
      type: Array as PropType<BadgeOffset>,
      default: () => [-4, -6],
    },
  },
  setup(props) {
    const count = computed(() => {
      if (props.text) return props.text;
      if (props.overflow && props.value > +props.overflow) {
        return `${props.overflow}+`;
      } else {
        return props.value;
      }
    });
    const isDot = computed(() => props.theme === 'dot');
    const isAlways = computed(() => props.mode === 'always');
    const classList = computed(() => [name]);
    const countClassList = computed(() => [
      `${name}__count`,
      `${name}__${props.size}`,
      {
        [`${name}__${props.size}-dot`]: isDot.value,
      },
    ]);
    const countStyle = computed<CSSProperties>(() => {
      return {
        marginLeft: props.offset[0] + 'px',
        marginBottom: props.offset[1] + 'px',
        backgroundColor: props.backgroundColor,
        color: props.textColor,
      };
    });

    return {
      count,
      isDot,
      isAlways,
      classList,
      countClassList,
      countStyle,
    };
  },
});
</script>

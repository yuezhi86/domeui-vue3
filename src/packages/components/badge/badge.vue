<template>
  <div :class="classList">
    <div :class="countClassList" :style="countStyleList">
      <slot v-if="!isDot" name="count">{{ text || count }}</slot>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from 'vue';
import {BadgeTheme, BadgeSize, BadgeOffset} from '../../types';

const name = 'de-badge';
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
      if (props.overflow && props.value > +props.overflow) {
        return `${props.overflow}+`;
      } else {
        return props.value;
      }
    });
    const isDot = computed(() => props.theme === 'dot');
    const classList = computed(() => [name]);
    const countClassList = computed(() => [
      `${name}__count`,
      `${name}__${props.size}`,
      {
        [`${name}__${props.size}-dot`]: isDot.value,
      },
    ]);
    const countStyleList = computed(() => {
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
      classList,
      countClassList,
      countStyleList,
    };
  },
});
</script>

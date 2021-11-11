<template>
  <component v-bind="otherProps" :is="tagName" :class="classList">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import {defineComponent, computed, PropType} from 'vue';
import {ButtonNativeType, ButtonTheme, Size} from '../../types';

const name = 'de-button';
export default defineComponent({
  name,
  props: {
    theme: {
      type: String as PropType<ButtonTheme | string>,
      default: 'primary',
      validator: (v: string) =>
        ['primary', 'bright', 'second', 'text', 'default'].includes(v) || !!v,
    },
    size: {
      type: String as PropType<Size | string>,
      default: 'middle',
      validator: (v: string) =>
        ['xsmall', 'small', 'middle', 'large', 'xlarge'].includes(v) || !!v,
    },
    nativeType: {
      type: String as PropType<ButtonNativeType>,
      default: 'button',
      validator: (v: string) => ['button', 'submit', 'reset'].includes(v),
    },
    href: {
      type: String,
      default: '',
    },
    long: Boolean,
    plain: Boolean,
    round: Boolean,
    disabled: Boolean,
    replace: Boolean,
  },
  setup(props) {
    const tagName = computed(() => (props.href ? 'a' : 'button'));
    const otherProps = computed(() => {
      const attrs: {disabled?: string; href?: string; type?: string} = {};

      if (props.href) {
        attrs.href = props.href;
      } else {
        attrs.type = props.nativeType;
      }

      if (props.disabled) {
        attrs.disabled = 'disabled';
      }

      return attrs;
    });
    const classList = computed(() => {
      return [
        name,
        `${name}__${props.theme}`,
        `${name}__${props.size}`,
        {
          [`${name}__long`]: props.long,
          [`${name}__${props.theme}-plain`]: props.plain,
          [`${name}__${props.size}-round`]: props.round,
        },
      ];
    });

    return {
      tagName,
      classList,
      otherProps,
    };
  },
});
</script>

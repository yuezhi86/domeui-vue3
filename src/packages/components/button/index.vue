<template>
  <component v-bind="otherProps" :is="tagName" :class="classList">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import './index.less';
import {defineComponent, computed} from 'vue';

const name = 'de-button';
export default defineComponent({
  name,
  props: {
    type: {
      default: 'primary',
      validator: (v: string) =>
        ['primary', 'bright', 'second', 'text', 'default'].includes(v) || !!v,
    },
    size: {
      default: 'middle',
      validator: (v: string) =>
        ['xsmall', 'small', 'middle', 'large', 'xlarge'].includes(v) || !!v,
    },
    htmlType: {
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
        attrs.type = props.htmlType;
      }

      if (props.disabled) {
        attrs.disabled = 'disabled';
      }

      return attrs;
    });
    const classList = computed(() => {
      return [
        name,
        `${name}__${props.type}`,
        `${name}__${props.size}`,
        {
          [`${name}__long`]: props.long,
          [`${name}__${props.type}-plain`]: props.plain,
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

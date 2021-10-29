<template>
  <component
    v-bind="otherProps"
    :is="tagName"
    :class="classList"
    :disabled="disabled"
    @click="onClick"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts">
import './index.less';
import {defineComponent, ref, computed} from 'vue';

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
        ['xsmall', 'small', 'middle', 'large', 'xlarge', 'default'].includes(
          v
        ) || !!v,
    },
    htmlType: {
      default: 'button',
      validator: (v: string) => ['button', 'submit', 'reset'].includes(v),
    },
    to: {
      type: [String, Object],
      default: '',
    },
    target: {
      type: String,
      default: '_self',
      validator: (v: string) => ['_self', '_blank'].includes(v) || !!v,
    },
    long: Boolean,
    plain: Boolean,
    disabled: Boolean,
    replace: Boolean,
  },
  emits: ['onClick'],
  setup(props, {emit}) {
    const tagName = ref(props.to ? 'a' : 'button');
    const otherProps = ref({});

    const classList = computed(() => {
      return [
        name,
        `${name}__${props.type}`,
        `${name}__${props.size}`,
        {
          [`${name}__long`]: props.long,
          [`${name}__${props.type}-plain`]: props.plain,
        },
      ];
    });

    return {
      tagName,
      classList,
      otherProps,
      onClick(e: Event) {
        emit('onClick', e);
      },
    };
  },
});
</script>

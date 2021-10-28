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
      validator: (value: string) =>
        ['primary', 'bright', 'second', 'text', 'default'].includes(value),
    },
    size: {
      default: 'middle',
      validator: (value: string) =>
        ['xsmall', 'small', 'middle', 'large', 'xlarge', 'default'].includes(
          value
        ),
    },
    long: Boolean,
    plain: Boolean,
    disabled: Boolean,
    htmlType: {
      default: 'button',
      validator: (value: string) =>
        ['button', 'submit', 'reset'].includes(value),
    },
    to: {
      type: [String, Object],
      default: '',
    },
  },
  emits: ['onClick'],
  setup(props, {emit}) {
    const tagName = ref(props.to ? 'a' : 'button');
    const otherProps = ref({});
    const classList = computed(() => {
      return [
        name,
        {
          [`${name}__long`]: props.long,
          [`${name}__${props.type}`]: props.type !== 'default',
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

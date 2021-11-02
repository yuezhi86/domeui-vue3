<template>
  <label>
    <slot></slot>
  </label>
</template>

<script lang="ts">
import './index.less';
// import {ref} from 'vue';

const name = 'de-checkbox';
export default {
  name,
  props: {
    modelValue: Boolean,
    name: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'default',
      validator: (v: string) => ['default'].includes(v) || !!v,
    },
    htmlType: {
      type: String,
      default: 'checkbox',
      validator: (v: string) => ['checkbox', 'radio'].includes(v),
    },
    indeterminate: Boolean,
    disabled: Boolean,
  },
  emits: ['update:modelValue', 'onChange', 'onClick'],
  setup() {
    return {};
  },
};
</script>

<style scoped></style>

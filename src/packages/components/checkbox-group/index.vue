<template>
  <div :class="classList">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import './index.less';
import {defineComponent, computed, provide} from 'vue';
import {CheckboxValue} from '../../types';

const name = 'de-checkbox-group';
export default defineComponent({
  name,
  props: {
    modelValue: {
      type: [String, Number, Array],
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    htmlType: {
      type: String,
      default: 'checkbox',
      validator: (v: string) => ['checkbox', 'radio'].includes(v),
    },
    radioOptional: Boolean,
    disabled: Boolean,
    vertical: Boolean,
  },
  emits: ['update:modelValue', 'onChange'],
  setup(props, {emit}) {
    const _name = computed(() => props.name);
    const _htmlType = computed(() => props.htmlType);
    const _disabled = computed(() => props.disabled);
    const _radioOptional = computed(() => props.radioOptional);
    const _modelValue = computed(() => props.modelValue);
    const classList = computed(() => [
      name,
      {
        [`${name}__vertical`]: props.vertical,
      },
    ]);

    const update = (value: CheckboxValue) => {
      emit('update:modelValue', value);
      emit('onChange', value);
    };

    provide('group', true);
    provide('name', _name);
    provide('htmlType', _htmlType);
    provide('disabled', _disabled);
    provide('radioOptional', _radioOptional);
    provide('modelValue', _modelValue);
    provide('update', update);

    return {
      classList,
    };
  },
});
</script>

<template>
  <div :class="wrapClassList" @click="onChange">
    <span :class="iconClassList">
      <i class="de-checkbox__icon-inner"></i>
    </span>
    <slot>{{ label }}</slot>
  </div>
</template>

<script lang="ts">
import './index.less';
import {defineComponent, ref, computed, watchEffect} from 'vue';

const name = 'de-checkbox';
export default defineComponent({
  name,
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number, Boolean],
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    htmlType: {
      type: String,
      default: 'checkbox',
      validator: (v: string) => ['checkbox', 'radio'].includes(v),
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: undefined,
    },
    radioOptional: Boolean,
    indeterminate: Boolean,
    disabled: Boolean,
  },
  emits: ['update:modelValue', 'onChange', 'onBeforeChange'],
  setup(props, {emit}) {
    const value = ref<boolean | string | number>('');
    const isChecked = ref(false);
    const isRadio = computed(() => props.htmlType === 'radio');
    const wrapClassList = computed(() => {
      return [
        name,
        {
          [`${name}__disabled`]: props.disabled,
          [`${name}__checked`]: isChecked.value,
        },
      ];
    });
    const iconClassList = computed(() => {
      const _name = `${name}__icon`;
      return [
        _name,
        {
          [`${_name}-radio`]: isRadio.value,
          [`${_name}-checkbox`]: !isRadio.value,
        },
      ];
    });

    const update = () => {
      if (isRadio.value && isChecked.value && !props.radioOptional) return;
      isChecked.value = !isChecked.value;
      emit('onBeforeChange', value.value);
      value.value = isChecked.value
        ? props.value
        : props.falseValue || getDefVal(props.value);
      emit('onChange', {
        checked: isChecked.value,
        value: value.value,
      });
    };

    watchEffect(() => {
      isChecked.value = props.modelValue === props.value;
    });

    return {
      isChecked,
      wrapClassList,
      iconClassList,
      onChange() {
        if (props.disabled) return;
        update();
        emit('update:modelValue', value.value);
      },
    };
  },
});

function getDefVal(value: number | string | boolean) {
  switch (typeof value) {
    case 'number':
    case 'string':
      return '';
    case 'boolean':
      return false;
  }
}
</script>

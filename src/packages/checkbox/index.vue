<template>
  <label :class="wrapClassList">
    <span :class="iconClassList">
      <i class="de-checkbox__icon-inner"></i>
      <input
        :type="pHtmlType || htmlType"
        :name="pName || name"
        :checked="isChecked"
        :disabled="isDisabled"
        class="de-checkbox__ipt"
        @focus="onFocus"
        @blur="onBlur"
        @click="onClick"
      />
    </span>
    <slot>{{ label }}</slot>
  </label>
</template>

<script lang="ts">
import './index.less';
import {defineComponent, ref, computed, watchEffect, inject} from 'vue';

type PModelValue = string | number | boolean;
const DEFAULT_HTML_TYPE = 'checkbox';
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
      default: DEFAULT_HTML_TYPE,
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
  emits: [
    'update:modelValue',
    'update:indeterminate',
    'onChange',
    'onBeforeChange',
  ],
  setup(props, {emit}) {
    const pName = inject('name', {value: ''});
    const pHtmlType = inject('htmlType', {value: DEFAULT_HTML_TYPE});
    const pDisabled = inject('disabled', {value: false});
    const pModelValue = inject<{value: PModelValue | Array<PModelValue>}>(
      'modelValue',
      {
        value: '',
      }
    );
    const pUpdate = inject<Function | null>('update', null);
    const value = ref<boolean | string | number>('');
    const isFocus = ref(false);
    const isChecked = ref(false);
    const isRadio = computed(() => props.htmlType === 'radio');
    const isDisabled = computed(() => pDisabled.value || props.disabled);
    const wrapClassList = computed(() => {
      return [
        name,
        {
          [`${name}__disabled`]: isDisabled.value,
          [`${name}__checked`]: isChecked.value,
          [`${name}__focus`]: isFocus.value,
          [`${name}__indeterminate`]: props.indeterminate && !isChecked.value,
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
    const updateParent = () => {
      if (typeof pUpdate !== 'function') return;
      if (isRadio.value) {
        pUpdate(value.value);
        return;
      }

      const _pModelValue = Array.isArray(pModelValue.value)
        ? [...pModelValue.value]
        : [];
      if (isChecked.value) {
        pUpdate([...new Set([..._pModelValue, value.value])]);
      } else {
        const index = _pModelValue.findIndex((item) => item === props.value);
        if (index === -1) return;
        _pModelValue.splice(index, 1);
        pUpdate([..._pModelValue]);
      }
    };

    watchEffect(() => {
      isChecked.value = props.modelValue === props.value;
    });

    return {
      pName,
      pHtmlType,
      isDisabled,
      isChecked,
      wrapClassList,
      iconClassList,
      onClick() {
        if (isDisabled.value) return;
        update();
        updateParent();
        emit('update:indeterminate', false);
        emit('update:modelValue', value.value);
      },
      onFocus() {
        isFocus.value = true;
      },
      onBlur() {
        isFocus.value = false;
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

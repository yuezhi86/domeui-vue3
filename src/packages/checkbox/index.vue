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
import {CheckboxValue} from '@/index.d';

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
    const inGroup = inject('group', false);
    const pName = inject('name', '');
    const pHtmlType = inject<{value: 'radio' | 'checkbox'} | null>(
      'htmlType',
      null
    );
    const pDisabled = inject<{value: boolean} | null>('disabled', null);
    const pRadioOptional = inject<{value: boolean} | null>(
      'radioOptional',
      null
    );
    const pModelValue = inject<{value: CheckboxValue | Array<CheckboxValue>}>(
      'modelValue',
      {
        value: '',
      }
    );
    const pUpdate = inject<Function | null>('update', null);
    const value = ref<CheckboxValue>('');
    const isFocus = ref(false);
    const isChecked = ref(false);
    const isRadio = computed(
      () =>
        (pHtmlType && pHtmlType.value === 'radio') || props.htmlType === 'radio'
    );
    const isDisabled = computed(() => {
      if (pDisabled !== null) return pDisabled.value || props.disabled;
      return props.disabled;
    });
    const isRadioOptional = computed(() => {
      if (pRadioOptional !== null) {
        return pRadioOptional.value || props.radioOptional;
      }

      return props.radioOptional;
    });
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
      if (isRadio.value && isChecked.value && !isRadioOptional.value) return;
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
      if (inGroup) {
        if (isRadio.value) {
          isChecked.value = pModelValue.value === props.value;
          return;
        }

        if (Array.isArray(pModelValue.value)) {
          isChecked.value = pModelValue.value.includes(props.value);
        }
      } else {
        isChecked.value = props.modelValue === props.value;
      }
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

function getDefVal(value: CheckboxValue) {
  switch (typeof value) {
    case 'number':
    case 'string':
      return '';
    case 'boolean':
      return false;
  }
}
</script>

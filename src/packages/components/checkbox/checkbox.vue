<template>
  <label :class="wrapClassList">
    <span :class="iconClassList">
      <i class="de-checkbox__icon-inner"></i>
      <input
        ref="input"
        :type="pNativeType || nativeType"
        :name="pName || name"
        :checked="isChecked"
        :disabled="isDisabled"
        :value="trueValue"
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
import {
  defineComponent,
  ref,
  computed,
  watchEffect,
  inject,
  PropType,
  Ref,
} from 'vue';
import {getUncheckedDefaultValue} from '../../utils/assist';
import {Numberish} from '../../config';

const DEFAULT_HTML_TYPE = 'checkbox';
const name = 'de-checkbox';

export type CheckboxValue = Numberish | boolean;
export type CheckboxNativeType = 'checkbox' | 'radio';
export default defineComponent({
  name,
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: '',
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true,
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    nativeType: {
      type: String as PropType<CheckboxNativeType>,
      default: DEFAULT_HTML_TYPE,
      validator: (v: string) => ['checkbox', 'radio'].includes(v),
    },
    radioOptional: Boolean,
    indeterminate: Boolean,
    disabled: Boolean,
  },
  emits: [
    'update:modelValue',
    'update:indeterminate',
    'change',
    'before-change',
  ],
  setup(props, {emit}) {
    const inGroups = inject('group', false);
    const pName = inject('name', '');
    const pNativeType = inject<Ref<'radio' | 'checkbox'> | null>(
      'nativeType',
      null
    );
    const pDisabled = inject<Ref<boolean> | null>('disabled', null);
    const pRadioOptional = inject<Ref<boolean> | null>('radioOptional', null);
    const pModelValue = inject<Ref<CheckboxValue | CheckboxValue[]> | null>(
      'modelValue',
      null
    );
    const pUpdate = inject<Function | null>('update', null);

    const value = ref<CheckboxValue>('');
    const isFocus = ref(false);
    const isChecked = ref(false);
    const isRadio = computed(
      () =>
        (pNativeType && pNativeType.value === 'radio') ||
        props.nativeType === 'radio'
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

    const setValue = (isChecked: boolean) => {
      value.value = isChecked
        ? props.trueValue
        : getUncheckedDefaultValue(props.trueValue, props.falseValue);
    };
    const handle = () => {
      if (isRadio.value && isChecked.value && !isRadioOptional.value) return;
      isChecked.value = !isChecked.value;
      emit('before-change', value.value);
      setValue(isChecked.value);
      emit('change', {
        checked: isChecked.value,
        value: value.value,
      });
    };
    const updateParent = () => {
      if (typeof pUpdate !== 'function') return;
      if (isRadio.value) {
        return pUpdate(value.value);
      }

      const _pModelValue =
        pModelValue && Array.isArray(pModelValue.value)
          ? [...pModelValue.value]
          : [];
      if (isChecked.value) {
        pUpdate([...new Set([..._pModelValue, value.value])]);
        return;
      }

      const index = _pModelValue.findIndex((item) => item === props.trueValue);
      if (index === -1) return;
      _pModelValue.splice(index, 1);
      pUpdate([..._pModelValue]);
    };

    watchEffect(() => {
      if (!inGroups) {
        isChecked.value = props.modelValue === props.trueValue;
        setValue(isChecked.value);
        return;
      }

      if (isRadio.value) {
        isChecked.value = pModelValue?.value === props.trueValue;
        setValue(isChecked.value);
        return;
      }

      if (pModelValue && Array.isArray(pModelValue.value)) {
        isChecked.value = pModelValue.value.includes(props.trueValue);
        setValue(isChecked.value);
      }
    });

    return {
      pName,
      pNativeType,
      isDisabled,
      isChecked,
      wrapClassList,
      iconClassList,
      onClick() {
        if (isDisabled.value) return;
        handle();
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
</script>

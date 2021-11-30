<template>
  <div
    tabindex="0"
    :class="classList"
    :style="styleList"
    @click="onToggle"
    @keydown.space="onToggle"
  >
    <input ref="input" type="hidden" :name="name" :value="value" />
    <div class="de-switch__inner">
      <span v-show="isChecked" class="de-switch__text de-switch__text-on">
        <slot name="on"></slot>
      </span>
      <i class="de-switch__i" :style="iStyleList"></i>
      <span v-show="!isChecked" class="de-switch__text de-switch__text-off">
        <slot name="off"></slot>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed, watchEffect, PropType} from 'vue';
import {CheckboxValue} from '../checkbox';
import {getSizeOrPx, getUncheckedDefaultValue} from '../../utils/assist';

const name = 'de-switch';
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
    theme: {
      type: String as PropType<'primary' | 'success' | string>,
      default: 'primary',
      validator: (v: string) => ['primary', 'success'].includes(v) || !!v,
    },
    width: {
      type: [Number, String],
      default: 50,
    },
    height: {
      type: [Number, String],
      default: 22,
    },
    disabled: Boolean,
    beforeChange: {
      type: Function as PropType<(checked?: boolean) => Promise<void>>,
      default: undefined,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, {emit}) {
    const isChecked = ref(false);
    const value = ref<CheckboxValue>('');
    const classList = computed(() => [
      name,
      `${name}__${props.theme}`,
      {
        [`${name}__disabled`]: props.disabled,
        [`${name}__checked`]: isChecked.value,
      },
    ]);
    const styleList = computed(() => {
      return {
        width: getSizeOrPx(props.width),
        height: getSizeOrPx(props.height),
        borderRadius: getSizeOrPx(props.height),
      };
    });
    const iStyleList = computed(() => {
      const size = `${parseFloat(getSizeOrPx(props.height)) - 4}px`;
      return {
        width: size,
        height: size,
        borderRadius: size,
      };
    });

    const setValue = (isChecked: boolean) => {
      value.value = isChecked
        ? props.trueValue
        : getUncheckedDefaultValue(props.trueValue, props.falseValue);
    };
    const handle = () => {
      isChecked.value = !isChecked.value;
      setValue(isChecked.value);
      emit('update:modelValue', value.value);
      emit('change', {
        checked: isChecked.value,
        value: value.value,
      });
    };

    watchEffect(() => {
      isChecked.value = props.modelValue === props.trueValue;
      setValue(isChecked.value);
    });

    return {
      classList,
      styleList,
      iStyleList,
      isChecked,
      value,
      onToggle(e: Event) {
        e.preventDefault();
        if (props.disabled) return;
        if (!props.beforeChange) return handle();

        const before = props.beforeChange(isChecked.value);
        if (before && before.then) {
          before.then(() => {
            handle();
          });
        } else {
          handle();
        }
      },
    };
  },
});
</script>

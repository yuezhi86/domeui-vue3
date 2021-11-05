<template>
  <div
    tabindex="0"
    :class="classList"
    :style="styleList"
    @click="onToggle"
    @keydown.space="onToggle"
  >
    <input type="hidden" :name="name" :value="value" />
    <div class="de-switch__inner">
      <span v-show="isChecked" class="de-switch__text">
        <slot name="on"></slot>
      </span>
      <i class="de-switch__i" :style="iStyleList"></i>
      <span v-show="!isChecked" class="de-switch__text">
        <slot name="off"></slot>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import './index.less';
import {defineComponent, ref, computed, watchEffect, PropType} from 'vue';
import {CheckboxValue} from '../../types';
import {getUncheckedDefaultValue} from '../../utils/assist';

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
    type: {
      type: String,
      default: 'primary',
      validator: (v: string) => ['primary', 'success'].includes(v) || !!v,
    },
    width: {
      type: Number,
      default: 50,
    },
    height: {
      type: Number,
      default: 22,
    },
    disabled: Boolean,
    beforeChange: {
      type: Function as PropType<(checked?: boolean) => Promise<void>>,
      default: undefined,
    },
  },
  emits: ['update:modelValue', 'onChange'],
  setup(props, {emit}) {
    const isChecked = ref(false);
    const value = ref<CheckboxValue>('');
    const classList = computed(() => [
      name,
      `${name}__${props.type}`,
      {
        [`${name}__disabled`]: props.disabled,
        [`${name}__checked`]: isChecked.value,
      },
    ]);
    const styleList = computed(() => {
      return {
        width: `${props.width}px`,
        height: `${props.height}px`,
        borderRadius: `${props.height}px`,
      };
    });
    const iStyleList = computed(() => {
      const size = `${props.height - 4}px`;
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
      emit('onChange', {
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

<template>
  <div
    tabindex="0"
    :class="classList"
    :style="styleList"
    @click="onTrigger"
    @keyup.space="onTrigger"
  >
    <input type="hidden" :name="name" :value="value" />
    <div class="de-switch__inner">
      <i class="de-switch__i" :style="iStyleList"></i>
    </div>
  </div>
</template>

<script lang="ts">
import './index.less';
import {defineComponent, ref, computed} from 'vue';
import {CheckboxValue} from '../types';
// import {getUncheckedDefaultValue} from '../utils/assist';

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
      type: Promise,
      default: undefined,
    },
  },
  emits: ['update:modelValue', 'onChange'],
  setup(props) {
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

    return {
      classList,
      styleList,
      iStyleList,
      value,
      onTrigger() {
        if (props.disabled) return;
        isChecked.value = !isChecked.value;
      },
    };
  },
});
</script>

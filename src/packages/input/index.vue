<template>
  <div :class="wrapClassList">
    <component
      v-bind="textareaProps"
      :is="tagName"
      :id="inputId"
      ref="input"
      :name="name"
      :type="htmlType"
      :value="value"
      :class="inputClassList"
      :style="inputStyleList"
      :minlength="minlength"
      :maxlength="maxlength"
      :readonly="readonly"
      :disabled="disabled"
      :autofocus="autofocus"
      :autocomplete="autocomplete"
      :spellcheck="spellcheck"
      :tabindex="tabindex"
      :placeholder="placeholder"
      @input="onInput"
    />
    <div v-if="hasKit" class="de-input__kit">
      <i v-if="hasClear" class="de-input__clear" @click.stop="onClear"></i>
      <div v-if="hasCounter" class="de-input__counter">
        <em>{{ currentLength }}</em>
        /
        <span>{{ maxlength }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import './index.less';
import {defineComponent, ref, computed, watchEffect} from 'vue';

const name = 'de-input';
export default defineComponent({
  name,
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'input',
      validator: (v: string) => ['input', 'textarea'].includes(v),
    },
    size: {
      default: 'middle',
      validator: (v: string) =>
        ['xsmall', 'small', 'middle', 'large', 'xlarge'].includes(v) || !!v,
    },
    htmlType: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
      default: '',
    },
    inputId: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: '',
    },
    counter: {
      type: Boolean,
      default: true,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    minlength: {
      type: [Number, String],
      default: 0,
    },
    maxlength: {
      type: [Number, String],
      default: 30,
    },
    tabindex: {
      type: [Number, String],
      default: undefined,
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    cols: {
      type: [Number, String],
      default: 5,
    },
    wrap: {
      type: String,
      default: 'soft',
      validator: (v: string) => ['soft', 'hard'].includes(v),
    },
    resize: {
      type: String,
      default: 'none',
      validator: (v: string) =>
        ['none', 'both', 'vertical', 'horizontal'].includes(v),
    },
    long: Boolean,
    spellcheck: Boolean,
    autofocus: Boolean,
    disabled: Boolean,
    readonly: Boolean,
  },
  emits: ['update:modelValue', 'onInput', 'onClear'],
  setup(props, {emit}) {
    const value = ref<string | number>('');
    const input = ref(null);
    const isInput = computed(() => props.type === 'input');
    const isFocus = ref(false);
    const tagName = computed(() => (isInput.value ? 'input' : 'textarea'));
    const currentLength = ref(0);
    const hasClear = computed(
      () =>
        props.clearable &&
        !props.disabled &&
        !props.readonly &&
        !!currentLength.value
    );
    const hasCounter = computed(
      () => props.counter && !props.disabled && !props.readonly
    );
    const hasKit = computed(() => !props.disabled && !props.readonly);
    const wrapClassList = computed(() => {
      return [
        name,
        `${name}__${props.size}`,
        {
          [`${name}__long`]: props.long,
          [`${name}__focus`]: isFocus.value,
        },
      ];
    });
    const inputStyleList = computed(() => {
      return isInput.value
        ? {}
        : {
            resize: props.resize,
          };
    });
    const inputClassList = computed(() => {
      const _name = `${name}__ipt`;
      return [_name];
    });
    const textareaProps = computed(() => {
      return isInput.value
        ? {}
        : {
            rows: props.cols,
            wrap: props.wrap,
          };
    });

    watchEffect(() => {
      value.value = props.modelValue;
      currentLength.value = `${props.modelValue}`.length;
    });

    return {
      tagName,
      isInput,
      isFocus,
      input,
      value,
      wrapClassList,
      inputStyleList,
      inputClassList,
      textareaProps,
      currentLength,
      hasKit,
      hasClear,
      hasCounter,
      onInput(e: InputEvent) {
        emit('onInput', e);
        emit('update:modelValue', (e.target as HTMLInputElement).value);
      },
      onClear() {
        emit('update:modelValue', '');
        emit('onClear');
      },
    };
  },
});
</script>

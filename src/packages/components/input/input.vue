<template>
  <div :class="wrapClassList">
    <template v-if="type === 'input'">
      <div v-if="prefix" class="de-input__prefix" :style="prefixStyle">
        <slot name="prefix">{{ prefix }}</slot>
      </div>

      <slot name="prepend"></slot>
    </template>

    <component
      v-bind="textareaProps"
      :is="tagName"
      :id="elementId"
      ref="input"
      :name="name"
      :type="nativeType"
      :value="value"
      class="de-input__ipt"
      :style="inputStyle"
      :minlength="minlength"
      :maxlength="+maxlength ? maxlength : ''"
      :readonly="readonly"
      :disabled="disabled"
      :autofocus="autofocus"
      :autocomplete="autocomplete"
      :spellcheck="spellcheck"
      :tabindex="tabindex"
      :placeholder="placeholder"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      @keydown="onKeydown"
      @keyup="onKeyup"
      @keyup.enter="onEnter"
      @keypress="onKeypress"
      @select="onSelect"
      @compositionstart="onComposition"
      @compositionupdate="onComposition"
      @compositionend="onComposition"
    />

    <div v-if="isAlive" class="de-input__kit">
      <i v-if="hasClear" class="de-input__clear" @click.stop="onClear"></i>
      <span v-if="hasCounter" class="de-input__counter" @click.stop="focus">
        <em>{{ currentLength }}</em> /{{ maxlength }}
      </span>
    </div>

    <template v-if="type === 'input'">
      <slot name="append"></slot>

      <div v-if="suffix" class="de-input__suffix" :style="suffixStyle">
        <slot name="suffix">{{ suffix }}</slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watch,
  PropType,
  CSSProperties,
} from 'vue';
import {Numberish} from '../../config';
import {getSizeOrPx} from '../../utils';

const name = 'de-input';

export type InputType = 'input' | 'textarea';
export type InputSize = 'xsmall' | 'small' | 'middle' | 'large' | 'xlarge';
export type TextareaWrap = 'soft' | 'hard';
export type TextareaResize = 'none' | 'both' | 'vertical' | 'horizontal';
export type InputModifiers = {
  uppercase: boolean;
  trim: boolean;
  lazy: boolean;
};
export default defineComponent({
  name,
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    modelModifiers: {
      type: Object as PropType<InputModifiers>,
      default: () => ({}),
    },
    type: {
      type: String as PropType<InputType>,
      default: 'input',
      validator: (v: string) => ['input', 'textarea'].includes(v),
    },
    size: {
      type: String as PropType<InputSize | string>,
      default: 'middle',
      validator: (v: string) =>
        ['xsmall', 'small', 'middle', 'large', 'xlarge'].includes(v) || !!v,
    },
    nativeType: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
      default: '',
    },
    elementId: {
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
      type: String as PropType<TextareaWrap>,
      default: 'soft',
      validator: (v: string) => ['soft', 'hard'].includes(v),
    },
    resize: {
      type: String as PropType<TextareaResize>,
      default: 'none',
      validator: (v: string) =>
        ['none', 'both', 'vertical', 'horizontal'].includes(v),
    },
    long: Boolean,
    spellcheck: Boolean,
    autofocus: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    initUppercase: Boolean,
    prefix: {
      type: String,
      default: '',
    },
    suffix: {
      type: String,
      default: '',
    },
    prefixWidth: {
      type: [Number, String],
      default: undefined,
    },
    suffixWidth: {
      type: [Number, String],
      default: undefined,
    },
  },
  emits: [
    'update:modelValue',
    'input',
    'change',
    'focus',
    'blur',
    'select',
    'keyup',
    'keydown',
    'keypress',
    'enter',
    'clear',
    'composition',
  ],
  setup(props, {emit}) {
    const input = ref<any>(null);
    const value = ref<Numberish>('');
    const currentLength = ref(0);
    const isOnComposition = ref(false);
    const isFocus = ref(false);
    const isInput = computed(() => props.type === 'input');
    const isAlive = computed(() => !props.disabled && !props.readonly);
    const tagName = computed(() => (isInput.value ? 'input' : 'textarea'));
    const textareaProps = computed(() => {
      return isInput.value
        ? {}
        : {
            rows: props.cols,
            wrap: props.wrap,
          };
    });
    const hasClear = computed(() => {
      return (
        props.clearable &&
        !props.disabled &&
        !props.readonly &&
        !!currentLength.value
      );
    });
    const hasCounter = computed(() => {
      return (
        +props.maxlength && props.counter && !props.disabled && !props.readonly
      );
    });

    const wrapClassList = computed(() => {
      return [
        name,
        {
          [`${name}__${props.size}`]: isInput.value,
          [`${name}__textarea`]: !isInput.value,
          [`${name}__has-kit`]: !isInput.value && isAlive.value,
          [`${name}__focus`]: isAlive.value && isFocus.value,
          [`${name}__long`]: props.long,
          [`${name}__readonly`]: props.readonly,
          [`${name}__disabled`]: props.disabled,
        },
      ];
    });
    const inputStyle = computed<CSSProperties>(() => {
      return isInput.value
        ? {}
        : {
            resize: props.resize,
          };
    });
    const prefixStyle = computed<CSSProperties>(() => {
      return {
        width: getSizeOrPx(props.prefixWidth),
      };
    });
    const suffixStyle = computed<CSSProperties>(() => {
      return {
        width: getSizeOrPx(props.suffixWidth),
      };
    });

    watch(
      () => props.modelValue,
      (newValue) => {
        const _val = `${newValue}`;
        value.value = _val;
        currentLength.value = _val.length;
      },
      {
        immediate: true,
      }
    );

    if (props.initUppercase) {
      value.value = `${value.value}`.toUpperCase();
      emit('update:modelValue', value.value);
    }

    const focus = () => {
      input.value.focus();
    };

    const updateHandle = (e: InputEvent) => {
      if (isOnComposition.value) return;
      let value = (e.target as HTMLInputElement).value;

      if (props.modelModifiers?.trim) {
        value = String(value ?? '').trim();
      }

      if (props.modelModifiers?.uppercase) {
        value = value.toUpperCase();
      }

      emit('update:modelValue', value);
    };

    return {
      input,
      focus,
      tagName,
      textareaProps,
      value,
      currentLength,
      isInput,
      isFocus,
      wrapClassList,
      inputStyle,
      prefixStyle,
      suffixStyle,
      isAlive,
      hasClear,
      hasCounter,
      onInput(e: InputEvent) {
        emit('input', e);
        if (props.modelModifiers?.lazy) return;
        updateHandle(e);
      },
      onChange(e: InputEvent) {
        emit('change', e);
        if (props.modelModifiers?.lazy) {
          updateHandle(e);
        }
      },
      onClear() {
        emit('update:modelValue', '');
        emit('change', '');
        emit('clear');
      },
      onComposition(e: InputEvent) {
        emit('composition', e);

        if (e.type === 'compositionstart') {
          isOnComposition.value = true;
        }

        if (e.type === 'compositionend') {
          isOnComposition.value = false;
          updateHandle(e);
        }
      },
      onBlur(e: InputEvent) {
        isFocus.value = false;
        emit('blur', e);
      },
      onFocus(e: InputEvent) {
        isFocus.value = true;
        emit('focus', e);
      },
      onSelect(e: InputEvent) {
        emit('select', e);
      },
      onKeyup(e: InputEvent) {
        emit('keyup', e);
      },
      onEnter(e: InputEvent) {
        emit('enter', e);
      },
      onKeypress(e: InputEvent) {
        emit('keypress', e);
      },
      onKeydown(e: InputEvent) {
        emit('keydown', e);
      },
    };
  },
});
</script>

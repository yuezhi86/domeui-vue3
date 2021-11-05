<template>
  <div :class="wrapClassList">
    <component
      v-bind="textareaProps"
      :is="tagName"
      :id="elementId"
      ref="input"
      :name="name"
      :type="htmlType"
      :value="value"
      class="de-input__ipt"
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
      <span v-if="hasCounter" class="de-input__counter">
        <em>{{ currentLength }}</em> /{{ maxlength }}
      </span>
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
  emits: [
    'update:modelValue',
    'onInput',
    'onChange',
    'onFocus',
    'onBlur',
    'onSelect',
    'onKeyup',
    'onKeydown',
    'onKeypress',
    'onEnter',
    'onClear',
    'onComposition',
  ],
  setup(props, {emit}) {
    const value = ref<string | number>('');
    const currentLength = ref(0);
    const isOnComposition = ref(false);
    const isFocus = ref(false);
    const isInput = computed(() => props.type === 'input');
    const isAlive = computed(() => !props.disabled && !props.readonly);

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
    const inputStyleList = computed(() => {
      return isInput.value
        ? {}
        : {
            resize: props.resize,
          };
    });

    watchEffect(() => {
      const _val = `${props.modelValue}`;
      value.value = _val;
      currentLength.value = _val.length;
    });

    const onInput = (e: InputEvent) => {
      if (isOnComposition.value) return;
      emit('onInput', e);
      emit('update:modelValue', (e.target as HTMLInputElement).value);
    };

    return {
      input: ref(null),
      tagName: computed(() => (isInput.value ? 'input' : 'textarea')),
      textareaProps: computed(() => {
        return isInput.value
          ? {}
          : {
              rows: props.cols,
              wrap: props.wrap,
            };
      }),
      value,
      currentLength,
      isInput,
      isFocus,
      wrapClassList,
      inputStyleList,
      isAlive,
      hasClear: computed(
        () =>
          props.clearable &&
          !props.disabled &&
          !props.readonly &&
          !!currentLength.value
      ),
      hasCounter: computed(
        () => props.counter && !props.disabled && !props.readonly
      ),
      onInput,
      onComposition(e: InputEvent) {
        emit('onComposition', e);

        if (e.type === 'compositionstart') {
          isOnComposition.value = true;
        }

        if (e.type === 'compositionend') {
          isOnComposition.value = false;
          onInput(e);
        }
      },
      onClear() {
        emit('update:modelValue', '');
        emit('onClear');
      },
      onBlur(e: InputEvent) {
        isFocus.value = false;
        emit('onBlur', e);
      },
      onFocus(e: InputEvent) {
        isFocus.value = true;
        emit('onFocus', e);
      },
      onChange(e: InputEvent) {
        emit('onChange', e);
      },
      onSelect(e: InputEvent) {
        emit('onSelect', e);
      },
      onKeyup(e: InputEvent) {
        emit('onKeyup', e);
      },
      onEnter(e: InputEvent) {
        emit('onEnter', e);
      },
      onKeypress(e: InputEvent) {
        emit('onKeypress', e);
      },
      onKeydown(e: InputEvent) {
        emit('onKeydown', e);
      },
    };
  },
});
</script>

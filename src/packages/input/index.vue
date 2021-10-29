<template>
  <div :class="classList">
    <input
      :id="inputId"
      ref="input"
      :type="type"
      :value="value"
      class="de-input__ipt"
      :name="name"
      :disabled="disabled"
      :readonly="readonly"
      :autofocus="autofocus"
      :autocomplete="autocomplete"
      :spellcheck="spellcheck"
      :tabindex="tabindex"
      :placeholder="placeholder"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed} from 'vue';

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
    long: Boolean,
    spellcheck: Boolean,
    autofocus: Boolean,
    disabled: Boolean,
    readonly: Boolean,
  },
  setup() {
    const value = ref('');
    const input = ref(null);
    const classList = computed(() => {
      return [name];
    });

    return {
      input,
      value,
      classList,
    };
  },
});
</script>

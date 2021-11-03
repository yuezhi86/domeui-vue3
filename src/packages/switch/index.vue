<template>
  <div :class="classList">
    <input type="hidden" :name="name" />
  </div>
</template>

<script lang="ts">
import './index.less';
import {defineComponent, computed} from 'vue';

const name = 'de-switch';
export default defineComponent({
  name,
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'onChange'],
  setup() {
    const classList = computed(() => [name]);

    return {
      classList,
    };
  },
});
</script>

<style scoped></style>

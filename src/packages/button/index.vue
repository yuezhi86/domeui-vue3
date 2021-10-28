<template>
  <component :is="tagName" class="de-button" @click="onClick">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import './index.less';
import {defineComponent, ref} from 'vue';
export default defineComponent({
  props: {
    to: {
      type: [String, Object],
    },
  },
  emits: ['onClick'],
  setup(props, {emit}) {
    const tagName = ref(props.to ? 'a' : 'button');

    return {
      tagName,
      onClick(e: Event) {
        emit('onClick', e);
      },
    };
  },
});
</script>

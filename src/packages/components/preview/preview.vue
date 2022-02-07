<template>
  <div></div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

const name = 'de-preview';
export default defineComponent({
  name,
  props: {
    propName: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    return {};
  },
});
</script>

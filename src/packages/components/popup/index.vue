<template>
  <div :class="classList"></div>
</template>

<script lang="ts">
import {defineComponent, ref, computed} from 'vue';

const name = 'de-popup';
export default defineComponent({
  name,
  props: {},
  emits: [],
  setup() {
    const classList = computed(() => [name]);

    return {
      classList,
    };
  },
});
</script>

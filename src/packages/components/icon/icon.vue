<template>
  <i :class="classList"></i>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';

const name = 'de-icon';
export default defineComponent({
  name,
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const classList = computed(() => [name, `${name}-${props.name}`]);

    return {
      classList,
    };
  },
});
</script>

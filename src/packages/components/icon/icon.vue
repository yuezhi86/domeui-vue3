<template>
  <i :class="classList" :style="styleList"></i>
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
    color: {
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
      default: '',
    },
  },
  setup(props) {
    const classList = computed(() => [name, `${name}-${props.name}`]);
    const styleList = computed(() => [
      {
        color: props.color,
        fontSize:
          props.size && Number.isNaN(Number(props.size))
            ? props.size
            : `${props.size}px`,
      },
    ]);

    return {
      classList,
      styleList,
    };
  },
});
</script>

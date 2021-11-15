<template>
  <i :class="classList" :style="styleList"></i>
</template>

<script lang="ts">
import {defineComponent, computed, PropType} from 'vue';

type IconName =
  | 'upload'
  | 'alert'
  | 'close'
  | 'eye'
  | 'eye-closed'
  | 'arrow-up'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'edit-l'
  | 'delete-l'
  | 'magnifier-l'
  | 'question-l'
  | 'doc-l'
  | 'tick-l'
  | 'plus-l'
  | 'refresh-l'
  | 'download-l'
  | 'bell-l'
  | 'close-l'
  | 'location-l';

const name = 'de-icon';
export default defineComponent({
  name,
  props: {
    name: {
      type: String as PropType<IconName>,
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

<template>
  <i :class="classList" :style="style"></i>
</template>

<script lang="ts">
import {defineComponent, computed, PropType, CSSProperties} from 'vue';

const name = 'de-icon';

export type IconName =
  | 'calendar-b'
  | 'money'
  | 'house-o'
  | 'plus-o'
  | 'file'
  | 'enlarge'
  | 'shrink'
  | 'export'
  | 'calendar'
  | 'settings'
  | 'minus-o'
  | 'danger'
  | 'star-l'
  | 'star'
  | 'transfer'
  | 'img-error-l'
  | 'doc-l'
  | 'edit-l'
  | 'alert'
  | 'info'
  | 'tick'
  | 'upload'
  | 'plus-l'
  | 'refresh-l'
  | 'location-l'
  | 'close-l'
  | 'close'
  | 'eye'
  | 'eye-closed'
  | 'apps'
  | 'arrow-down'
  | 'arrow-down2'
  | 'arrow-right'
  | 'arrow-up'
  | 'arrow-up2'
  | 'arrow-left'
  | 'delete-l'
  | 'arrow-left-l'
  | 'arrow-right-l'
  | 'arrow-down-l'
  | 'arrow-up-l'
  | 'magnifier-l'
  | 'question-l'
  | 'download-l'
  | 'bell-l';
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
    const style = computed<CSSProperties>(() => {
      const style: any = {color: props.color};
      let size: number = Number(props.size);

      if (!props.size) return style;
      if (typeof props.size === 'string' && Number.isNaN(size)) {
        const isPX = /^\d+((px)|(PX)|(pX)|(Px))$/.test(props.size);

        if (isPX) {
          size = parseFloat(props.size);
        } else {
          style.fontSize = props.size;
          return style;
        }
      }

      if (size < 12) {
        style.fontSize = '12px';
        style.transform = `scale(${size / 12})`;
        style.transformOrigin = 'center center';
      } else {
        style.fontSize = size + 'px';
      }

      return style;
    });

    return {
      classList,
      style,
    };
  },
});
</script>

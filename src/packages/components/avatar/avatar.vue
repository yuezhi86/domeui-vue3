<template>
  <div class="de-avatar" :style="styleList">
    <img :src="img" :alt="alt" class="de-avatar__img" @error="onError" />
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed} from 'vue';
import {getSizeOrPx} from '../../utils';
import {getConfig} from '../../config';

const globalConfig = getConfig();
const name = 'de-avatar';
export default defineComponent({
  name,
  props: {
    src: {
      type: String,
      default: undefined,
    },
    alt: {
      type: String,
      default: '',
    },
    size: {
      type: [Number, String],
      default: 28,
    },
    radius: {
      type: [Number, String],
      default: undefined,
    },
    defImg: {
      type: String,
      default: undefined,
    },
  },
  emits: ['error'],
  setup(props, {emit}) {
    const isError = ref(false);
    const styleList = computed(() => {
      const size = getSizeOrPx(props.size);
      return {
        width: size,
        height: size,
        borderRadius:
          props.radius === undefined ? size : getSizeOrPx(props.radius),
      };
    });
    const img = computed(() => {
      return isError.value
        ? globalConfig.avatar.defImg
        : props.src || globalConfig.avatar.defImg;
    });

    return {
      img,
      styleList,
      onError() {
        if (!props.src) return;
        isError.value = true;
        emit('error');
      },
    };
  },
});
</script>

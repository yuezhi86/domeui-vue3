<template>
  <div :class="classList" :style="style">
    <img
      v-if="loading"
      :src="loadingImg"
      class="de-image__img-loading"
      :style="loadingStyle"
      :alt="alt"
    />
    <img
      ref="image"
      v-bind="nativeAttrs"
      :src="url"
      :alt="alt"
      :style="imgStyle"
      class="de-image__img"
      @load="onLoaded"
      @error="onError"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  CSSProperties,
  defineComponent,
  ImgHTMLAttributes,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  watch,
} from 'vue';
import {getConfig, Numberish} from '../../config';
import {getSizeOrPx} from '../../utils';

const globalConfig = getConfig();
const name = 'de-image';
const defAttrs: ImageNativeAttrs = {
  loading: 'lazy',
};
const defLoadParams: ImageLoadParams = {
  loadingImg: globalConfig.image.loadingImg,
  errorImg: globalConfig.image.errorImg,
  errorReload: globalConfig.image.errorReload,
  root: null,
  rootMargin: '0px 0px 0px 0px',
  threshold: 0.0,
};

export type ImageLoadParams = {
  loadingImg?: string;
  loadingImgWidth?: Numberish;
  loadingImgHeight?: Numberish;
  errorImg?: string;
  errorImgWidth?: Numberish;
  errorImgHeight?: Numberish;
  errorReload?: boolean;
  root?: Element | null;
  rootMargin?: string;
  // 0.0 ~ 1.0
  threshold?: number;
};
export type ImageObjectFit =
  | 'fill'
  | 'contain'
  | 'cover'
  | 'none'
  | 'scale-down';
export type ImageRendering =
  | 'auto'
  | 'smooth'
  | 'high-quality'
  | 'crisp-edges'
  | 'pixelated';
export type ImageNativeAttrs = Omit<ImgHTMLAttributes, 'src' | 'alt'> & {
  referrerpolicy?:
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'unsafe-url';
  importance?: 'auto' | 'high' | 'low';
  loading?: 'lazy' | 'eager';
};
export default defineComponent({
  name,
  props: {
    src: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
    width: {
      type: [Number, String],
      default: undefined,
    },
    height: {
      type: [Number, String],
      default: undefined,
    },
    nativeAttrs: {
      type: Object as PropType<ImageNativeAttrs>,
      default: () => defAttrs,
    },
    // css image-rendering
    imageRendering: {
      type: String as PropType<ImageRendering>,
      default: globalConfig.image.imageRendering,
    },
    // css object-position
    objectPosition: {
      type: String,
      default: undefined,
    },
    // css object-fit
    objectFit: {
      type: String as PropType<ImageObjectFit>,
      default: undefined,
    },
    loadParams: {
      type: Object as PropType<ImageLoadParams>,
      default: () => ({}),
    },
  },
  emits: ['loading', 'loaded', 'error'],
  setup(props, {emit}) {
    const loadParams: ImageLoadParams = Object.assign(
      defLoadParams,
      props.loadParams
    );
    const image = ref<HTMLImageElement | null>(null);
    const loading = ref(false);
    const complete = ref(false);
    const error = ref(false);
    const loadingImg = computed(() => loadParams.loadingImg);
    const url = computed(() => {
      if (error.value) {
        return loadParams.errorImg;
      }

      return props.src;
    });
    const width = computed(() => props.width && getSizeOrPx(props.width));
    const height = computed(() => props.height && getSizeOrPx(props.height));
    const classList = computed(() => [
      name,
      {
        [`${name}__loading`]: loading.value,
        [`${name}__complete`]: complete.value,
        [`${name}__error`]: error.value,
        [`${name}__def-width`]: !width.value && (loading.value || error.value),
        [`${name}__def-height`]:
          !height.value && (loading.value || error.value),
      },
    ]);
    const style = computed<CSSProperties>(() => {
      return {
        width: width.value,
        height: height.value,
      };
    });
    const imgStyle = computed(() => {
      return {
        position: loading.value ? 'absolute' : '',
        opacity: loading.value ? 0 : 1,
        width: error.value ? getSizeOrPx(loadParams.errorImgWidth) : '',
        height: error.value ? getSizeOrPx(loadParams.errorImgHeight) : '',
        imageRendering: props.imageRendering,
        objectPosition: props.objectPosition,
        objectFit: props.objectFit,
      } as CSSProperties;
    });
    const loadingStyle = computed<CSSProperties>(() => {
      return {
        width: getSizeOrPx(loadParams.loadingImgWidth),
        height: getSizeOrPx(loadParams.loadingImgHeight),
      };
    });

    const onLoaded = () => {
      complete.value = true;
      loading.value = false;
      emit('loaded', props.src);
    };
    const onError = () => {
      error.value = true;
      loading.value = false;
      emit('error', image.value);
    };
    const onLoading = () => {
      emit('loading', props.src);
    };

    watch(
      () => props.src,
      () => {
        if (complete.value || error.value) {
          loading.value = true;
          complete.value = false;
          error.value = false;
          onLoading();
        }
      }
    );

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].intersectionRatio > 0 && !complete.value) {
          if (error.value && !loadParams.errorReload) return;
          loading.value = true;
          onLoading();
        }
      },
      {
        root: loadParams.root,
        rootMargin: loadParams.rootMargin,
        threshold: loadParams.threshold,
      }
    );

    onMounted(() => {
      io.observe(image.value as HTMLImageElement);
    });
    onBeforeUnmount(() => {
      io.disconnect();
    });

    return {
      loading,
      complete,
      error,
      image,
      loadingImg,
      loadingStyle,
      url,
      classList,
      style,
      imgStyle,
      onLoaded,
      onError,
    };
  },
});
</script>

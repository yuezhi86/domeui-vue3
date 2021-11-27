<template>
  <img
    ref="img"
    v-lazy="imgObj"
    :data-viewer="viewer"
    :alt="alt"
    :style="style"
  />
</template>

<script>
import {imgDomain} from 'config/server';

export default {
  /**
   * @property {string}   props.src
   * @property {string}   props.alt
   * @property {string}   props.loading              加载中的默认图
   * @property {string}   props.error                加载失败的默认图
   * @property {boolean}  props.isCdn                是否CDN链接
   * @property {string}   props.rule                 裁剪规则
   * @property {string}   props.loadingImgSize       加载图尺寸
   * @property {string}   props.errorImgSize         加载失败图尺寸
   */
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: '',
    },
    loading: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
    isCdn: {
      type: Boolean,
      default: true,
    },
    rule: {
      type: String,
      default: '',
    },
    loadingImgSize: {
      type: String,
      default: '',
    },
    errorImgSize: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      domain: imgDomain,
      uid: this._uid,
      url: this.src,
      lazyStatus: 'loading',
    };
  },
  computed: {
    style() {
      let style = {};

      if (this.lazyStatus === 'loading') {
        style.width = this.loadingImgSize;
        style.height = this.loadingImgSize;
      }

      return style;
    },
    imgObj() {
      let src = this.url || '';

      if (this.isCdn && src.length) {
        src =
          (this.domain ? `${this.domain}/` : '') + `${this.url}${this.rule}`;
      }

      return {
        src,
        loading:
          this.loading || require('@/assets/images/interface/loading.gif'),
        error: this.error,
      };
    },
    imgUrl() {
      let src;

      switch (this.lazyStatus) {
        case 'loading':
          src = this.imgObj.loading;
          break;
        case 'loaded':
          src = this.imgObj.src;
          break;
        case 'error':
          src = this.imgObj.error;
      }

      return src;
    },
    viewer() {
      let src = this.domain ? `${this.domain}/` : '';

      return this.url ? `${src}${this.url}` : '';
    },
  },
  watch: {
    rule(value) {
      if (this.rule && this.url && this.isCdn) {
        this.$refs.img.src =
          (this.domain ? `${this.domain}/` : '') + `${this.url}${value}`;
      }
    },
    src(value) {
      this.url = value;
    },
  },
  mounted() {
    let img = this.$refs.img;

    img.onlazyloading = (el, src) => {
      this.$emit('loading', {
        el,
        src,
      });
    };

    img.onlazyloaded = (el, src) => {
      this.lazyStatus = 'loaded';
      this.$emit('loaded', {
        el,
        src,
      });
    };

    img.onlazyerror = (el, src) => {
      this.lazyStatus = 'error';
      el && el.removeAttribute && el.removeAttribute('data-viewer');
      this.$emit('error', {
        el,
        src,
      });
    };
  },
};
</script>

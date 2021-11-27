<template>
  <img
    ref="img"
    :data-viewer="viewer"
    :alt="alt"
    :lazy="lazyStatus"
    :src="imgUrl"
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
    this.loadImg();
  },
  methods: {
    loadImg() {
      this.$emit('loading', {
        el: this.$refs.img,
        src: this.imgObj.src,
      });

      let img = new Image();

      img.onload = () => {
        this.$refs.img.src = this.imgObj.src;
        this.lazyStatus = 'loaded';
        this.$emit('loaded', {
          el: this.$refs.img,
          src: this.imgObj.src,
        });
      };

      img.onerror = () => {
        let _img = this.$refs.img;

        _img && _img.removeAttribute && _img.removeAttribute('data-viewer');
        this.lazyStatus = 'error';
        this.$emit('error', {
          el: this.$refs.img,
          src: this.imgObj.src,
        });
      };

      img.src = this.imgObj.src;
    },
  },
};
</script>

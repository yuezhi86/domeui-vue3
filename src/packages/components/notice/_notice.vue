<template>
  <transition :name="transitionName"> </transition>
</template>

<script lang="ts">
import '../../styles/animation/index.less';
import './index.less';
import {NoticeTheme} from '../../types';
import {defineComponent, PropType, ref, computed} from 'vue';
import RenderCell from '../../utils/render';

const name = 'de-notice-base';
export default defineComponent({
  name,
  components: {
    RenderCell,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    theme: {
      type: String as PropType<NoticeTheme>,
      default: 'default',
      validator: (v: string) =>
        ['default', 'info', 'success', 'warning', 'fail'].includes(v) || !!v,
    },
    className: {
      type: String,
      default: '',
    },
    duration: {
      type: Number,
      default: 1.5,
    },
    transitionName: {
      type: String,
      default: '',
    },
    closable: Boolean,
  },
  emits: [],
  setup() {
    return {};
  },
});
</script>

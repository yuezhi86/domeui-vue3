<template>
  <transition :name="transitionName" @enter="onEnter" @leave="onLeave">
    <section :class="classList">
      <a v-if="closable" class="de-notice-base__close">
        <i :class="closeClassList"></i>
      </a>
      <!-- eslint-disable -->
      <header class="de-notice-base__title" v-html="title"></header>
      <div class="de-notice-base__content" v-html="content"></div>
      <!-- eslint-enable -->
      <div v-if="!!render" class="de-notice-base__content">
        <render-cell :render="render" />
      </div>
    </section>
  </transition>
</template>

<script lang="ts">
import '../../styles/animation.less';
import './style/index.less';
import {NoticePlacement, NoticeTheme, NoticeTransition} from './types';
import {
  defineComponent,
  computed,
  onMounted,
  onBeforeUnmount,
  PropType,
  VNode,
} from 'vue';
import RenderCell from '../../utils/render';

const name = 'de-notice-base';
export default defineComponent({
  name,
  components: {
    RenderCell,
  },
  props: {
    uid: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    render: {
      type: Function as PropType<() => VNode>,
      default: undefined,
    },
    theme: {
      type: String as PropType<NoticeTheme>,
      default: 'default',
      validator: (v: string) =>
        ['default', 'info', 'success', 'warning', 'fail'].includes(v) || !!v,
    },
    classNames: {
      type: [String, Array] as PropType<string | string[]>,
      default: '',
    },
    maxWidth: {
      type: [String, Number],
      default: '100%',
    },
    placement: {
      type: String as PropType<NoticePlacement>,
      default: 'right-start',
    },
    duration: {
      type: Number,
      default: 1.5,
    },
    transitionName: {
      type: String as PropType<NoticeTransition>,
      default: 'move-in-out',
    },
    closable: Boolean,
    closeClassNames: {
      type: [String, Array] as PropType<string | string[]>,
      default: '',
    },
  },
  emits: ['onAutoClose', 'onClose', 'onLeave'],
  setup(props, {emit}) {
    const classList = computed(() => [
      name,
      `${name}__${props.theme}`,
      `${name}__${props.placement}`,
    ]);
    const closeClassList = computed(() => {
      let _class = [`${name}__close-icon`];

      if (props.closeClassNames) {
        _class = _class.concat(
          typeof props.closeClassNames === 'string'
            ? props.closeClassNames
            : props.closeClassNames
        );
      }

      return _class;
    });

    let closeTimer: number;
    const clearCloseTimer = () => {
      clearTimeout(closeTimer);
    };

    onMounted(() => {
      if (props.duration > 0) {
        closeTimer = setTimeout(() => {
          emit('onAutoClose', props.uid);
        }, props.duration * 1000);
      }
    });
    onBeforeUnmount(() => {
      clearCloseTimer();
    });

    return {
      classList,
      closeClassList,
      onEnter(el: HTMLElement) {
        if (props.placement === 'top') {
          el.style.height = el.scrollHeight + 'px';
        }
      },
      onClose() {
        clearCloseTimer();
        emit('onClose');
      },
      onLeave(el: HTMLElement) {
        el.style.height = '0';
        emit('onLeave');
      },
    };
  },
});
</script>

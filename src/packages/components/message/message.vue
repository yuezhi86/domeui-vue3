<template>
  <transition :name="transitionName" appear @enter="onEnter" @leave="onLeave">
    <section :class="classList">
      <a v-if="closable" class="de-message__close">
        <component :is="closeIcon" :class="closeClassList"></component>
      </a>
      <!-- eslint-disable -->
      <header v-if="title" class="de-message__title" v-html="title"></header>
      <div v-if="content" class="de-message__content" v-html="content"></div>
      <!-- eslint-enable -->
      <div v-if="render" class="de-message__content">
        <render-cell :render="render" />
      </div>
    </section>
  </transition>
</template>

<script lang="ts">
import '../../styles/animation.less';
import './style/index.less';
import {
  defineComponent,
  computed,
  onMounted,
  onBeforeUnmount,
  h,
  PropType,
  VNode,
  Component,
} from 'vue';
import {MessagePlacement, MessageTheme, MessageType} from './index';
import RenderCell from '../../utils/render';
import {DeIcon} from '../icon';

const name = 'de-message';

export type MessageTransition = 'move-out' | 'move-in-out';
export default defineComponent({
  name,
  components: {
    RenderCell,
  },
  props: {
    uuid: {
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
    type: {
      type: String as PropType<MessageType>,
      default: 'info',
      validator: (v: string) =>
        ['info', 'success', 'error', 'warning'].includes(v) || !!v,
    },
    theme: {
      type: String as PropType<MessageTheme>,
      default: 'default',
      validator: (v: string) => ['default', 'bright'].includes(v) || !!v,
    },
    className: {
      type: String,
      default: '',
    },
    maxWidth: {
      type: [String, Number],
      default: '100%',
    },
    placement: {
      type: String as PropType<MessagePlacement>,
      default: 'right-start',
    },
    duration: {
      type: Number,
      default: 1.5,
    },
    transitionName: {
      type: String as PropType<MessageTransition>,
      default: 'move-in-out',
    },
    closable: Boolean,
    closeClassNames: {
      type: [String, Array] as PropType<string | string[]>,
      default: '',
    },
    closeIcon: {
      type: [Object] as PropType<Component | VNode>,
      default: h(DeIcon, {name: 'close-l'}),
    },
  },
  emits: ['onAutoClose', 'onClose', 'onLeave'],
  setup(props, {emit}) {
    const classList = computed(() => [
      name,
      props.className,
      `${name}__${props.type}`,
      `${name}__${props.theme}`,
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
          emit('onAutoClose', props.uuid);
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
        if (['top', 'bottom-end'].includes(props.placement)) {
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

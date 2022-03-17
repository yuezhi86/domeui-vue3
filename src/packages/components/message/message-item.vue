<template>
  <transition>
    <div :class="classList">
      <div class="de-message-item__inner" :style="innerStyle">
        <span v-if="closable" class="de-message-item__close" @click="close">
          <component :is="closeIcon" :class="closeClassList"></component>
        </span>
        <header v-if="title" class="de-message-item__title">
          <template v-if="typeof title === 'string'">{{ title }}</template>
          <component :is="title" v-else></component>
        </header>
        <div v-if="content" class="de-message-item__content">
          <template v-if="typeof content === 'string'">{{ content }}</template>
          <component :is="content" v-else></component>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
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
import {MessagePlacement, MessageTheme, MessageType} from './types';
import {DeIcon} from '../icon';
import {getConfig} from '../../config';
import {getSizeOrPx} from '../../utils';

const globalConfig = getConfig();
const name = 'de-message-item';

export default defineComponent({
  name,
  props: {
    uuid: {
      type: String,
      required: true,
    },
    title: {
      type: [String, Object] as PropType<string | VNode>,
      default: '',
    },
    content: {
      type: [String, Object] as PropType<string | VNode>,
      default: '',
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
      default: 'top',
    },
    duration: {
      type: Number,
      default: globalConfig.message.duration,
    },
    closable: Boolean,
    closeClassName: {
      type: String,
      default: '',
    },
    closeIcon: {
      type: Object as PropType<Component | VNode>,
      default: h(DeIcon, {name: 'close-l', size: 10}),
    },
    onClose: {
      type: Function,
      default: undefined,
    },
  },
  emits: ['close'],
  setup(props, {emit}) {
    const classList = computed(() => [
      name,
      props.className,
      `${name}__${props.type}-${props.theme}`,
      `${name}__${props.placement}`,
      {
        [`${name}__closable`]: props.closable,
      },
    ]);
    const closeClassList = computed(() => {
      return [`${name}__close-icon`, props.closeClassName];
    });
    const innerStyle = computed(() => {
      return {
        maxWidth: getSizeOrPx(props.maxWidth),
      };
    });

    let closeTimer: number | null;
    const clearCloseTimer = () => {
      if (closeTimer) {
        window.clearTimeout(closeTimer);
        closeTimer = null;
      }
    };
    const close = () => {
      clearCloseTimer();
      props.onClose && props.onClose();
      emit('close', props.uuid);
    };

    onMounted(() => {
      clearCloseTimer();

      if (props.duration > 0) {
        closeTimer = window.setTimeout(() => {
          close();
        }, props.duration * 1000);
      }
    });
    onBeforeUnmount(() => {
      clearCloseTimer();
    });

    return {
      classList,
      closeClassList,
      innerStyle,
      close,
    };
  },
});
</script>

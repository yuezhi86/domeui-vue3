<template>
  <transition-group
    tag="section"
    appear
    :name="transitionName"
    :class="classList"
    :style="style"
    @enter="onEnter"
    @leave="onLeave"
  >
    <message-item
      v-for="item in queue"
      :key="item.uuid"
      :uuid="item.uuid"
      :title="item.title"
      :content="item.content"
      :type="item.type"
      :theme="item.theme"
      :duration="item.duration"
      :closable="item.closable"
      :class-name="item.className"
      :max-width="item.maxWidth"
      :placement="placement"
      :close-icon="item.closeIcon"
      :close-class-name="item.closeClassName"
      :on-close="item.onClose"
      @close="pop"
    />
  </transition-group>
</template>

<script lang="ts">
import {defineComponent, ref, computed, PropType} from 'vue';
import MessageItem from './message-item.vue';
import {MessageOption, MessagePlacement, MessageTransition} from './types';
import {getIndexZ} from '../../utils';
import {getConfig} from '../../config';

const globalConfig = getConfig();
const name = 'de-message';
export default defineComponent({
  name,
  components: {
    MessageItem,
  },
  props: {
    className: {
      type: String,
      default: '',
    },
    placement: {
      type: String as PropType<MessagePlacement>,
      default: 'top',
      validator: (v: string) => ['top', 'right-start'].includes(v),
    },
    transitionName: {
      type: String as PropType<MessageTransition>,
      default: 'move-up',
    },
    getMethods: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const zIndex = ref<number>();
    const queue = ref<Array<MessageOption & {uuid: string}>>([]);
    const classList = computed(() => [name, props.className]);
    const style = computed(() => {
      return {
        zIndex: zIndex.value,
      };
    });

    const push = (option: MessageOption & {uuid: string}) => {
      zIndex.value = getIndexZ();
      queue.value.push(
        Object.assign(
          {
            type: 'info',
            theme: 'default',
            duration: globalConfig.message.duration,
            maxWidth: '100%',
            closable: false,
          },
          option
        )
      );
    };
    const clear = () => (queue.value = []);
    const pop = (uuid: string) => {
      for (let i = 0; i < queue.value.length; i++) {
        if (queue.value[i].uuid === uuid) {
          queue.value.splice(i, 1);
          break;
        }
      }
    };

    props.getMethods({
      push,
      pop,
      clear,
    });

    const onEnter = (el: HTMLElement) => {
      if (['top', 'bottom-end'].includes(props.placement)) {
        el.style.height = el.scrollHeight + 'px';
      }
    };
    const onLeave = (el: HTMLElement) => {
      el.style.height = '0';
      el.style.paddingTop = '0';
      el.style.paddingBottom = '0';
    };

    return {
      queue,
      classList,
      style,
      push,
      pop,
      clear,
      onEnter,
      onLeave,
    };
  },
});
</script>

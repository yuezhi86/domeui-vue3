<template>
  <div :class="classList" :style="style">
    <template v-for="item in queue" :key="item.uuid">
      <message-item
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
        :close-icon="closeIcon"
        :transition-name="transitionName"
        :close-class-name="closeClassName"
        @close="onClose"
      />
    </template>
  </div>
</template>

<script lang="ts">
import './style/index.less';
import {defineComponent, ref, computed, PropType, VNode, Component} from 'vue';
import MessageItem, {MessageTransition} from './message.vue';
import {MessageOption, MessagePlacement} from './index';
import {getIndexZ, randomStr} from '../../utils';
import {getConfig} from '../../config';

const globalConfig = getConfig();
const name = 'de-message-queue';
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
      validator: (v: string) =>
        ['top', 'right-start', 'bottom-start', 'bottom-end'].includes(v),
    },
    transitionName: {
      type: String as PropType<MessageTransition>,
      default: 'move-in-out',
    },
    closeClassName: {
      type: String,
      default: '',
    },
    closeIcon: {
      type: Object as PropType<Component | VNode>,
      default: undefined,
    },
  },
  emits: [],
  setup(props) {
    const zIndex = ref<number>();
    const queue = ref<Array<MessageOption & {uuid: string}>>([]);
    const classList = computed(() => [name, props.className]);
    const style = computed(() => {
      return {
        zIndex: zIndex.value,
      };
    });

    const push = (option: MessageOption) => {
      zIndex.value = getIndexZ();
      queue.value.push(
        Object.assign(
          {
            uuid: getUuid(),
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
    const onClose = (uuid: string) => {
      for (let i = 0; i < queue.value.length; i++) {
        if (queue.value[i].uuid === uuid) {
          queue.value.splice(i, 1);
          break;
        }
      }
    };
    const clear = () => {
      queue.value = [];
    };

    return {
      queue,
      classList,
      style,
      push,
      clear,
      onClose,
    };
  },
});

function getUuid() {
  return `${name}__${randomStr(10)}`;
}
</script>

<template>
  <section :class="classList" :style="style">
    <transition-group :name="transitionName">
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
          :close-icon="item.closeIcon"
          :transition-name="transitionName"
          :close-class-name="item.closeClassName"
          :on-close="item.onClose"
          @close="pop"
        />
      </template>
    </transition-group>
  </section>
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
      validator: (v: string) =>
        ['top', 'right-start', 'bottom-start', 'bottom-end'].includes(v),
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

    return {
      queue,
      classList,
      style,
      push,
      pop,
      clear,
    };
  },
});
</script>

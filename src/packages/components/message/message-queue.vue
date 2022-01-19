<template>
  <div :class="classList" :style="style">
    <template v-for="item in queue" :key="item.uuid">
      <message-item :uuid="item.uuid" />
    </template>
  </div>
</template>

<script lang="ts">
import './style/index.less';
import {defineComponent, ref, computed, CSSProperties, PropType} from 'vue';
import MessageItem from './message-item.vue';
import {MessagePlacement} from './index';

const name = 'de-message-queue';
export default defineComponent({
  name,
  components: {
    MessageItem,
  },
  props: {
    placement: {
      type: String as PropType<MessagePlacement>,
      default: 'right-start',
    },
    className: {
      type: String,
      default: '',
    },
  },
  emits: [],
  setup() {
    const queue = ref([]);
    const classList = computed(() => [name]);
    const style = computed<CSSProperties>(() => {
      return {};
    });
    return {
      queue,
      classList,
      style,
    };
  },
});
</script>

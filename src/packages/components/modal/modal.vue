<template>
  <teleport to="body" :disabled="!transfer">
    <transition :name="transitionNames[1] || 'fade'">
      <div
        v-if="modelValue"
        class="de-modal__mask"
        :style="maskStyleList"
        @click.stop="onClickMask"
      ></div>
    </transition>
    <transition :name="transitionNames[0] || 'fade'">
      <section v-if="modelValue" :class="classList" :style="styleList">
        <header
          v-if="showHeader"
          :class="headerClassList"
          :style="[headerParams.style]"
        >
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
          <div v-if="closable" class="de-modal__close" @click="onCancel">
            <DeIcon
              :name="closeParams.name || 'close-l'"
              :class="closeParams.class"
            />
          </div>
        </header>
        <div class="de-modal__body">
          <slot></slot>
        </div>
        <footer
          v-if="showAction"
          :class="footerClassList"
          :style="[actionParams.style]"
        >
          <slot name="action" :methods="{onConfirm, onCancel}">
            <DeButton
              theme="default"
              class="de-modal__action-btn"
              @click="onCancel"
            >
              {{ cancelText }}
            </DeButton>
            <DeButton
              theme="primary"
              class="de-modal__action-btn"
              @click="onConfirm"
            >
              {{ confirmText }}
            </DeButton>
          </slot>
        </footer>
      </section>
    </transition>
  </teleport>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  PropType,
  watch,
  ref,
  onBeforeUnmount,
} from 'vue';
import {DeIcon} from '../icon';
import {DeButton} from '../button';
import {getConfig, Numberish} from '../../config';
import {getIndexZ, randomStr} from '../../utils';
import modalQueue from './index';

const globalConfig = getConfig();
const name = 'de-modal';
const uid = `${name}__${randomStr(10)}`;
export type ModalHeaderParams = {
  style?: object;
  class?: Array<string>;
};
export type ModalActionParams = ModalHeaderParams;
export type ModalCloseParams = {
  name?: string;
  class?: Array<string>;
};
export type ModalTransitionNames = [string, string];
export type ModalBeforeCloseAction = 'confirm' | 'cancel';
export type ModalBeforeClose = (
  action?: ModalBeforeCloseAction
) => Promise<void>;
export default defineComponent({
  name,
  components: {
    DeIcon,
    DeButton,
  },
  props: {
    modelValue: Boolean,
    title: {
      type: String,
      default: '',
    },
    confirmText: {
      type: String,
      default: globalConfig.modal.confirmText,
    },
    cancelText: {
      type: String,
      default: globalConfig.modal.cancelText,
    },
    width: {
      type: [String, Number] as PropType<Numberish | 'auto'>,
      default: 'auto',
    },
    height: {
      type: [String, Number] as PropType<Numberish | 'auto'>,
      default: 'auto',
    },
    beforeClose: {
      type: Function as PropType<ModalBeforeClose>,
      default: undefined,
    },
    escClosable: {
      type: Boolean,
      default: globalConfig.modal.escClosable,
    },
    closable: {
      type: Boolean,
      default: globalConfig.modal.closable,
    },
    transfer: {
      type: Boolean,
      default: globalConfig.modal.transfer || globalConfig.common.transfer,
    },
    draggable: {
      type: Boolean,
      default: globalConfig.modal.draggable,
    },
    fullscreen: Boolean,
    maskClosable: {
      type: Boolean,
      default: globalConfig.modal.maskClosable,
    },
    mask: {
      type: Boolean,
      default: globalConfig.modal.mask,
    },
    scrollable: {
      type: Boolean,
      default: globalConfig.modal.scrollable,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    headerParams: {
      type: Object as PropType<ModalHeaderParams>,
      default: () => ({}),
    },
    showAction: {
      type: Boolean,
      default: true,
    },
    actionParams: {
      type: Object as PropType<ModalActionParams>,
      default: () => ({}),
    },
    closeParams: {
      type: Object as PropType<ModalCloseParams>,
      default: () => ({}),
    },
    transitionNames: {
      type: Array as PropType<ModalTransitionNames[]>,
      default: () => [],
    },
  },
  emits: ['update:modelValue', 'onConfirm', 'onCancel', 'onShow', 'onHide'],
  setup(props, {emit}) {
    const instanceId = randomStr(10);
    const zIndex = ref(0);
    const hasHidden = ref(false);
    const classList = computed(() => [name]);
    const styleList = computed(() => [
      {
        zIndex: zIndex.value,
      },
    ]);
    const maskStyleList = computed(() => [
      {
        zIndex: zIndex.value,
      },
    ]);
    const headerClassList = computed(() => [
      `${name}__header`,
      ...(props.headerParams.class ?? []),
    ]);
    const footerClassList = computed(() => [
      `${name}__action`,
      ...(props.actionParams.class ?? []),
    ]);

    const beforeCloseHandle = (action?: ModalBeforeCloseAction) => {
      const isConfirm = action === 'confirm';
      const isCancel = action === 'cancel';
      const handle = () => {
        isConfirm && emit('onConfirm');
        isCancel && emit('onCancel');
        modalHide();
      };

      if (!props.beforeClose) return handle();

      const before = props.beforeClose(action);
      if (before && before.then) {
        before.then(() => {
          handle();
        });
      } else {
        handle();
      }
    };
    const modalShow = () => {
      if (!props.scrollable) {
        if (document.body.style.overflow === 'hidden') {
          hasHidden.value = true;
        } else {
          document.body.style.setProperty('overflow', 'hidden');
        }
      }

      zIndex.value = getIndexZ();
      emit('onShow');
    };
    const modalHide = () => {
      if (!props.scrollable && !hasHidden.value) {
        document.body.style.removeProperty('overflow');
      }

      emit('update:modelValue', false);
      emit('onHide');
    };
    const onConfirm = () => {
      beforeCloseHandle('confirm');
    };
    const onCancel = () => {
      beforeCloseHandle('cancel');
    };
    const onClickMask = () => {
      if (!props.maskClosable) return;
      onCancel();
    };
    const onEscClose = (e: KeyboardEvent) => {
      if (e.code === 'Escape' && props.escClosable && props.modelValue) {
        onCancel();
      }
    };

    window.addEventListener('keydown', onEscClose, false);

    onBeforeUnmount(() => {
      if (!hasHidden.value) {
        document.body.style.removeProperty('overflow');
      }

      window.removeEventListener('keydown', onEscClose, false);
      modalQueue.delete(instanceId);
    });

    watch(
      () => props.modelValue,
      (newValue) => {
        if (newValue) {
          modalShow();
        } else {
          modalHide();
        }
      }
    );

    modalQueue.set(instanceId, modalHide);

    return {
      uid,
      classList,
      styleList,
      maskStyleList,
      headerClassList,
      footerClassList,
      onConfirm,
      onCancel,
      onClickMask,
    };
  },
});
</script>

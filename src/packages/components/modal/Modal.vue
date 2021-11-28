<template>
  <transition name="fade">
    <section v-if="show" :class="{'has-mask': mask}" :style="realZIndex" class="xy-modal">
      <div class="modal-body">
        <header
          v-if="showHeader"
          :class="{'head-line': headLine, 'head-left': titleAlign === 'left'}"
          class="modal-header"
        >
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
          <Icon v-if="showClose" name="close" class="close-icon" @click="cancelHandler"></Icon>
        </header>

        <div class="modal-content">
          <slot></slot>
        </div>

        <div v-if="showAction" :class="actionsAlign" class="modal-actions">
          <div class="modal-actions-aside-prefix">
            <slot name="prefix"></slot>
          </div>

          <div class="modal-actions-inner">
            <button v-if="showCancel" type="button" class="modal-btn cancel" @click="cancelHandler">
              {{ cancelText }}
            </button>
            <button v-if="isSubmit" :form="form" type="submit" class="modal-btn confirm">{{ confirmText }}</button>
            <button v-else type="button" class="modal-btn confirm" @click="confirmHandler">{{ confirmText }}</button>
          </div>

          <div v-if="actionsAlign !== 'right'" class="modal-actions-aside-suffix">
            <slot name="suffix"></slot>
          </div>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'Modal',

  /**
   * @property {boolean}  data.mask           遮罩
   * @property {string}   data.actionsAlign   按钮对齐方式
   * @property {boolean}  data.headLine       标题是否有下边框线
   * @property {boolean}  data.confirmRight   确认按钮显示位置
   * @property {string}   data.cancelText     取消按钮文本
   * @property {string}   data.confirmText    确认按钮文本
   * @property {number}   data.zIndex         z-index值
   * @property {boolean}  data.showClose      是否显示关闭按钮
   * @property {boolean}  data.showHeader     是否显示标题栏
   * @property {function} data.callback       确认、取消回调函数
   */
  props: {
    title: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: Boolean,
      default: true,
    },
    showAction: {
      type: Boolean,
      default: true,
    },
    showClose: {
      type: Boolean,
      default: false,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
    titleAlign: {
      type: String,
      default: 'center',
      validator(value) {
        return ['left', 'center'].includes(value);
      },
    },
    actionsAlign: {
      type: String,
      default: 'center',
      validator(value) {
        return ['right', 'center'].includes(value);
      },
    },
    headLine: {
      type: Boolean,
      default: true,
    },

    /*
     * confirmRight: {
     *   type: Boolean,
     *   default: true
     * },
     */
    cancelText: {
      type: String,
      default: '取消',
    },
    confirmText: {
      type: String,
      default: '确定',
    },
    zIndex: {
      type: Number,
      default: 1001,
    },
    callback: {
      type: Function,
      default: null,
    },
    isSubmit: {
      type: Boolean,
      default: false,
    },
    form: {
      type: String,
      default: '',
    },
    proxyCancel: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    /**
     * @property {boolean}  data.show           是否显示
     */
    return {
      show: this.value,
    };
  },
  computed: {
    realZIndex() {
      return `z-index: ${this.zIndex}`;
    },
  },
  watch: {
    value(newVal) {
      this.show = newVal;

      if (newVal) {
        Vue._Modal.show(this._uid, this);

        this.$addClassName('body', 'modal-show');
        this.$emit('show');
      } else {
        Vue._Modal.hide(this._uid);

        if (!Vue._Modal.hasVisible()) this.$removeClassName('body', 'modal-show');

        this.$emit('hide');
      }
    },
  },
  created() {
    this.show = this.value;

    if (this.show) {
      Vue._Modal.show(this._uid, this);

      this.$emit('show');
    }

    Vue._Modal.add(this._uid, this);
  },
  destroyed() {
    Vue._Modal.destroy(this._uid);

    if (!Vue._Modal.hasVisible()) this.$removeClassName('body', 'modal-show');
  },
  methods: {
    cancelHandler() {
      this.callbackHandler(false);
    },
    confirmHandler() {
      this.callbackHandler(true);
    },
    callbackHandler(confirm) {
      let res = {
        confirm,
        hideModal: this.hideModal,
      };

      if (!confirm) {
        !this.proxyCancel && this.hideModal();
        this.$emit('onCancel');
      }

      if (typeof this.callback === 'function') {
        if (this.callback(res) === true) {
          this.hideModal();
        }
      } else if (confirm) {
        this.hideModal();
        this.$emit('onEnter');
      }
    },
    hideModal() {
      Vue._Modal.hide(this._uid);

      if (!Vue._Modal.hasVisible()) this.$removeClassName('body', 'modal-show');

      this.$emit('input', false);
      this.$emit('hide');
    },
  },
};
</script>

<style lang="less">
@import '~@/assets/styles/variables';
@import '~@/assets/styles/mixins';

body.modal-show {
  overflow: hidden !important;
}

.xy-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &.has-mask {
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal-body {
    position: absolute;
    left: 50%;
    top: 50%;
    min-width: 395px;
    transform: translate(-50%, -50%);
    transform-origin: center;
    background-color: #fff;
    border-radius: 5px;
  }

  .modal-header {
    position: relative;
    height: 56px;
    line-height: 56px;

    &.head-line {
      .border-bottom(@border-color-def);
    }

    h2 {
      color: #333;
      font-size: 17px;
      font-weight: bold;
      text-align: center;
    }

    &.head-left {
      h2 {
        padding-left: 15px;
        text-align: left;
      }
    }

    .close-icon {
      position: absolute;
      top: 50%;
      right: 20px;
      color: #999;
      font-size: 18px;
      cursor: pointer;
      transform: translateY(-50%);
      transition: color 0.3s;

      &:hover {
        color: #888;
      }
    }
  }

  .modal-content {
    min-height: 120px;
  }

  .modal-actions {
    .clearfix();
    position: relative;
    height: 66px;
    padding: 17px 25px;
    background-color: @dialog-bg-color;
    border-radius: 0 0 5px 5px;
    text-align: center;
    line-height: 32px;

    .modal-btn {
      float: left;
      min-width: 120px;
      .margin-h(5px);
      padding: 5px 20px 6px;
      border-width: 1px;
      border-style: solid;
      border-radius: 2px;
      font-size: 14px;
      text-align: center;
      line-height: 19px;
      cursor: pointer;
      transition: color 0.2s linear, background-color 0.2s linear, border 0.2s linear, box-shadow 0.2s linear;

      &.confirm {
        background-color: @btn-primary-bg;
        border-color: @btn-primary-border;
        color: @btn-primary-color;

        &:hover,
        &:active {
          background-color: @btn-primary-hover-bg;
          border-color: @btn-primary-hover-border;
          color: @btn-primary-hover-color;
        }
      }

      &.cancel {
        background-color: @btn-default-o-bg;
        border-color: @btn-default-o-border;
        color: @btn-default-o-color;

        &:hover,
        &:active {
          background-color: @btn-default-o-hover-bg;
          border-color: @btn-default-o-hover-border;
          color: @btn-default-o-hover-color;
        }
      }
    }

    .modal-actions-inner {
      display: inline-block;
      vertical-align: bottom;
    }

    &.right {
      .modal-actions-inner {
        float: right;
      }

      .modal-btn {
        margin-left: 10px;
        margin-right: 0;
      }
    }
  }

  .modal-actions-aside-prefix,
  .modal-actions-aside-suffix {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transform-origin: 0 0;
  }

  .modal-actions-aside-prefix {
    left: 25px;
  }

  .modal-actions-aside-suffix {
    right: 25px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

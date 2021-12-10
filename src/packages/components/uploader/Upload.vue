<template>
  <section class="atom-upload">
    <slot name="prepend"></slot>
    <div class="atom-upload-inner">
      <template v-for="(item, index) in fileList">
        <div :key="index" class="atom-upload-item--wrap">
          <div
            v-if="item.isPlaceholder"
            class="atom-upload-placeholder"
            :style="[itemStyles]"
            @dragover.stop="onDragOver"
            @dragend.stop="onDragEnd"
          ></div>
          <div
            v-else
            class="atom-upload-item"
            :class="[itemClass, {'atom-upload-item--move': sortable}]"
            :style="[itemStyles]"
            :draggable="multiple && sortable"
            @dragstart.stop="onDragStart(item, $event)"
            @dragenter.stop="onDragEnter(item, $event)"
            @dragover.stop="onDragOver"
            @dragend.stop="onDragEnd"
          >
            <div v-if="sortable" class="atom-upload-item--move-after" data-after></div>
            <div
              v-if="item.done === false || item.fail"
              class="atom-upload-progress"
              :class="{'atom-upload-progress--fail': item.fail}"
            >
              <div class="atom-upload-progress--inner">
                <div class="atom-upload-progress--text">{{ item.fail ? '上传失败' : '上传中...' }}</div>
                <div
                  class="atom-upload-progress--bar"
                  :class="{'atom-upload-progress--bar--blink': item.done === false}"
                >
                  <div class="atom-upload-progress--bar-line" :style="{width: item.percent + '%'}"></div>
                </div>
              </div>
            </div>

            <div v-if="item.done" class="atom-upload-status" :class="{'atom-upload-status--fail': item.fail}"></div>

            <slot
              v-if="item.done && !item.fail"
              name="item"
              :item="item"
              :index="index"
              :image="isImage"
              :video="isVideo"
              :file="isFile"
            >
              <img
                v-if="isImage || (isVideo && videoOption.poster)"
                :src="item.url"
                :alt="item.filename"
                class="atom-upload-image"
                :class="{'atom-upload-image--error': item.error}"
                :data-viewer="item.viewer"
                @error="onImgLoadError(item)"
              />
              <div v-if="isFile || (isVideo && !videoOption.poster)" class="atom-upload-file">
                <div class="atom-upload-file--inner">
                  <div class="atom-upload-file--filename">{{ item.filename }}</div>
                  <img v-if="isVideo" class="atom-upload-file--icon" src="./images/icon_video_white.png" />
                  <img v-if="isFile" class="atom-upload-file--icon" src="./images/icon_file_white.png" />
                </div>
              </div>
            </slot>
            <div v-if="remove || (showPreview && item.done)" class="atom-upload-action">
              <div
                v-if="showPreview && item.done"
                class="atom-upload-action--preview"
                :class="{'atom-upload-action--disabled': item.error || item.fail}"
                @click.stop="onPreview(item)"
              ></div>
              <div v-if="remove" class="atom-upload-action--remove" @click.stop="onRemove(index, item)"></div>
            </div>
          </div>
          <slot name="itemAppend" :index="index" :item="item"></slot>
        </div>
      </template>

      <div
        v-if="showBtn"
        class="atom-upload-btn"
        :class="[
          btnClass,
          {
            'atom-upload-btn--disabled': disabled,
          },
        ]"
        :style="[itemStyles]"
        @click.stop="onClickInput"
      >
        <img :src="btnIcon" alt="按钮" class="atom-upload-btn--icon" />
        <input ref="input" type="file" :name="name" :multiple="multiple" class="atom-upload-input" @change="onChoose" />
      </div>
    </div>
    <slot name="append"></slot>
  </section>
</template>

<script>
/**
 * @typedef {object} DefaultFileItem
 * @property {string} value
 * @property {string} [filename]
 * @property {string} [url]
 * @property {string} [viewer]
 */

/**
 * @typedef {object} FileItem
 * @property {number} uid - 唯一标识，用于查找数据
 * @property {string} value - 用于提交的 value，可能是云存储的key，如果不传则使用 url 的值
 * @property {string} filename - 文件名
 * @property {string} url - 缩略图 url
 * @property {string} poster - 视频图
 * @property {string} viewer - 用于预览大图链接，如果不传则使用 url 的值
 * @property {number} percent - 上传进度
 * @property {File} file - 文件
 * @property {boolean} [error] - 图片加载失败
 * @property {boolean} [fail] - 上传失败时为 true
 * @property {boolean} done - 上传结束为 true，无论成功与否
 */

/**
 * 上传组件
 * 支持图片上传模式、视频上传模式、文件上传模式
 * 内部只调用传入的上传函数，不实现上传函数逻辑
 */

let uid = 0;
export default {
  props: {
    defaultFileList: {
      type: Array,
      default() {
        return [];
      },
    },
    name: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'image',
      validator(value) {
        return ['image', 'video', 'file'].includes(value);
      },
    },
    // 允许的文件扩展名，不加.
    accept: {
      type: Array,
      default() {
        return [];
      },
    },
    // 仅 multiple=true 时有用
    maxCount: {
      type: Number,
      default: 1,
    },
    maxSize: {
      type: Number,
      default: 2, // 2MB
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    remove: {
      type: Boolean,
      default: true,
    },
    preview: {
      type: Boolean,
      default: true,
    },
    sortable: {
      type: Boolean,
      default: false,
    },
    itemWidth: {
      type: Number,
      default: 100,
    },
    itemHeight: {
      type: Number,
      default: 100,
    },
    itemClass: {
      type: String,
      default: '',
    },
    btnClass: {
      type: String,
      default: '',
    },
    imageParams: {
      type: Object,
      default() {
        return {};
      },
    },
    videoParams: {
      type: Object,
      default() {
        return {};
      },
    },
    fileParams: {
      type: Object,
      default() {
        return {};
      },
    },
    // 函数接受两个参数：files 和 next 函数，当上传成功一个文件时必须调用 next(res)
    uploadHandle: {
      type: Function,
      required: true,
    },
    // 接受一个函数：返回 false，或 Promise.reject() 时取消上传
    beforeUpload: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      fileList: [],
      dragIndex: -1,
      dragData: '',
    };
  },
  computed: {
    isImage({type}) {
      return type === 'image';
    },
    isVideo({type}) {
      return type === 'video';
    },
    isFile({type}) {
      return type === 'file';
    },
    itemStyles({itemWidth, itemHeight}) {
      return {
        width: `${itemWidth}px`,
        height: `${itemHeight}px`,
      };
    },
    imageOption({imageParams}) {
      return Object.assign(
        {
          errorImg: require('./images/icon_img_error.png'),
          btnIcon: require('./images/icon_camera.png'),
        },
        imageParams
      );
    },
    videoOption({videoParams}) {
      return Object.assign(
        {
          poster: true,
          btnIcon: require('./images/icon_video.png'),
          mediaType: 'video/mp4',
        },
        videoParams
      );
    },
    fileOption({fileParams}) {
      return Object.assign(
        {
          btnIcon: require('./images/icon_file.png'),
        },
        fileParams
      );
    },
    btnIcon({type, imageOption, videoOption, fileOption}) {
      let val = imageOption.btnIcon;

      switch (type) {
        case 'video':
          val = videoOption.btnIcon;
          break;
        case 'file':
          val = fileOption.btnIcon;
      }

      return val;
    },
    acceptExt({accept, isImage, isVideo}) {
      if (accept.length) return accept;
      if (isVideo) return ['mp4'];
      if (isImage) return ['jpeg', 'jpg', 'png'];
      return [];
    },
    showBtn({multiple, maxCount, fileList}) {
      return multiple ? fileList.length < maxCount : !fileList.length;
    },
    showPreview({isFile, preview}) {
      if (isFile) return false;
      return preview;
    },
  },
  watch: {
    defaultFileList: {
      immediate: true,
      handler(fileList) {
        this.fileList = fileList.map((item) => {
          item.filename = item.filename || item.value;
          item.url = item.url || item.value;
          item.viewer = item.viewer || item.url || item.value;
          item.uid = uid++;
          item.done = true;
          item.percent = 100;
          return item;
        });

        if (fileList.length) this.onDefaultChange();
      },
    },
  },
  methods: {
    onClickInput() {
      const {
        $refs: {input},
        disabled,
      } = this;
      if (disabled) return;
      input.value = null;
      input.click();
    },
    async onChoose({target: {files}}) {
      if (!files.length) return;

      const extRegx = /\S+\.([0-9a-zA-Z]+)$/;
      const maxSize = this.maxSize * 1024 * 1024;
      const invalidExtFiles = [];
      const invalidSizeFiles = [];
      const validFiles = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const {size, name} = file;
        const matchRes = name.match(extRegx);
        const ext = (matchRes ? matchRes[1] : '').toLocaleLowerCase();

        if (!this.acceptExt.some((item) => item.toLocaleLowerCase() === ext)) {
          invalidExtFiles.push(file);
          continue;
        }

        if (size > maxSize) {
          invalidSizeFiles.push(file);
          continue;
        }

        validFiles.push(file);
        const fileCount = this.fileList.length + validFiles.length;
        if ((fileCount && !this.multiple) || fileCount === this.maxCount) break;
      }

      if (invalidExtFiles.length || invalidSizeFiles.length) {
        const res = {
          invalidExtFiles,
          invalidSizeFiles,
        };

        this.onExceed(res);
        if (!validFiles.length) return;
      }

      const fileList = validFiles.map((file) => {
        return {
          uid: uid++,
          file,
          filename: file.name,
          percent: 0, // 上传进度
          done: false, // 上传结束或上传出错时为 true
          fail: false, // 上传失败时为 true
        };
      });

      if (typeof this.beforeUpload === 'function') {
        let before;

        try {
          before = await this.beforeUpload(this.unref(fileList));
        } catch (e) {
          before = false;
        }

        if (before === false) {
          fileList.forEach((file) => {
            if (file.done === false) {
              file.done = true;
              file.fail = true;
            }
          });
          return;
        }
      }

      this.fileList = this.fileList.concat(fileList);
      this.uploadHandle(fileList, this.done);
    },
    /**
     * @param {FileItem[]} res
     */
    done(res) {
      const _success = [];
      const _fail = [];

      res.forEach((item) => {
        const {uid, url, viewer, value, filename, percent, fail} = item;
        const index = this.fileList.findIndex((item) => item.uid === uid);
        // 如果在上传过程中被删除，则会忽略掉该文件
        if (index > -1) {
          const res = {
            value,
            filename,
            uid,
            url: url || value,
            viewer: viewer || url || value,
            percent,
            fail,
            done: true,
          };
          this.$set(this.fileList, index, res);
          (fail ? _fail : _success).push(res);
        }
      });

      this.onUpload(_success, _fail);
      if (_success.length) this.onSuccess(_success);
      if (_fail.length) this.onFail(_fail);
      this.onChange();
    },
    onExceed(res) {
      this.$emit('onExceed', res);
    },
    onUpload(success, fail) {
      this.$emit('onUpload', {
        success: this.unref(success),
        fail: this.unref(fail),
      });
    },
    onSuccess(res) {
      this.$emit('onUpload', this.unref(res));
    },
    onFail(res) {
      this.$emit('onFail', this.unref(res));
    },
    onRemove(index, item) {
      this.fileList.splice(index, 1);
      // 删除文件后，如果要中断上传，需要结合 onRemove 自己去实现
      this.$emit('onRemove', {
        index,
        item,
      });
      this.onChange();
    },
    onChange() {
      this.changeEmit('onChange');
    },
    onDefaultChange() {
      this.changeEmit('onDefaultChange');
    },
    onPreview(item) {
      const {error, fail} = item;
      if (error || fail) return;
      const list = this.unref(this.fileList.filter(({done}) => done));
      const index = list.findIndex(({uid}) => uid === item.uid);
      this.$emit('onPreview', {list, index});
    },
    onDragStart(item, e) {
      e.dataTransfer.effectAllowed = 'move';
      this.dragData = item;
      this.timer = setTimeout(() => {
        this.dragIndex = this.getTargetIndex(this.dragData.uid);
        this.fileList.splice(this.dragIndex, 1);
      }, 300);
    },
    onDragEnter(item, e) {
      e.dataTransfer.dropEffect = 'move';
      const isAfter = e.target.dataset.after !== undefined;

      if (item.uid === this.dragData.uid) {
        if (this.dragIndex === -1) {
          clearTimeout(this.timer);
          this.dragIndex = this.getTargetIndex(this.dragData.uid);
          this.fileList.splice(this.dragIndex, 1);
          const index = this.dragIndex + Number(isAfter);
          this.fileList.splice(index, 0, {
            isPlaceholder: true,
          });
        }

        return;
      }

      const holderIndex = this.getPlaceholderIndex();
      if (holderIndex > -1) {
        this.fileList.splice(holderIndex, 1);
      }

      if (this.dragIndex === -1) {
        clearTimeout(this.timer);
        this.dragIndex = this.getTargetIndex(this.dragData.uid);
        this.fileList.splice(this.dragIndex, 1);
      }

      const targetIndex = this.getTargetIndex(item.uid);
      const index = targetIndex + Number(isAfter);
      this.fileList.splice(index, 0, {
        isPlaceholder: true,
      });
    },
    onDragOver(e) {
      e.preventDefault();
    },
    onDragEnd() {
      const holderIndex = this.getPlaceholderIndex();
      if (holderIndex > -1) {
        this.fileList.splice(holderIndex, 1, this.dragData);
        this.dragIndex = -1;
        this.dragData = '';
        this.$emit('onSort', holderIndex);
        this.onChange();
      }

      if (this.dragIndex > -1) {
        this.fileList.splice(this.dragIndex, 0, this.dragData);
      }
    },
    onImgLoadError(item) {
      const {
        isImage,
        imageOption: {errorImg},
      } = this;

      if (isImage && !item.error) {
        item.error = true;
        item.url = errorImg;
      }
    },
    getPlaceholderIndex() {
      return this.fileList.findIndex(({isPlaceholder}) => isPlaceholder);
    },
    getTargetIndex(targetUid) {
      return this.fileList.findIndex(({uid}) => uid === targetUid);
    },
    hasProgress() {
      return this.fileList.some(({done}) => done === false);
    },
    changeEmit(name) {
      const fileList = this.fileList.filter(({done, fail}) => done && !fail);
      this.$emit(name, this.unref(fileList));
    },
    unref(fileList) {
      return fileList.map((file) => ({...file}));
    },
  },
};
</script>

<style lang="less">
@import '~@/assets/styles/variables';
@import '~@/assets/styles/mixins';

@radius: 4px;
@green: #19ce68;
@blue: #41a5ee;
@gray: #fcfdff;

.atom-upload {
  &-inner {
    .clearfix();
    .user-select-none();
    margin-top: -10px;
    margin-left: -10px;
    color: #333;
    font-size: 12px;
  }

  &-item--wrap,
  &-btn {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
  }

  &-item,
  &-btn {
    border-radius: @radius;
  }

  &-placeholder {
    background-color: @gray;
    border: 1px dashed @border-color-def;
  }

  &-item {
    position: relative;
    background-color: #fff;
    border: 1px solid @border-color-def;

    &--move {
      cursor: move;

      &-after {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
        width: 50%;
        height: 100%;
        content: '';
      }
    }
  }

  &-progress,
  &-action {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  &-progress {
    background-color: @gray;
    text-align: center;

    &--inner {
      width: 80%;
    }

    &--text {
      margin-bottom: 10px;
    }

    &--bar {
      overflow: hidden;
      width: 100%;
      height: 8px;
      border: 1px solid rgba(@blue, 80%);
      border-radius: 6px;

      &--blink {
        animation: linear infinite 2s progress-blink;
      }

      &-line {
        height: 100%;
        background-color: @blue;
      }
    }

    &--fail &--bar {
      border-color: @border-color-def;
    }

    &--fail &--bar-line {
      background-color: @border-color-def;
    }
  }

  &-action {
    background-color: rgba(0, 0, 0, 0.4);
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;

    &--preview,
    &--remove {
      width: 24px;
      height: 24px;
      background: no-repeat center center / 15px 15px;
      cursor: pointer;
    }

    &--preview {
      background-image: url('./images/icon_see.png');
    }

    &--remove {
      background-image: url('./images/icon_remove.png');
    }

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &-item:hover &-action {
    visibility: visible;
    opacity: 1;
  }

  &-status {
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 52%, @green 52%, @green 100%);
    border-radius: @radius;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      width: 30px;
      height: 30px;
      background: url('./images/icon_tick.png') no-repeat right 3px top 4px ~'/' 10px 10px;
      content: '';
    }

    &--fail {
      background: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0) 52%,
        #cfcfcf 52%,
        #cfcfcf 100%
      );

      &::after {
        background-image: url('./images/icon_warn.png');
      }
    }
  }

  &-image,
  &-file {
    width: 100%;
    height: 100%;
  }

  &-image {
    display: block;
    object-fit: scale-down;
  }

  &-file {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 2px;
    padding-left: 2px;
    background-image: linear-gradient(180deg, #76d1f8 0%, @blue 100%);

    &--inner {
      min-width: 0;
      padding-top: 25%;
      text-align: center;
    }

    &--filename {
      .text-overflow();
      transform: scale(0.8);
    }

    &--icon {
      width: 16px;
      vertical-align: top;
    }
  }

  &-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: @gray;
    border: 1px dashed @border-color-def;
    cursor: pointer;

    &--icon {
      width: 25px;
    }

    &--disabled {
      cursor: not-allowed;
    }

    &--disabled &--icon {
      opacity: 0.2;
    }
  }

  &-input {
    display: none;
  }

  @keyframes progress-blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>

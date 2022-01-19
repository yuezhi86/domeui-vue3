<template>
  <div class="x-uploader">
    <Upload
      ref="upload"
      :default-file-list="defaultFileList"
      :name="name"
      :disabled="disabled"
      :type="type"
      :accept="accept"
      :max-count="maxCount"
      :max-size="maxSize"
      :multiple="multiple"
      :remove="remove"
      :preview="preview"
      :sortable="sortable"
      :item-width="itemWidth"
      :item-height="itemHeight"
      :item-class="itemClass"
      :btn-class="btnClass"
      :image-params="imageParams"
      :video-params="videoParams"
      :file-params="fileParams"
      :upload-handle="uploadHandle"
      @onExceed="onExceed"
      @onSuccess="onSuccess"
      @onFail="onFail"
      @onChange="onChange"
      @onPreview="onPreview"
      @onRemove="onRemove"
    >
      <slot slot="prepend" name="prepend"></slot>
      <slot slot="append" name="append"></slot>
      <template #item="{item, index, image, video, file}">
        <slot
          name="item"
          :item="item"
          :index="index"
          :image="image"
          :video="video"
          :file="file"
        ></slot>
      </template>
      <template #itemAppend="{index, item}">
        <slot name="itemAppend" :index="index" :item="item"></slot>
      </template>
    </Upload>
    <div
      v-if="hasPreview"
      v-show="showPreview"
      ref="preview"
      v-transfer-dom
      class="x-uploader-preview"
      :data-transfer="true"
      @click.stop="onHide"
    >
      <div class="x-uploader-preview--close" @click.stop="onHide">
        <Icon name="close" />
      </div>
      <template v-if="isImage">
        <div class="x-uploader-preview--prev" @click.stop="onSwitch(-1)">
          <Icon name="arrow-left" />
        </div>
        <div class="x-uploader-preview--next" @click.stop="onSwitch(1)">
          <Icon name="arrow-right" />
        </div>
        <div class="x-uploader-preview--indicator">
          {{ previewInfo.index + 1 }}/{{ previewInfo.list.length }}
        </div>
      </template>

      <div
        ref="content"
        class="x-uploader-preview-content"
        :class="{'x-uploader-preview--video': isVideo}"
        @click.stop="() => null"
      >
        <img
          v-if="isImage && showPreview"
          class="x-uploader-preview--img"
          :src="previewInfo.list[previewInfo.index].viewer"
          :alt="previewInfo.list[previewInfo.index].filename"
          :style="imgStyles"
          @load="onImgLoad"
        />
        <video
          v-if="isVideo && showPreview"
          ref="videoPlayer"
          class="x-uploader-preview--video"
          controls="controls"
          autoplay
          muted
          webkit-playsinline="true"
          x5-playsinline="true"
          playsinline
        >
          <source
            :src="previewInfo.list[previewInfo.index].viewer"
            :type="mediaType"
          />
        </video>
      </div>
    </div>
  </div>
</template>

<script>
import {typeOf, getRect} from '@/utils';
import {getKey, fetchToken} from '@/methods/qiniu';
import {imgDomain} from 'config/server';
import Upload from '@/component/upload/Upload';
import {publicBucketDomain, qiniuUploadDomain} from 'config/server';
export default {
  components: {
    Upload,
  },
  props: {
    value: {
      type: [String, Object, Array],
      default: '',
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
      default: 70,
    },
    itemHeight: {
      type: Number,
      default: 70,
    },
    itemClass: {
      type: String,
      default: '',
    },
    btnClass: {
      type: String,
      default: '',
    },
    ignoreFilename: {
      type: Boolean,
      default: true,
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
    // 传入数据或输出数据的keyName
    keyName: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      // xhr: {}, // 调试用
      defaultFileList: [],
      hasPreview: false,
      showPreview: false,
      previewInfo: {
        list: [],
        index: -1,
      },
      previewWidth: 0,
      previewHeight: 0,
      imgMaxWidth: null,
      imgMaxHeight: null,
      mediaType: 'video/mp4',
    };
  },
  computed: {
    isImage({type}) {
      return type === 'image';
    },
    isVideo({type}) {
      return type === 'video';
    },
    imgRule({isImage, isVideo, itemWidth, itemHeight}) {
      if (isImage)
        `?imageMogr2/auto-orient/thumbnail/!${itemWidth}x${itemHeight}/gravity/Center`;
      if (isVideo) return `?vframe/jpg/offset/1/w/${itemWidth}/h/${itemHeight}`;
      return '';
    },
    keyNames({keyName}) {
      return Object.assign(
        {
          value: 'value',
          filename: 'filename',
          viewer: 'viewer',
          url: 'url',
        },
        keyName
      );
    },
    imgStyles({imgMaxWidth, imgMaxHeight}) {
      const style = {};
      if (imgMaxWidth) style.maxWidth = `${imgMaxWidth}px`;
      if (imgMaxHeight) style.maxHeight = `${imgMaxHeight}px`;
      return style;
    },
  },
  created() {
    this.parseValue(this.value);
    this.xhr = {};
  },
  mounted() {
    this.hasPreview = this.$refs.upload.showPreview;
  },
  methods: {
    onChange(value) {
      let res = value.map((item) =>
        this.getPostData(item, ['value', 'filename'])
      );

      if (res.length) {
        if (this.multiple) {
          if (this.ignoreFilename) {
            res = value.map(({value}) => value);
          }
        } else {
          res = this.ignoreFilename ? res[0][this.keyNames['value']] : res[0];
        }
      } else {
        res = this.multiple ? [] : '';
      }

      this.$emit('input', res);
      this.$emit('raw', value);
    },
    onPreview(value) {
      this.previewInfo = value;
      this.showPreview = true;

      if (this.isImage) {
        this.refreshPreview();
      }
    },
    onRemove({index, item, item: {_uid}}) {
      const cancelToken = this.xhr[_uid];
      if (cancelToken) {
        cancelToken.abort && cancelToken.abort();
        delete this.xhr[_uid];
      }

      this.$emit('onRemove', {
        index,
        item,
      });
    },
    onExceed({invalidExtFiles, invalidSizeFiles}) {
      if (invalidExtFiles.length) {
        this.$Message.warning(
          this.multiple ? '已忽略格式不匹配的个文件' : '文件格式不匹配'
        );
      }
      if (invalidSizeFiles.length) {
        this.$Message.warning(
          this.multiple ? '已忽略大小不匹配的个文件' : '文件大小不匹配'
        );
      }
      this.$emit('onExceed', {invalidExtFiles, invalidSizeFiles});
    },
    onSuccess(value) {
      this.$emit('onSuccess', value);
    },
    onFail(value) {
      this.$emit('onFail', value);
    },
    onHide() {
      this.showPreview = false;
      this.previewInfo = {list: [], index: -1};
      this.previewWidth = 0;
      this.previewHeight = 0;
      this.imgMaxWidth = null;
      this.imgMaxHeight = null;
    },
    onSwitch(num) {
      const {list, index} = this.previewInfo;
      let _num = index + num;

      if (num < 0 && index <= 0) {
        _num = 0;
      }

      if (num > 0 && index >= list.length - 1) {
        _num = list.length - 1;
      }

      this.previewInfo.index = _num;
      this.refreshPreview();
    },
    onImgLoad() {
      const {
        previewWidth: pw,
        previewHeight: ph,
        $refs: {content},
      } = this;
      const {width, height} = getRect(content);
      const isVertical = height > width;
      // 由于 img max-width:100%，所以 wRatio 不会超过 1
      const wRatio = width / pw;
      const hRatio = height / ph;

      if (wRatio <= 1 && hRatio <= 1) return;

      if (isVertical) {
        // 比例缩放后任然大于容器宽度，则使用容器宽度设置img最大宽度
        if (width * hRatio > pw) {
          this.imgMaxWidth = pw;
        } else {
          this.imgMaxHeight = ph;
        }
      } else {
        if (height * wRatio > ph) {
          this.imgMaxHeight = ph;
        } else {
          this.imgMaxWidth = pw;
        }
      }
    },
    uploadHandle(files, done) {
      files.forEach(async (item) => {
        const key = getKey(item.file);
        const {
          data: {token},
        } = await fetchToken({type: 1, key});
        this.xhr[item._uid] = this.upload({key, token, file: item}, done);
      });
    },
    upload({token, key, file}, done) {
      const formData = new FormData();
      formData.append('bucket', publicBucketDomain);
      formData.append('token', token);
      formData.append('key', key);
      formData.append('file', file.file);

      function getBody(xhr) {
        const text = xhr.responseText || xhr.response;
        if (!text) {
          return text;
        }

        try {
          return JSON.parse(text);
        } catch (e) {
          return text;
        }
      }

      const xhr = new XMLHttpRequest();

      if (xhr.upload) {
        xhr.upload.onprogress = function progress(e) {
          if (e.total > 0) {
            e.percent = (e.loaded / e.total) * 100;
          }
          file.percent = e.percent || 0;
        };
      }

      xhr.onerror = () => {
        delete this.xhr[file._uid];
        file.fail = true;
        done([file]);
      };

      xhr.onload = () => {
        delete this.xhr[file._uid];

        if (xhr.status !== 200) {
          file.fail = true;
          done([file]);
          return;
        }

        const {key} = getBody(xhr);
        file.value = key;
        file.viewer = `${imgDomain}/${key}`;
        file.url = `${file.viewer}${this.imgRule}`;
        done([file]);
      };

      xhr.open('post', qiniuUploadDomain, true);
      xhr.send(formData);

      return xhr;
    },
    parseValue(value) {
      if (!value) return;

      const type = typeOf(value);
      let list = [];

      if (type.isString || type.isObject) {
        list.push(parse.call(this, value));
      }

      if (type.isArray) {
        list = value.map((value) => parse.call(this, value));
      }

      this.defaultFileList = list;

      function parse(value) {
        if (typeOf(value).isString) {
          const viewer = `${imgDomain}/${value}`;
          const url = `${viewer}${this.imgRule}`;
          return {
            value,
            viewer,
            url,
          };
        } else {
          const _value = value[this.keyNames['value']];
          const filename = value[this.keyNames['filename']];
          const viewer = `${imgDomain}/${_value}`;
          const url = `${viewer}${this.imgRule}`;
          return {
            value: _value,
            filename,
            viewer,
            url,
          };
        }
      }
    },
    updateDefaultFileList() {
      this.parseValue(this.value);
    },
    refreshPreview() {
      this.$nextTick(() => {
        const {width, height} = getRect(this.$refs.preview);
        this.previewWidth = width;
        this.previewHeight = height;
      });
    },
    getPostData(item, names) {
      const res = {};
      names.forEach((name) => {
        res[this.keyNames[name]] = item[name];
      });
      return res;
    },
  },
};
</script>

<style lang="less">
@import '~@/assets/styles/variables';
@import '~@/assets/styles/mixins';

.x-uploader {
  &-preview {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1100;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.8);
    .user-select-none();

    &--close,
    &--prev,
    &--next {
      position: absolute;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      color: #fff;
      cursor: pointer;
      transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

      &:hover {
        box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
      }
    }

    &--close {
      top: 10px;
      right: 10px;
    }

    &--prev,
    &--next {
      top: 50%;
      transform: translateY(-50%);

      &:hover {
        transform: translateY(-50%) scale(1.1);
      }
    }

    &--indicator {
      position: absolute;
      bottom: 20px;
      left: 50%;
      z-index: 10;
      height: 20px;
      padding: 2px 10px;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 10px;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
      line-height: 16px;
      transform: translateX(-50%);
    }

    &--prev {
      left: 20px;
    }

    &--next {
      right: 20px;
    }

    &--video {
      position: relative;
      z-index: 1;
      max-width: 100%;
      height: 100%;
    }

    &--img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>

<template>
  <Upload
    ref="upload"
    type="drag"
    :format="ext"
    :disabled="disabled"
    :max-size="maxSize * 1024"
    :show-upload-list="false"
    :with-credentials="withCredentials"
    :action="realAction"
    :data="uploadQuery"
    :before-upload="onBeforeUpload"
    :on-progress="onProgress"
    :on-success="onSuccess"
    :on-error="onError"
    :on-format-error="onFormatError"
    :on-exceeded-size="onExceededSize"
  >
    <div
      class="upload-wrap"
      :class="{
        'has-files': data.length,
      }"
    >
      <div>
        <template v-if="showContent">
          <IIcon type="ios-cloud-upload" size="40" style="color: #3399ff"></IIcon>
          <p style="margin-bottom: 10px">点击或拖拽上传{{ tips }}</p>
          <p style="color: #666; font-size: 12px">
            <slot name="size">文件大小不超过{{ maxSize }}M，格式为{{ ext.join('、') }}。</slot>
          </p>
        </template>
        <div class="main-slot"><slot></slot></div>
        <Progress v-if="uploading" :percent="file && file.percentage" class="progress" hide-info></Progress>
      </div>
    </div>
  </Upload>
</template>

<script>
import {Upload, Progress} from 'iview';
import {qiniuUploadDomain, privateBucketDomain, publicBucketDomain} from 'config/server';
import {getKey, fetchToken} from '@/methods/qiniu';

export default {
  components: {
    Upload,
    Progress,
  },
  /**
   * @param {boolean}  props.privateSpace  上传至私有空间
   * @param {object}   props.payload  接口请求参数
   * @param {number}   props.maxCount 文件数量上限
   * @param {number}   props.maxSize  文件大小上限
   */
  props: {
    // 如果改参数有值，则只用改链接作为请求地址，否则直接上传到七牛云
    action: {
      type: String,
      default: '',
    },
    privateSpace: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    tips: {
      type: String,
      default: '文件',
    },
    payload: {
      type: Object,
      default() {
        return {};
      },
    },
    maxCount: {
      type: Number,
      default: 6,
    },
    maxSize: {
      type: Number,
      default: 30,
    },
    ext: {
      type: Array,
      default() {
        return ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'];
      },
    },
    withCredentials: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    showContent: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      uploadList: [],
      uploading: false,
    };
  },
  computed: {
    file() {
      return this.uploadList[0];
    },
    uploadQuery() {
      if (this.action) {
        return this.payload;
      } else {
        const bucket = this.privateSpace ? privateBucketDomain : publicBucketDomain;
        return {
          token: '',
          key: '',
          bucket,
          ...this.payload,
        };
      }
    },
    realAction() {
      if (this.action) {
        return this.action;
      } else {
        return qiniuUploadDomain;
      }
    },
  },
  watch: {
    data() {
      if (!this.$refs.upload) return;
      this.$nextTick(() => {
        this.uploadList = this.$refs.upload.fileList;
      });
    },
  },
  mounted() {
    if (!this.$refs.upload) return;
    this.$nextTick(() => {
      this.uploadList = this.$refs.upload.fileList;
    });
  },
  methods: {
    async onBeforeUpload(file) {
      let check = true;

      try {
        const key = getKey(file);
        const {
          data: {token},
        } = await fetchToken({type: this.privateSpace ? 2 : 1, key});
        this.uploadQuery.token = token;
        this.uploadQuery.key = key;
        this.originName = file.name;
      } catch (e) {
        check = false;
      }

      return check;
    },
    onProgress() {
      this.uploading = true;
    },
    onSuccess(res, file) {
      this.uploading = false;
      this.$refs.upload.fileList = [];
      this.uploadList = this.$refs.upload.fileList;

      if (this.action) {
        const {message, code, data} = res;
        if (code === 1) {
          this.$emit('onUploaded', data);
        } else {
          this.$emit('onError', message);
        }
        return;
      }

      file.url = res.key;
      file.name = res.key;
      file.originName = this.originName;
      this.originName = '';
      this.$emit('onUploaded', {
        key: res.key,
        name: file.originName,
      });
    },
    onError(error, file, fileList) {
      this.uploading = false;
      // 处理掉多余的数据
      if (fileList.length > 1) fileList.shift();
      this.$emit('onError', error);
    },
    onFormatError() {
      this.$Message.error(`文件格式必须是${this.ext.join('、')}`);
    },
    onExceededSize() {
      this.$Message.error(`文件不能超过${this.maxSize}MB`);
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variables';
@import '~@/assets/styles/mixins';

.upload-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  padding-bottom: 10px;
  background-color: #fafafa;

  &.has-files {
    height: 120px;
  }
}

.progress {
  position: absolute;
  bottom: 5px;
  left: 50%;
  width: 200px;
  margin-top: 30px;
  transform: translateX(-50%);
}
</style>

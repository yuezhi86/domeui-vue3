<template>
  <section class="de-upload">
    <slot name="prepend"></slot>
    <div class="de-upload-inner">
      <template v-for="(item, index) in fileList" :key="index">
        <div class="de-upload-item__wrap">
          <div
            v-if="'holder' in item"
            class="de-upload-holder"
            :style="itemStyle"
            @dragover.stop="onDragOver"
            @dragend.stop="onDragEnd"
          ></div>
          <div
            v-else
            class="de-upload-item"
            :class="[itemClass, {'de-upload-item__move': sortable}]"
            :style="itemStyle"
            :draggable="multiple && sortable"
            @dragstart.stop="onDragStart(item, $event)"
            @dragenter.stop="onDragEnter(item, $event)"
            @dragover.stop="onDragOver"
            @dragend.stop="onDragEnd"
          >
            <div
              v-if="sortable"
              class="de-upload-item__move-after"
              data-after
            ></div>
            <div
              v-if="item.done === false || item.fail"
              class="de-upload-progress"
              :class="{'de-upload-progress__fail': item.fail}"
            >
              <div class="de-upload-progress__inner">
                <div class="de-upload-progress__text">
                  {{ item.fail ? '上传失败' : '上传中...' }}
                </div>
                <div
                  class="de-upload-progress__bar"
                  :class="{
                    'de-upload-progress__bar-blink': item.done === false,
                  }"
                >
                  <div
                    class="de-upload-progress__bar-line"
                    :style="{width: item.percent + '%'}"
                  ></div>
                </div>
              </div>
            </div>

            <div
              v-if="item.done"
              class="de-upload-status"
              :class="{'de-upload-status__fail': item.fail}"
            ></div>

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
                class="de-upload-image"
                :class="{'de-upload-image__error': item.error}"
                :data-viewer="item.viewer"
                @error="onImgLoadError(item)"
              />
              <div
                v-if="isFile || (isVideo && !videoOption.poster)"
                class="de-upload-file"
              >
                <div class="de-upload-file__inner">
                  <div class="de-upload-file__filename">
                    {{ item.filename }}
                  </div>
                  <img
                    v-if="isVideo"
                    class="de-upload-file__icon"
                    :src="videoOption.itemIcon"
                  />
                  <img
                    v-if="isFile"
                    class="de-upload-file__icon"
                    :src="fileOption.itemIcon"
                  />
                </div>
              </div>
            </slot>
            <div
              v-if="remove || (showPreview && item.done)"
              class="de-upload-action"
            >
              <div
                v-if="showPreview && item.done"
                class="de-upload-action__preview"
                :class="{
                  'de-upload-action__disabled': item.error || item.fail,
                }"
                @click.stop="onPreview(item)"
              ></div>
              <div
                v-if="remove"
                class="de-upload-action__remove"
                @click.stop="onRemove(index, item)"
              ></div>
            </div>
          </div>
          <slot name="itemAppend" :index="index" :item="item"></slot>
        </div>
      </template>

      <div
        v-if="showBtn"
        class="de-upload-btn"
        :class="[
          btnClass,
          {
            'de-upload-btn__disabled': disabled,
          },
        ]"
        :style="itemStyle"
        @click.stop="onClickInput"
      >
        <slot name="btn">
          <img :src="btnIcon" alt="按钮" class="de-upload-btn__icon" />
        </slot>
        <input
          ref="input"
          type="file"
          :name="name"
          :multiple="multiple"
          class="de-upload-input"
          @change="onChoose"
        />
      </div>
    </div>
    <slot name="append"></slot>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  computed,
  watch,
  CSSProperties,
} from 'vue';
import {cloneDeep} from 'lodash-es';
import {getSizeOrPx} from '../../utils';
import errorImg from './images/icon_img_error.png';
import iconCamera from './images/icon_camera.png';
import iconVideo from './images/icon_video.png';
import iconVideoWhite from './images/icon_video_white.png';
import iconFile from './images/icon_file.png';
import iconFileWhite from './images/icon_file_white.png';

const defaultImageParams = {
  errorImg,
  btnIcon: iconCamera,
};
const defaultVideoParams = {
  poster: true,
  btnIcon: iconVideo,
  itemIcon: iconVideoWhite,
  mediaType: 'video/mp4',
};
const defaultFileParams = {
  btnIcon: iconFile,
  itemIcon: iconFileWhite,
};

/**
 * 上传组件
 * 支持图片上传模式、视频上传模式、文件上传模式
 * 内部只调用传入的上传函数，不实现上传函数逻辑
 */
const name = 'de-upload';
export default defineComponent({
  name,
  props: {
    defaultFileList: {
      type: Array as PropType<UploadDefaultFileItem[]>,
      default: () => [],
    },
    name: {
      type: String,
      default: '',
    },
    type: {
      type: String as PropType<'image' | 'video' | 'file'>,
      default: 'image',
      validator: (value: string) => ['image', 'video', 'file'].includes(value),
    },
    // 允许的文件扩展名，如：png
    accept: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    // 仅 multiple=true 时有用
    maxCount: {
      type: Number,
      default: 1,
    },
    // 2MB
    maxSize: {
      type: Number,
      default: 2,
    },
    remove: {
      type: Boolean,
      default: true,
    },
    preview: {
      type: Boolean,
      default: true,
    },
    sortable: Boolean,
    multiple: Boolean,
    disabled: Boolean,
    itemWidth: {
      type: [Number, String],
      default: 100,
    },
    itemHeight: {
      type: [Number, String],
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
      type: Object as PropType<UploadImageParams>,
      default: () => defaultImageParams,
    },
    videoParams: {
      type: Object as PropType<UploadVideoParams>,
      default: () => defaultVideoParams,
    },
    fileParams: {
      type: Object as PropType<UploadFileParams>,
      default: () => defaultFileParams,
    },
    // 函数接受两个参数：files 和 done 函数，当上传成功后调用done(result)
    uploadHandle: {
      type: Function as PropType<
        (files: UploadFileItem[], done: UploadDoneFn) => void
      >,
      required: true,
    },
    // 接受一个函数：返回 false，或 Promise.reject() 时取消上传
    beforeUpload: {
      type: Function,
      default: undefined,
    },
  },
  emits: {
    exceed: (payload: UploadInvalidPayload) => payload,
    change: (payload: UploadFileItem[]) => payload,
    remove: (payload: {index: number; item: UploadFileItem}) => payload,
    preview: (payload: {index: number; list: UploadFileItem[]}) => payload,
    sort: (index: number) => index,
    success: (payload: UploadFileItem[]) => payload,
    fail: (payload: UploadFileItem[]) => payload,
    upload: (payload: {success: UploadFileItem[]; fail: UploadFileItem[]}) =>
      payload,
    'change-default': (payload: UploadFileItem[]) => payload,
  },
  setup(props, {emit}) {
    let uid = 0;
    const input = ref<HTMLInputElement | null>(null);
    const fileList = ref<Array<UploadHolderItem | UploadFileItem>>([]);

    const isImage = computed(() => props.type === 'image');
    const isVideo = computed(() => props.type === 'video');
    const isFile = computed(() => props.type === 'file');

    const imageOption = computed(() => {
      return Object.assign(defaultImageParams, props.imageParams);
    });
    const videoOption = computed(() => {
      return Object.assign(defaultVideoParams, props.videoParams);
    });
    const fileOption = computed(() => {
      return Object.assign(defaultFileParams, props.fileParams);
    });

    const itemStyle = computed<CSSProperties>(() => {
      return {
        width: getSizeOrPx(props.itemWidth),
        height: getSizeOrPx(props.itemHeight),
      };
    });
    const btnIcon = computed(() => {
      let val = imageOption.value.btnIcon;

      switch (props.type) {
        case 'video':
          val = videoOption.value.btnIcon;
          break;
        case 'file':
          val = fileOption.value.btnIcon;
      }

      return val;
    });
    const acceptExt = computed<string[]>(() => {
      if (props.accept.length) return props.accept;
      if (isVideo.value) return ['mp4'];
      if (isImage.value) return ['jpeg', 'jpg', 'png'];
      return [];
    });
    const showBtn = computed(() => {
      return props.multiple
        ? fileList.value.length < props.maxCount
        : !fileList.value.length;
    });
    const showPreview = computed(() => {
      if (isFile.value) return false;
      return props.preview;
    });

    const unref = (files: UploadFileItem[]) => cloneDeep(files);
    const changeEmit = (name: any) => {
      const files = fileList.value.filter((item) => {
        const {done, fail} = item as UploadFileItem;
        return done && !fail;
      });
      emit(name, unref(files as UploadFileItem[]));
    };

    const changeDefaultHandle = () => changeEmit('change-default');
    const changeHandle = () => changeEmit('change');
    const exceedHandle = (payload: UploadInvalidPayload) =>
      emit('exceed', payload);
    const uploadHandle = (
      success: UploadFileItem[],
      fail: UploadFileItem[]
    ) => {
      emit('upload', {
        success: unref(success),
        fail: unref(fail),
      });
    };
    const successHandle = (payload: UploadFileItem[]) =>
      emit('success', unref(payload));
    const failHandle = (payload: UploadFileItem[]) =>
      emit('fail', unref(payload));
    const doneHandle = (payload: UploadFileItem[]) => {
      const _success: UploadFileItem[] = [];
      const _fail: UploadFileItem[] = [];

      payload.forEach((item) => {
        const {uid, url, viewer, value, filename, percent, fail} = item;
        const index = fileList.value.findIndex((item) => {
          const {uid: _uid} = item as UploadFileItem;
          return _uid === uid;
        });
        // 如果在上传过程中被删除，则会忽略掉该文件
        if (index > -1) {
          const fileItem = {
            uid,
            value,
            filename,
            url: url || value,
            viewer: viewer || url || value,
            percent,
            fail,
            done: true,
          };

          fileList.value.splice(index, 1, fileItem);
          (fail ? _fail : _success).push(fileItem);
        }
      });

      uploadHandle(_success, _fail);
      if (_success.length) successHandle(_success);
      if (_fail.length) failHandle(_fail);
      changeHandle();
    };

    const onClickInput = () => {
      if (props.disabled) return;
      if (input.value) {
        input.value.value = '';
        input.value.click();
      }
    };
    const onChoose = async (e: InputEvent) => {
      const target = e.target as HTMLInputElement;
      const files = target.files as FileList;

      if (!files.length) return;

      const extRegx = /\S+\.([0-9a-zA-Z]+)$/;
      const maxSize = props.maxSize * 1024 * 1024;
      const invalidExtFiles: File[] = [];
      const invalidSizeFiles: File[] = [];
      const validFiles: File[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const {size, name} = file;
        const matchRes = name.match(extRegx);
        const ext = (matchRes ? matchRes[1] : '').toLocaleLowerCase();

        if (!acceptExt.value.some((item) => item.toLocaleLowerCase() === ext)) {
          invalidExtFiles.push(file);
          continue;
        }

        if (size > maxSize) {
          invalidSizeFiles.push(file);
          continue;
        }

        validFiles.push(file);
        const fileCount = fileList.value.length + validFiles.length;
        if ((fileCount && !props.multiple) || fileCount === props.maxCount) {
          break;
        }
      }

      if (invalidExtFiles.length || invalidSizeFiles.length) {
        const payload = {
          invalidExtFiles,
          invalidSizeFiles,
        };

        exceedHandle(payload);
        if (!validFiles.length) return;
      }

      const _fileList = validFiles.map((file) => {
        return {
          uid: uid++,
          file,
          filename: file.name,
          percent: 0, // 上传进度
          done: false, // 上传结束或上传出错时为 true
          fail: false, // 上传失败时为 true
        };
      });

      if (typeof props.beforeUpload === 'function') {
        let before;

        try {
          before = await props.beforeUpload(
            unref(_fileList as UploadFileItem[])
          );
        } catch (e) {
          before = false;
        }

        if (before === false) {
          _fileList.forEach((file) => {
            if (!file.done) {
              file.done = true;
              file.fail = true;
            }
          });
          return;
        }
      }

      fileList.value = fileList.value.concat(_fileList);
      props.uploadHandle(_fileList as UploadFileItem[], doneHandle);
    };
    const onRemove = (index: number, item: UploadFileItem) => {
      fileList.value.splice(index, 1);
      // 删除文件后，如果要中断上传，需要结合 onRemove 自己去实现
      emit('remove', {
        index,
        item,
      });
      changeHandle();
    };
    const onPreview = (item: UploadFileItem) => {
      const {error, fail} = item;
      if (error || fail) return;
      const _fileList = fileList.value.filter((item) => {
        const {done} = item as UploadFileItem;
        return done;
      });
      const list = unref(_fileList as UploadFileItem[]);
      const index = list.findIndex(({uid}) => uid === item.uid);
      emit('preview', {index, list});
    };
    const onImgLoadError = (item: UploadFileItem) => {
      if (isImage.value && !item.error) {
        item.error = true;
        item.url = imageOption.value.errorImg;
      }
    };

    // 拖拽
    let timer: number;
    let dragIndex = -1;
    let dragData: UploadFileItem | undefined;
    const getPlaceholderIndex = () => {
      return fileList.value.findIndex((item) => {
        const {holder} = item as UploadHolderItem;
        return holder;
      });
    };
    const getTargetIndex = (targetUid: number) => {
      return fileList.value.findIndex((item) => {
        const {uid: _uid} = item as UploadFileItem;
        return _uid === targetUid;
      });
    };
    const onDragStart = (item: UploadFileItem, e: DragEvent) => {
      const dataTransfer = e.dataTransfer as DataTransfer;
      dataTransfer.effectAllowed = 'move';
      dragData = item;
      timer = setTimeout(() => {
        if (!dragData) return;
        dragIndex = getTargetIndex(dragData.uid);
        fileList.value.splice(dragIndex, 1);
      }, 300);
    };
    const onDragEnter = (item: UploadFileItem, e: DragEvent) => {
      const target = e.target as HTMLDivElement;
      const dataTransfer = e.dataTransfer as DataTransfer;
      dataTransfer.dropEffect = 'move';
      const isAfter = 'after' in target.dataset;

      if (dragData && item.uid === dragData.uid) {
        if (dragIndex === -1) {
          clearTimeout(timer);
          dragIndex = getTargetIndex(dragData.uid);
          fileList.value.splice(dragIndex, 1);
          const index = dragIndex + Number(isAfter);
          fileList.value.splice(index, 0, {
            holder: true,
          });
        }

        return;
      }

      const holderIndex = getPlaceholderIndex();
      if (holderIndex > -1) {
        fileList.value.splice(holderIndex, 1);
      }

      if (dragIndex === -1) {
        clearTimeout(timer);
        if (!dragData) return;
        dragIndex = getTargetIndex(dragData.uid);
        fileList.value.splice(dragIndex, 1);
      }

      const targetIndex = getTargetIndex(item.uid);
      const index = targetIndex + Number(isAfter);
      fileList.value.splice(index, 0, {
        holder: true,
      });
    };
    const onDragOver = (e: DragEvent) => {
      e.preventDefault();
    };
    const onDragEnd = () => {
      const holderIndex = getPlaceholderIndex();
      if (dragData && holderIndex > -1) {
        fileList.value.splice(holderIndex, 1, dragData);
        dragIndex = -1;
        dragData = undefined;
        emit('sort', holderIndex);
        changeHandle();
      }

      if (dragData && dragIndex > -1) {
        fileList.value.splice(dragIndex, 0, dragData);
      }
    };

    watch(
      () => props.defaultFileList,
      (newFileList) => {
        fileList.value = newFileList.map((item) => {
          const value = item.value;
          const filename = item.filename || value;
          const url = item.url || value;
          const viewer = item.viewer || url || value;

          return {
            uid: uid++,
            value,
            filename,
            url,
            viewer,
            done: true,
            percent: 100,
          };
        });

        if (fileList.value.length) changeDefaultHandle();
      },
      {
        immediate: true,
      }
    );

    return {
      input,
      fileList,
      isImage,
      isVideo,
      isFile,
      itemStyle,
      acceptExt,
      btnIcon,
      videoOption,
      imageOption,
      fileOption,
      showBtn,
      showPreview,
      onClickInput,
      onChoose,
      onRemove,
      onPreview,
      onImgLoadError,
      onDragStart,
      onDragEnter,
      onDragOver,
      onDragEnd,
    };
  },
});

export type UploadDefaultFileItem = {
  value: string;
  filename?: string;
  url?: string;
  viewer?: string;
};

/**
 * @property {number} uid - 唯一标识，用于查找数据
 * @property {number} percent - 上传进度
 * @property {boolean} done - 上传结束为 true，无论成功与否
 * @property {string} [value] - 用于提交的 value，可能是云存储的key，如果不传则使用 url 的值
 * @property {string} [filename] - 文件名
 * @property {string} [url] - 缩略图 url
 * @property {string} [viewer] - 用于预览大图链接，如果不传则使用 url 的值
 * @property {string} [poster] - 视频图
 * @property {File} [file] - 文件
 * @property {boolean} [error] - 图片加载失败
 * @property {boolean} [fail] - 上传失败时为 true
 */
export type UploadFileItem = {
  uid: number;
  percent: number;
  done: boolean;
  value?: string;
  filename?: string;
  url?: string;
  viewer?: string;
  poster?: string;
  file?: File;
  error?: boolean;
  fail?: boolean;
};
export type UploadHolderItem = {
  holder: boolean;
};
export type UploadImageParams = {
  errorImg?: string;
  btnIcon?: string;
};
export type UploadVideoParams = {
  poster?: boolean;
  btnIcon?: string;
  itemIcon?: string;
  mediaType?: string;
};
export type UploadFileParams = {
  btnIcon?: string;
  itemIcon?: string;
};
export type UploadInvalidPayload = {
  invalidExtFiles: File[];
  invalidSizeFiles: File[];
};
export type UploadDoneFn = (payload: UploadFileItem[]) => void;
</script>

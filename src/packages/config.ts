import merge from 'lodash-es/merge';
import {cloneDeep} from 'lodash-es';
import {LoadingTheme} from './components/loading/loading.vue';
import avatarDefImg from './components/avatar/image/def.png';
import loadingImg from './components/image/image/loading.gif';
import errorImg from './components/image/image/error.png';
import {ImageRendering} from './components/image/image.vue';

const defaultConfig: Required<GlobalConfig> = {
  common: {
    zIndex: 1100, // 基础z-index
    transfer: true,
  },
  message: {
    duration: 1.5, // 1.5s
  },
  loading: {
    text: '正在加载...',
    theme: 'white',
    transparent: false,
    mask: true,
    fixed: true,
    scrollable: false,
    zIndex: 10,
  },
  avatar: {
    defImg: avatarDefImg,
  },
  image: {
    loadingImg,
    errorImg,
    errorReload: false,
  },
  modal: {
    confirmText: '确认',
    cancelText: '取消',
    maskClosable: false,
    mask: true,
    escClosable: true,
    closable: false,
    scrollable: false,
  },
};
const globalConfig: GlobalConfig = {};

export function getConfig(): Required<GlobalConfig> {
  return merge(cloneDeep(defaultConfig), cloneDeep(globalConfig));
}

export function setConfig(config: GlobalConfig | undefined) {
  if (!config) return;
  merge(globalConfig, cloneDeep(defaultConfig), config);
}

export type Numberish = string | number;
export type CommonConfig = {
  zIndex?: number;
  transfer?: boolean;
};
export type MessageConfig = {
  duration?: number;
};
export type LoadingConfig = {
  text?: string;
  theme?: LoadingTheme;
  transparent?: boolean;
  mask?: boolean;
  fixed?: boolean;
  scrollable?: boolean;
  zIndex?: number;
};
export type AvatarConfig = {
  defImg?: string;
};
export type ImageConfig = {
  loadingImg?: string;
  errorImg?: string;
  errorReload?: boolean;
  imageRendering?: ImageRendering;
};
export type ModalConfig = {
  confirmText?: string;
  cancelText?: string;
  maskClosable?: boolean;
  mask?: boolean;
  escClosable?: boolean;
  closable?: boolean;
  draggable?: boolean;
  scrollable?: boolean;
  transfer?: boolean;
};

export type GlobalConfig = {
  common?: CommonConfig;
  message?: MessageConfig;
  loading?: LoadingConfig;
  avatar?: AvatarConfig;
  image?: ImageConfig;
  modal?: ModalConfig;
};

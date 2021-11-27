import merge from 'lodash-es/merge';
import {cloneDeep} from 'lodash-es';
import {LoadingTheme} from './components/loading/loading.vue';
import avatarDefImg from './components/avatar/image/def.png';

export type CommonConfig = {
  zIndex?: number;
  transfer?: boolean;
};
export type NoticeConfig = {
  margin?: number;
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

export type GlobalConfig = {
  common?: CommonConfig;
  notice?: NoticeConfig;
  loading?: LoadingConfig;
  avatar?: AvatarConfig;
};

const defaultConfig: Required<GlobalConfig> = {
  common: {
    zIndex: 1100, // 基础z-index
    transfer: true,
  },
  notice: {
    margin: 25, // 25px
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
};
const globalConfig: GlobalConfig = {};

export function getConfig(): Required<GlobalConfig> {
  return merge(cloneDeep(defaultConfig), cloneDeep(globalConfig));
}

export function setConfig(config: GlobalConfig | undefined) {
  if (!config) return;
  merge(globalConfig, cloneDeep(defaultConfig), config);
}

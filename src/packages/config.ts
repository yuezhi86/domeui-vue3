import merge from 'lodash-es/merge';
import {cloneDeep} from 'lodash-es';
import {LoadingTheme} from './components/loading/loading.vue';

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
  mask?: boolean;
  fixed?: boolean;
  zIndex?: number;
};

export type GlobalConfig = {
  common?: CommonConfig;
  notice?: NoticeConfig;
  loading?: LoadingConfig;
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
    mask: true,
    fixed: true,
    zIndex: 10,
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

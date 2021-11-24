import merge from 'lodash-es/merge';
import {cloneDeep} from 'lodash-es';

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
  size?: number;
  mask?: boolean;
  fixed?: boolean;
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
    mask: true,
    fixed: true,
  },
};
const globalConfig: GlobalConfig = {};

type ConfigReturn = CommonConfig & NoticeConfig & LoadingConfig;
export function getConfig(name: keyof GlobalConfig): ConfigReturn {
  return globalConfig[name] || defaultConfig[name];
}

export function setConfig(config: GlobalConfig | undefined) {
  if (!config) return;
  merge(globalConfig, cloneDeep(defaultConfig), config);
  console.log('globalConfig', globalConfig);
}

import merge from 'lodash-es/merge';
import cloneDeep from 'lodash-es/cloneDeep';

export type CommonConfig = {
  zIndex?: number;
  transfer?: boolean;
};
export type NoticeConfig = {
  margin?: number;
  duration?: number;
};
export type MessageConfig = NoticeConfig & {};
export type GlobalConfig = {
  [key: string]: any;
  common?: CommonConfig;
  notice?: NoticeConfig;
  message?: MessageConfig;
};

const defaultConfig: GlobalConfig = {
  common: {
    zIndex: 2000, // 基础z-index
    transfer: true,
  },
  message: {
    margin: 25, // 25px
    duration: 1.5, // 1.5s
  },
  notice: {
    margin: 25,
    duration: 4.5,
  },
};
const globalConfig: GlobalConfig = {};

type ConfigReturn = CommonConfig | NoticeConfig | MessageConfig;
export function getConfig(name: string): ConfigReturn {
  return globalConfig[name];
}
export function setConfig(config: GlobalConfig | undefined) {
  if (!config) return;
  merge(globalConfig, cloneDeep(defaultConfig), config);
  console.log('globalConfig', globalConfig);
}

import {CommonConfig, NoticeConfig, GlobalConfig} from './types';
import merge from 'lodash-es/merge';
import cloneDeep from 'lodash-es/cloneDeep';

const defaultConfig: GlobalConfig = {
  common: {
    zIndex: 1000, // 基础z-index
    transfer: true,
  },
  message: {
    top: 25, // 25px
    duration: 1.5, // 1.5s
  },
};
const globalConfig: GlobalConfig = {};

type ReturnConfig = CommonConfig | NoticeConfig;
export function getConfig(name: string): ReturnConfig {
  return globalConfig[name];
}
export function setConfig(config: GlobalConfig | undefined) {
  if (!config) return;
  merge(globalConfig, cloneDeep(defaultConfig), config);
  console.log('globalConfig', globalConfig);
}

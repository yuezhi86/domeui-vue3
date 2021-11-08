import {CommonConfig, MessageConfig, Config} from './types';
import merge from 'lodash-es/merge';
import cloneDeep from 'lodash-es/cloneDeep';

const defaultConfig: Config = {
  common: {
    zIndex: 1000, // 基础z-index
    transfer: true,
  },
  message: {
    top: 25, // 25px
    duration: 1.5, // 1.5s
  },
};
const globalConfig: Config = {};

type ReturnConfig = CommonConfig | MessageConfig;
export function getConfig(name: string): ReturnConfig {
  return globalConfig[name];
}
export function setConfig(config: Config | undefined) {
  if (!config) return;
  merge(globalConfig, cloneDeep(defaultConfig), config);
  console.log('globalConfig', globalConfig);
}

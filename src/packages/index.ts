import {setConfig, GlobalConfig} from './config';

export * from './utils';
export * from './components/button';
export * from './components/input';
export * from './components/switch';
export * from './components/checkbox';
export * from './components/notice';
export * from './components/icon';
export * from './components/badge';
export * from './components/loading';
export * from './components/avatar';
export * from './components/image';
export * from './components/modal';

export function config(options?: GlobalConfig) {
  setConfig(options);
}

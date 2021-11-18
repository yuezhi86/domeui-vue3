import {App} from 'vue';
import {setConfig, GlobalConfig} from './config';

export * from './components/button';
export * from './components/input';
export * from './components/switch';
export * from './components/checkbox';
export * from './components/notice';
export * from './components/icon';
export * from './components/badge';

export function config(options?: GlobalConfig) {
  setConfig(options);
}
export function install(app: App) {
  console.log(app);
}

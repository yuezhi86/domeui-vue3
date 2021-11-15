import {App} from 'vue';
import {GlobalConfig} from './types';
import {setConfig} from './config';

export {DeButton} from './components/button';
export {DeInput} from './components/input';
export {DeSwitch} from './components/switch';
export {DeCheckbox, DeCheckboxGroup} from './components/checkbox';
export {DeNotice} from './components/notice';
export {DeIcon} from './components/icon';
export {DeBadge} from './components/badge';

export function config(options?: GlobalConfig) {
  setConfig(options);
}
export function install(app: App) {
  console.log(app);
}

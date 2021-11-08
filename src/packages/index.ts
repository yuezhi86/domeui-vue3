import {App} from 'vue';
import {GlobalConfig} from './types';
import {setConfig} from './config';
import Button from './components/button/index.vue';
import Input from './components/input/index.vue';
import Checkbox from './components/checkbox/index.vue';
import CheckboxGroup from './components/checkbox-group/index.vue';
import Switch from './components/switch/index.vue';
import Message from './components/message';

export const DeButton = Button;
export const DeInput = Input;
export const DeCheckbox = Checkbox;
export const DeCheckboxGroup = CheckboxGroup;
export const DeSwitch = Switch;
export const DeMessage = Message;

export function config(options?: GlobalConfig) {
  setConfig(options);
}
export function install(app: App) {
  console.log(app);
}

import {h} from 'vue';
export type CheckboxValue = string | number | boolean;
export type MessageTypes = 'info' | 'success' | 'fail' | 'warning';
export type MessageOptions = {
  content: string;
  type?: MessageTypes;
  duration?: number;
  onBeforeUnmounted?: Function;
  onUnmounted?: Function;
  closable?: boolean;
  className?: string;
  render?: () => ReturnType<typeof h>;
};

export type CommonConfig = {
  zIndex?: number;
  transfer?: boolean;
};
export type MessageConfig = {
  top?: number;
  duration?: number;
};
export type Config = {
  [key: string]: any;
  common?: CommonConfig;
  message?: MessageConfig;
};

import {h} from 'vue';
export type CheckboxValue = string | number | boolean;
export type MessageTypes = 'info' | 'success' | 'fail' | 'warning';
export type MessageOptions = {
  message: string;
  type?: MessageTypes;
  duration?: number;
  onUnmounted?: Function;
  closable?: boolean;
  className?: string;
  render?: () => ReturnType<typeof h>;
};

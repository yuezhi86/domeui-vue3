import {h} from 'vue';

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
export type MessageRestOptions = Omit<MessageOptions, 'type' | 'content'>;
export type MessageMethod = (
  content: string,
  config?: MessageRestOptions
) => void;
export interface MessageFunction {
  (options: MessageOptions): void;
  info: MessageMethod;
  success: MessageMethod;
  fail: MessageMethod;
  warning: MessageMethod;
}

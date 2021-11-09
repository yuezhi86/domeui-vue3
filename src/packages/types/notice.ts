import {h} from 'vue';

export type NoticeTypes = 'info' | 'success' | 'fail' | 'warning';
export type NoticeOptions = {
  title?: string;
  content?: string;
  type?: NoticeTypes;
  theme?: string;
  duration?: number;
  closable?: boolean;
  placement?: 'top' | 'top-end' | 'bottom-start' | 'bottom-end';
  icon?: string; // icon name
  className?: string; // 添加到每条消息本身
  containerClassName?: string; // 添加到消息队列容器上
  maxWidth?: number | string; // 如：300，300px，20%
  onBeforeUnmounted?: Function;
  onUnmounted?: Function;
  render?: () => ReturnType<typeof h>;
};
export type NoticeRestOptions = Omit<NoticeOptions, 'type' | 'content'>;
export type NoticeMethod = (
  content: string,
  config?: NoticeRestOptions
) => void;
export interface NoticeFunction {
  (options: NoticeOptions): void;
  info: NoticeMethod;
  success: NoticeMethod;
  fail: NoticeMethod;
  warning: NoticeMethod;
  destroy: () => void;
}

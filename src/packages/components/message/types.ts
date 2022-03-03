import {Component, VNode} from 'vue';
import {Numberish} from '../../config';

export type MessageTransition = 'move-up' | 'move-right';
export type MessageType = 'info' | 'success' | 'error' | 'warning';
export type MessageTheme = 'default' | 'bright';
export type MessagePlacement = 'top' | 'right-start';
export type MessageOption = {
  title?: string | VNode;
  content?: string | VNode;
  type?: MessageType;
  theme?: MessageTheme;
  duration?: number;
  closable?: boolean;
  maxWidth?: Numberish; // 如：300，300px，20%
  className?: string; // 添加到每条消息本身
  closeClassName?: string;
  closeIcon?: Component | VNode;
};
export type MessagePop = () => void;

export type MessageQueueInstance = {
  push: (option: MessageOption) => MessagePop;
  clear: () => void;
};
export type MessageQueueProps = {
  className?: string;
  placement?: MessagePlacement;
  transitionName?: MessageTransition;
};

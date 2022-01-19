import {Component, VNode} from 'vue';
import {Numberish} from '../../config';

const Message: MessageFunction = function (options: MessageOptions): void {
  console.log(options);
};

Message.info = (content: string, config?: MessageMethodOptions): void => {
  _call('info', content, config);
};
Message.success = (content: string, config?: MessageMethodOptions): void => {
  _call('success', content, config);
};
Message.error = (content: string, config?: MessageMethodOptions): void => {
  _call('error', content, config);
};
Message.warning = (content: string, config?: MessageMethodOptions): void => {
  _call('warning', content, config);
};
Message.destroy = () => {
  console.log('destroy');
};

function _call(
  type: MessageType,
  content: string,
  config?: MessageMethodOptions
) {
  Message(
    Object.assign({}, config, {
      type,
      content,
    })
  );
}

export const DeMessage = Message;

export type MessageType = 'info' | 'success' | 'error' | 'warning';
export type MessageTheme = 'default' | 'bright';
export type MessagePlacement =
  | 'top'
  | 'right-start'
  | 'bottom-start'
  | 'bottom-end';

export type MessageOptions = {
  title?: string;
  content?: string;
  type?: MessageType;
  theme?: MessageTheme;
  duration?: number;
  closable?: boolean;
  placement?: MessagePlacement;
  closeIcon?: string | Component | VNode;
  classNames?: string | string[]; // 添加到每条消息本身
  containerClassName?: string; // 添加到消息队列容器上
  closeClassNames?: string | string[];
  maxWidth?: Numberish; // 如：300，300px，20%
  onClose?: () => void;
  onLeave?: () => void;
  render?: () => VNode;
};

export type MessageMethodOptions = Omit<MessageOptions, 'type' | 'content'>;
export type MessageMethod = (
  content: string,
  config?: MessageMethodOptions
) => void;

export interface MessageFunction {
  (options: MessageOptions): void;
  info: MessageMethod;
  success: MessageMethod;
  error: MessageMethod;
  warning: MessageMethod;
  destroy: () => void;
}

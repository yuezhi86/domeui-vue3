import {VNode} from 'vue';
import {Numberish} from '../../config';

const Message: MessageFunction = function (options: MessageOption): void {
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

export type MessageOption = {
  title?: string | VNode;
  content?: string | VNode;
  type?: MessageType;
  theme?: MessageTheme;
  duration?: number;
  closable?: boolean;
  maxWidth?: Numberish; // 如：300，300px，20%
  className?: string; // 添加到每条消息本身
};

export type MessageMethodOptions = Omit<MessageOption, 'type' | 'content'>;
export type MessageMethod = (
  content: string,
  config?: MessageMethodOptions
) => void;

export interface MessageFunction {
  (options: MessageOption): void;
  info: MessageMethod;
  success: MessageMethod;
  error: MessageMethod;
  warning: MessageMethod;
  destroy: () => void;
}

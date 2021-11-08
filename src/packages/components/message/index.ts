import {MessageOptions, MessageTypes} from '../../types';

type Config = Omit<MessageOptions, 'type' | 'content'>;
type MethodHandle = (content: string, config?: Config) => void;
interface MessageType {
  (options: MessageOptions): void;
  info: MethodHandle;
  success: MethodHandle;
  fail: MethodHandle;
  warning: MethodHandle;
}

const Message: MessageType = function (options: MessageOptions): void {
  console.log(options);
};

Message.info = (content: string, config?: Config): void => {
  _call('info', content, config);
};
Message.success = (content: string, config?: Config): void => {
  _call('success', content, config);
};
Message.fail = (content: string, config?: Config): void => {
  _call('fail', content, config);
};
Message.warning = (content: string, config?: Config): void => {
  _call('warning', content, config);
};

function _call(type: MessageTypes, content: string, config?: Config) {
  Message(
    Object.assign({}, config, {
      type,
      content,
    })
  );
}

export default Message;

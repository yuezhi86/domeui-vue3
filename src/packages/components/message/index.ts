import {MessageOptions, MessageTypes} from '../../types';

type Config = Omit<MessageOptions, 'type' | 'message'>;
type MethodHandle = (message: string, config?: Config) => void;
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

Message.info = (message: string, config?: Config): void => {
  _call('info', message, config);
};
Message.success = (message: string, config?: Config): void => {
  _call('success', message, config);
};
Message.fail = (message: string, config?: Config): void => {
  _call('fail', message, config);
};
Message.warning = (message: string, config?: Config): void => {
  _call('warning', message, config);
};

function _call(type: MessageTypes, message: string, config?: Config) {
  Message(
    Object.assign({}, config, {
      type,
      message,
    })
  );
}

export default Message;

import {
  MessageFunction,
  MessageRestOptions,
  MessageOptions,
  MessageTypes,
} from '../../types';

const Message: MessageFunction = function (options: MessageOptions): void {
  console.log(options);
};

Message.info = (content: string, config?: MessageRestOptions): void => {
  _call('info', content, config);
};
Message.success = (content: string, config?: MessageRestOptions): void => {
  _call('success', content, config);
};
Message.fail = (content: string, config?: MessageRestOptions): void => {
  _call('fail', content, config);
};
Message.warning = (content: string, config?: MessageRestOptions): void => {
  _call('warning', content, config);
};

function _call(
  type: MessageTypes,
  content: string,
  config?: MessageRestOptions
) {
  Message(
    Object.assign({}, config, {
      type,
      content,
    })
  );
}

export default Message;

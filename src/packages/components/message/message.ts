import {h, VNode} from 'vue';
import {DeIcon} from '../icon';
import MessageComponent from './message.vue';
import factory from './factory';
import {
  MessageOption,
  MessagePop,
  MessageQueueInstance,
  MessageType,
} from './types';

type MessageInstanceOption = Omit<MessageOption, 'title' | 'content'> & {
  title: string | VNode;
};
type MessageInstanceMethodsOption = Omit<
  MessageOption,
  'type' | 'title' | 'content'
>;
type MessageInstanceMethods = (
  title: string,
  config?: MessageInstanceMethodsOption
) => MessagePop;

interface MessageFunction {
  (options: MessageInstanceOption): MessagePop;
  info: MessageInstanceMethods;
  success: MessageInstanceMethods;
  error: MessageInstanceMethods;
  warning: MessageInstanceMethods;
  clear: () => void;
}

let messageInstance: MessageQueueInstance;

function getMessageInstance() {
  if (!messageInstance) {
    const newInstance = factory('message');
    messageInstance = newInstance();
  }

  return messageInstance;
}

const Message: MessageFunction = function (
  options: MessageInstanceOption
): MessagePop {
  const {push} = getMessageInstance();
  return push(Object.assign(options, {content: undefined}));
};

const _instance = (
  type: MessageType,
  title: VNode,
  config?: MessageInstanceMethodsOption
) => {
  const {push} = getMessageInstance();
  return push(
    Object.assign({}, config, {
      type,
      title,
    })
  );
};
const getTitle = (type: MessageType, title: string) => {
  let name: 'prompt' | 'tick' | 'close' | 'alert' = 'prompt';

  switch (type) {
    case 'success':
      name = 'tick';
      break;
    case 'error':
      name = 'close';
      break;
    case 'warning':
      name = 'alert';
      break;
    case 'info':
      name = 'prompt';
      break;
  }

  return h('div', {class: `${MessageComponent.name}__title-inner`}, [
    h(DeIcon, {
      name,
      class: `${MessageComponent.name}__icon-${type}`,
    }),
    h('span', [title]),
  ]);
};

Message.info = (title: string, config?: MessageInstanceMethodsOption) => {
  return _instance('info', getTitle('info', title), config);
};
Message.success = (title: string, config?: MessageInstanceMethodsOption) => {
  return _instance('success', getTitle('success', title), config);
};
Message.error = (title: string, config?: MessageInstanceMethodsOption) => {
  return _instance('error', getTitle('error', title), config);
};
Message.warning = (title: string, config?: MessageInstanceMethodsOption) => {
  return _instance('warning', getTitle('warning', title), config);
};
Message.clear = () => {
  const {clear} = getMessageInstance();
  clear();
};

export const DeMessage = Message;

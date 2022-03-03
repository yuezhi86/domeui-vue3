import {App, createApp} from 'vue';
import Message from './message.vue';
import {randomStr} from '../../utils';
import {MessageOption, MessageQueueProps, MessageQueueInstance} from './types';

type MessageQueueMethods = {
  push: (option: MessageOption & {uuid: string}) => void;
  pop: (uuid: string) => void;
  clear: () => void;
};
export default function factory(name: string) {
  let app: App | null;
  let instanceClassName: string;
  let instance: HTMLElement;
  let instanceMethods: MessageQueueMethods;

  const getUuid = () => {
    return `${name}__${randomStr(11)}`;
  };
  const getMethods = (methods: MessageQueueMethods) => {
    instanceMethods = methods;
  };

  return (props: MessageQueueProps = {}): MessageQueueInstance => {
    if (!instanceClassName) {
      instance = document.createElement('div');
      instance.className = instanceClassName = `${
        Message.name
      }__wrap-${randomStr(10)}`;
      document.body.append(instance);
    }

    app = createApp(Message, Object.assign(props, {getMethods}));
    app.mount(instance);

    return {
      push(option: MessageOption) {
        const uuid = getUuid();
        instanceMethods?.push({...option, uuid});
        return () => {
          instanceMethods?.pop(uuid);
        };
      },
      clear() {
        instanceMethods?.clear();
      },
    };
  };
}

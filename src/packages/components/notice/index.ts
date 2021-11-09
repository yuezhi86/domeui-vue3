import {
  NoticeFunction,
  NoticeRestOptions,
  NoticeOptions,
  NoticeTypes,
} from '../../types';
import './index.less';

const Notice: NoticeFunction = function (options: NoticeOptions): void {
  console.log(options);
};

Notice.info = (content: string, config?: NoticeRestOptions): void => {
  _call('info', content, config);
};
Notice.success = (content: string, config?: NoticeRestOptions): void => {
  _call('success', content, config);
};
Notice.fail = (content: string, config?: NoticeRestOptions): void => {
  _call('fail', content, config);
};
Notice.warning = (content: string, config?: NoticeRestOptions): void => {
  _call('warning', content, config);
};
Notice.destroy = () => {
  console.log('destroy');
};

function _call(type: NoticeTypes, content: string, config?: NoticeRestOptions) {
  Notice(
    Object.assign({}, config, {
      type,
      content,
    })
  );
}

export default Notice;

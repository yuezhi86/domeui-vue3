import {createApp, App} from 'vue';
import Loading, {LoadingTheme} from './loading.vue';
import {randomStr} from '../../utils';

export * from './loading.vue';
export const DeLoading = Loading;
export default DeLoading;

let app: App | null;
let loading = false;
let instanceClassName: string;
let instance: HTMLElement;

export type LoadingParams = {
  text?: string;
  theme?: LoadingTheme;
  transparent?: boolean;
  size?: number;
  mask?: boolean;
  fixed?: boolean;
  scale?: number | string;
};

export function showLoading(params?: LoadingParams) {
  if (loading) return;
  loading = true;

  if (!instanceClassName) {
    instance = document.createElement('div');
    instance.className = instanceClassName = `${DeLoading.name}__${randomStr(
      10
    )}`;
    document.body.append(instance);
  }

  app = createApp(DeLoading, params);
  app.mount(instance);
}

export function hideLoading() {
  app?.unmount();
  loading = false;
}

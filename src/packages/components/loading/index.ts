import {App} from 'vue';
import Loading from './loading.vue';
export * from './loading.vue';
export const DeLoading = Loading;
export default DeLoading;
export function loadingInstall(app: App) {
  console.log(app);
}

import {createApp} from 'vue';
import App from './App.vue';
import {config as DomeUIConfig, loadingInstall} from './packages';
import './packages/styles/index.less';

const app = createApp(App);

DomeUIConfig({
  common: {
    zIndex: 2000,
  },
  message: {
    duration: 2,
  },
  notice: {
    duration: 4.5,
  },
});

loadingInstall(app);

app.mount('#app');

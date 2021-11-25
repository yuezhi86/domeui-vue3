import {createApp} from 'vue';
import App from './App.vue';
import {config as DomeUIConfig} from './packages';
import './packages/styles/index.less';

DomeUIConfig({
  common: {
    zIndex: 2000,
  },
});

const app = createApp(App);
app.mount('#app');

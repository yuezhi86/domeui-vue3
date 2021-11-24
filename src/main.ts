import {createApp} from 'vue';
import App from './App.vue';
import {config as DomeUIConfig} from './packages';
import './packages/styles/index.less';

const app = createApp(App);

DomeUIConfig({
  common: {
    zIndex: 2000,
  },
});

app.mount('#app');

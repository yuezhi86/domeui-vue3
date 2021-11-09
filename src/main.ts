import {createApp} from 'vue';
import App from './App.vue';
import {config as DomeUIConfig, install as DomeUIInstall} from './packages';

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
DomeUIInstall(app);

app.mount('#app');

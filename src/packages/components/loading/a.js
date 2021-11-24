import Vue from 'vue';
import PageLoading from './loading';

let LoadingConstructor = Vue.extend(PageLoading);
let instance;
let instances = [];
let Loading = {};

Loading.show = function (content = '正在加载...') {
  instance = new LoadingConstructor({
    data: {
      popupLoading: true,
      content,
    },
  });

  instance.$mount();
  instances.push(instance);
  document.body.appendChild(instance.$el);

  return {
    hide,
  };

  function hide() {
    instance.hide();
    removeLoadingCache(instance._uid);
  }

  function removeLoadingCache(uid) {
    for (let i = 0; i < instances.length; i++) {
      let item = instances[i];

      if (item._uid === uid) {
        instances.splice(i, 1);
        break;
      }
    }
  }
};

Loading.hide = function () {
  instances.forEach((item) => {
    item.hide();
  });
  instances = [];
};

Loading.install = function (Vue) {
  Vue.component(PageLoading.name, PageLoading);
};

export default Loading;

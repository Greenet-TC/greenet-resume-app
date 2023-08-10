import App from "./App";
import http from "./components/common/tui-request";

//初始化请求配置项
http.create({
  host: "https://youjia.sx.cn",
  header: {
    "content-type": "application/json",
  },
});
//请求拦截
http.interceptors.request.use((config) => {
  let token = uni.getStorageSync("thorui_token");
  if (config.header) {
    config.header["Authorization"] = token;
  } else {
    config.header = {
      Authorization: token,
    };
  }
  return config;
});
//响应拦截
http.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data && data.result === 1) {
      return response;
    }
    throw res?.data || {};
  },
  async (err) => {
    console.error(err || {});

    return Promise.reject(err || {});
  }
);
// #ifndef VUE3
import Vue from "vue";
Vue.config.productionTip = false;
App.mpType = "app";

try {
  function isPromise(obj) {
    return (
      !!obj &&
      (typeof obj === "object" || typeof obj === "function") &&
      typeof obj.then === "function"
    );
  }
  Vue.prototype.http = http;
  // 统一 vue2 API Promise 化返回格式与 vue3 保持一致
  uni.addInterceptor({
    returnValue(res) {
      if (!isPromise(res)) {
        return res;
      }
      return new Promise((resolve, reject) => {
        res.then((res) => {
          if (res[0]) {
            reject(res[0]);
          } else {
            resolve(res[1]);
          }
        });
      });
    },
  });
} catch (error) {}

const app = new Vue({
  ...App,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
import { createSSRApp } from "vue";
export function createApp() {
  const app = createSSRApp(App);
  app.use(store);
  app.config.globalProperties.http = http;
  return {
    app,
  };
}
// #endif

/*
 * @Author: maxueming maxueming@kuaishou.com
 * @Date: 2023-08-10 19:36:52
 * @LastEditors: maxueming maxueming@kuaishou.com
 * @LastEditTime: 2023-09-27 10:10:48
 * @FilePath: /greenet-resume-app/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import App from "./App";
import http from "./components/common/tui-request";
import { getToken } from "./common/utils";
import store from "./store";

//初始化请求配置项
http.create({
  host: "https://youjia.sx.cn",
  header: {
    "content-type": "application/json",
  },
});

//请求拦截

http.interceptors.request.use((config) => {
  const cookiesId = getToken();
  const sessionId = uni.getStorageSync("preLogin");
  if (!cookiesId && !sessionId) {
    uni.showToast({
      title: "请先登录！",
      icon: "error",
      duration: 2000,
    });
    uni.switchTab({
      url: "/pages/index/index",
    });
    return Promise.reject();
  }

  if (store.state.cookies) {
    if (config.header?.cookie) {
      if (config.method !== "post") {
        config.header["cookie"] = `xxl_sso_sessionid=${store.state.cookies}`;
      }
    } else {
      config.header = {
        cookie: `xxl_sso_sessionid=${store.state.cookies}`,
      };
    }
  }
  // config.params.reqid = uuid(16);
  return config;
});
//响应拦截
http.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data && data.result === 1) {
      return response;
    }
    uni.showToast({
      title: data.error_message,
      icon: "error",
      duration: 3000,
    });
    throw data || {};
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
  // store,
  ...App,
});
app.$mount();
// #endif

// #ifdef VUE3
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

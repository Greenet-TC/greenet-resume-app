import App from "./App";

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
// #endif

// #ifdef H5
var jweixin = require("./jweixin");

uni.request({
  url: "请求接口地址",
  method: "GET",
  data: {
    url: location.href,
  },
  success(res) {
    let s = res.data;
    jweixin.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: s.appId, // 必填，公众号的唯一标识
      timestamp: s.timestamp, // 必填，生成签名的时间戳
      nonceStr: s.nonceStr, // 必填，生成签名的随机串
      signature: s.signature, // 必填，签名
      jsApiList: [
        "onMenuShareTimeline",
        "onMenuShareAppMessage",
        "onMenuShareQQ",
      ], // 必填，需要使用的JS接口列表
    });
    jweixin.ready(function () {
      //获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
      jweixin.onMenuShareAppMessage({
        title: getMessage(location.href).title, // 分享标题
        desc: getMessage(location.href).desc, // 分享描述
        link: location.href, // 分享链接
        imgUrl: getMessage(location.href).imgUrl, // 分享图标
        type: "", // 分享类型,music、video或link，不填默认为link
        dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {},
      });
      //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
      jweixin.onMenuShareTimeline({
        title: getMessage(location.href).title, // 分享标题
        desc: getMessage(location.href).desc, // 分享描述
        link: location.href, // 分享链接
        imgUrl: getMessage(location.href).imgUrl, // 分享图标
        type: "", // 分享类型,music、video或link，不填默认为link
        dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {},
      });
    });
  },
});

function getMessage(url) {
  if (url == "") {
    return {
      title: "",
      desc: "。",
      imgUrl: "",
    };
  } else if (url == "") {
    return {
      title: "",
      desc: "",
      imgUrl: "",
    };
  } else {
    return {
      title: "",
      desc: "",
      imgUrl: "",
    };
  }
}
// #endif

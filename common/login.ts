/*
 * @Author: maxueming maxueming@kuaishou.com
 * @Date: 2023-08-11 16:26:15
 * @LastEditors: maxueming maxueming@kuaishou.com
 * @LastEditTime: 2023-09-02 21:27:11
 * @FilePath: /greenet-resume-app/common/login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { userBaseInfoUsingGET } from "./apis/user-controller";
import { loginMiniGET } from "./apis/weixin-login";
import { getToken } from "./utils";
// 调用ui.login()方法，获取用户的code
export const getlogin = () => {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: "weixin",
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

export const wxLogin = (loginRes) => {
  return new Promise((resolve, reject) => {
    const { errMsg, code } = loginRes;
    if (errMsg.indexOf("ok") !== -1) {
      validLogin({
        code,
        sf: "1",
      })
        .then((res) => {
          const { code, data, token } = res;
          if (code === API_RETURN_CODE.USER_UNLOGIN.code) {
            // 用户未登录 存储状态并且储存返回的微信openId
            uni.setStorageSync(STORAGE_KEYS.USER_LOGIN_CODE, code);
            uni.setStorageSync(STORAGE_KEYS.WX_OPEN_ID, data);
          } else if (code === API_RETURN_CODE.USER_LOGINED.code) {
            // 用户已登录，未进行授权
            uni.setStorageSync(STORAGE_KEYS.USER_LOGIN_CODE, code);
            token && setToken(token);
            const userInfo = {
              phoneNumber: data.phone,
              sf: data.sf,
            };
            uni.setStorageSync(STORAGE_KEYS.USER_INFO, userInfo);
          } else if (code === API_RETURN_CODE.USER_AUTHOR.code) {
            // 用户已登录，已授权
            uni.setStorageSync(STORAGE_KEYS.USER_LOGIN_CODE, code);
            token && setToken(token);
            const userInfo = {
              phoneNumber: data.phone,
              sf: data.sf,
            };
            uni.setStorageSync(STORAGE_KEYS.USER_INFO, userInfo);
          }
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    } else if (errMsg.indexOf("fail") !== -1) {
      uni.showToast({
        title: "wx.login出错，请退出重新进入",
        duration: 2000,
      });
      reject();
    }
  });
};

export const login = async () => {
  if (!getToken()) {
    uni.setStorageSync("preLogin", true);
  } else {
    uni.removeStorageSync("preLogin");
  }
  console.log(11);
  const login_res = await getlogin();
  console.log(11, login_res);
  await loginMiniGET(login_res?.code);

  await userBaseInfoUsingGET();
};
export function uuid(m) {
  const d = m > 16 ? 16 : m;
  const num = Math.random().toString();
  if (num.substr(num.length - d, 1) === "0") return uuid(d);
  return num.substring(num.length - d);
}

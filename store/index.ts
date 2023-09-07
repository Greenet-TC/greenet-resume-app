/*
 * @Author: maxueming maxueming@kuaishou.com
 * @Date: 2023-09-04 20:23:46
 * @LastEditors: maxueming maxueming@kuaishou.com
 * @LastEditTime: 2023-09-07 15:30:29
 * @FilePath: /greenet-resume-app/store/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 页面路径：store/index.js
import { createStore } from "vuex";
import {
  WechatPayControllerQueryAccountGETResponse,
  userBaseInfoDataRespones,
} from "../common/apis/model";

export interface IState {
  userBaseInfo: userBaseInfoDataRespones | undefined;
  queryAccount: WechatPayControllerQueryAccountGETResponse | undefined;
  loginStatus: boolean | undefined;
  cookies: string;
}
const store = createStore<IState>({
  state: {
    //基础信息
    userBaseInfo: undefined,
    queryAccount: undefined,
    loginStatus: undefined,
    cookies: undefined,
  },
  mutations: {
    getUserInfo(state, info) {
      state.userBaseInfo = info;
    },
    setLoginStatus(state, loginStatus) {
      state.loginStatus = loginStatus;
    },
    setCookies(state, cookies) {
      state.cookies = cookies;
    },
  },
});

export default store;

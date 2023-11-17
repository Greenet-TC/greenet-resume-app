<!--
 * @Author: maxueming maxueming@kuaishou.com
 * @Date: 2023-05-30 21:31:17
 * @LastEditors: maxueming maxueming@kuaishou.com
 * @LastEditTime: 2023-11-17 10:17:31
 * @FilePath: /greenet-resume-app/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<script>
import {
  setLoginStatus,
  getQueryAccount,
  getBaseInfo,
  getlogin,
} from "./common/login";
import { loginMiniGET } from "./common/apis/weixin-login";
import { systemInfo } from "@/common/system-info.js";

export default {
  globalData: {
    navHeight: 0,
  },
  onLaunch: async function () {
    const { code } = await getlogin();
    await loginMiniGET(code);
    getBaseInfo();
    getQueryAccount();
    setLoginStatus(true);
    this.globalData.navHeight =
      systemInfo().navHeight + systemInfo().statusBarHeight; //头部导航栏总高度
  },
  onShow: async function () {},
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
@import "@/components/uni/uParse/src/wxParse.css"; /*每个页面公共css */
</style>

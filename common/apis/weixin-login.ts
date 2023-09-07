/*
 * @Author: maxueming maxueming@kuaishou.com
 * @Date: 2023-08-31 17:41:12
 * @LastEditors: maxueming maxueming@kuaishou.com
 * @LastEditTime: 2023-09-07 15:25:11
 * @FilePath: /greenet-resume-app/common/apis/weixin-login.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from "../../components/common/tui-request";
import { setCookiesValue } from "../login";
import { setToken } from "../utils";

export const loginMiniGET = (code: string) => {
  return http
    .get(`/api/resume/web/loginMini?code=${code}`)
    .then((res) => {
      console.log(1111, res.data, res.data.data.xxl_sso_sessionid);
      if (res.data.result === 1) {
        uni.showToast({
          title: "登录成功！",
          icon: "success",
          duration: 2000,
        });
        setCookiesValue(res.data.data.xxl_sso_sessionid);
        uni.removeStorageSync("preLogin");
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

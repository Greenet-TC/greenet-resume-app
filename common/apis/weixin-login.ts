/*
 * @Author: maxueming maxueming@kuaishou.com
 * @Date: 2023-08-31 17:41:12
 * @LastEditors: maxueming maxueming@kuaishou.com
 * @LastEditTime: 2023-09-25 20:16:07
 * @FilePath: /greenet-resume-app/common/apis/weixin-login.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from "../../components/common/tui-request";
import { setCookiesValue } from "../login";


export const loginMiniGET = (code: string,encryptedData?:string,iv?:string) => {
  return http
    .get(`/api/resume/web/loginMini?code=${code}&encryptedData=${encryptedData}&iv=${iv}`)
    .then((res) => {
      if (res.data.result === 1) {
        uni.showToast({
          title: "登录成功！",
          icon: "success",
          duration: 2000,
        });
        uni.setStorageSync("xxl_sso_sessionid", res.data.data.xxl_sso_sessionid);
        setCookiesValue(res.data.data.xxl_sso_sessionid);
        uni.removeStorageSync("preLogin");
      }
    })
    .catch((e) => {
      console.log(11, e);
    });
};

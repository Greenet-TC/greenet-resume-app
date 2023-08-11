<!--
 * @Author: maxueming maxueming@kuaishou.com
 * @Date: 2023-05-30 21:31:17
 * @LastEditors: maxueming maxueming@kuaishou.com
 * @LastEditTime: 2023-08-11 16:28:40
 * @FilePath: /greenet-resume-app/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script>
import { login } from "./common/login";
export default {
  onLaunch: async function () {
    const login_res = await login();
    console.log(11, login_res);
    await wxLogin(login_res);
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
</style>

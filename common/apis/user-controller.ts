import http from "../../components/common/tui-request";
import { userBaseInfoResponesType } from "./model";

/*
 * @Author: maxueming maxueming@kuaishou.com
 * @Date: 2023-09-02 19:37:59
 * @LastEditors: maxueming maxueming@kuaishou.com
 * @LastEditTime: 2023-09-02 19:38:26
 * @FilePath: /greenet-resume-app/common/apis/user-controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export async function userBaseInfoUsingGET(): Promise<userBaseInfoResponesType> {
  // const headers = Object.create(null);
  const result = await http.request({
    url: `/api/resume/user/baseInfo`,
    method: "get",
  });
  return result.data;
}

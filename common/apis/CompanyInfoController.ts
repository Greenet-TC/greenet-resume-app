/*
 * @Author: maxueming maxueming@kuaishou.com
 * @Date: 2023-09-24 00:25:38
 * @LastEditors: maxueming maxueming@kuaishou.com
 * @LastEditTime: 2023-09-24 00:25:48
 * @FilePath: /greenet-resume-app/common/apis/CompanyInfoController.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from "../../components/common/tui-request";
import { CommonResultListCompanyInfo, CompanyInfoDTO } from "./model";

/** CompanyInfoController 分页查询所有公司信息 */
export async function getPageListPost(
  payload: CompanyInfoDTO
): Promise<CommonResultListCompanyInfo> {
  const data = payload;
  const result = await http.request({
    url: `/api/company/getList`,
    method: "post",
    data,
    headers: { "Content-Type": "application/json" },
  });
  return result.data;
}

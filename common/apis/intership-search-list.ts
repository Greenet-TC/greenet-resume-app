import http from "../../components/common/tui-request";
import store from "@/store/index.ts";
import {
  WechatPayControllerResponseType,
  internshipPositionGetPageListParameType,
} from "./model";

export async function internshipPositionGetPageListPOST(
  payload: internshipPositionGetPageListParameType
): Promise<
  WechatPayControllerResponseType<internshipPositionGetPageListParameType>
> {
  const data = {
    ...payload,
  };
  const result = await http.request({
    url: `/api/internshipPosition/getPageList?xxl_sso_sessionid: ${store.state.cookies}`,
    method: "post",
    data,
  });
  return result.data;
}

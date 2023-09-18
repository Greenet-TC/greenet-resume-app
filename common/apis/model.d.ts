/*
 * @Author: maxueming maxueming@kuaishou.com
 * @Date: 2023-09-02 18:18:35
 * @LastEditors: maxueming maxueming@kuaishou.com
 * @LastEditTime: 2023-09-18 11:22:25
 * @FilePath: /greenet-resume-app/common/apis/model.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface PageInfoType {
  page: number;
  pageSize: number;
  totalCount: number;
}
export interface IResponseType<T> {
  data: T;
  error_msg: string;
  pageInfo: PageInfoType;
  result: number;
}
export type TloginMiniType = {
  xxl_sso_sessionid: string;
};
export interface userBaseInfoResponesType {
  data: userBaseInfoDataRespones;
  error_msg: string;
  pageInfo: PageInfoType;
  result: number;
}

export interface userBaseInfoDataRespones {
  avatar: string;
  birth: number;
  city: string;
  country: string;
  email: string;
  mobile: string;
  province: string;
  sex: 1 | 2; //1male, 2female
  username: string;
}
export interface WechatPayControllerQueryAccountGETResponse {
  bonus: number;
  endTime: number;
  history: string;
  id: number;
  startTime: number;
  unionId: string;
  vipType: string;
}
export interface WechatPayControllerResponseType<T> {
  data: T;
  error_msg: string;
  pageInfo: PageInfoType;
  result: number;
}

export interface WechatPayControllerQueryAccountGETResponse {
  bonus: number;
  endTime: number;
  history: string;
  id: number;
  startTime: number;
  unionId: string;
  vipType: string;
}
export interface WechatPayControllerCreateWeChatJsApiType {}
export interface PayVipProps {
  total_fee: number; //支付金额
  body: string; //商品描述信息
  vipType: number; // 其他附加信息
}
export interface internshipPositionGetPageListParameType {
  company: string;
  createTime: number;
  degree: string;
  experience: string;
  id: number;
  jobType: string;
  location: string;
  pageNum: number;
  pageSize: number;
  positionAdvan: string;
  positionDuty: string;
  positionName: string;
  positionRequired: string;
  property: string;
  salary: string;
  updateTime: number;
  urgent: true;
  url: string;
}

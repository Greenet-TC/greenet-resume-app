import { tradeType } from "../contant";

/*
 * @Author: maxueming maxueming@kuaishou.com
 * @Date: 2023-09-02 18:18:35
 * @LastEditors: maxueming maxueming@kuaishou.com
 * @LastEditTime: 2023-11-04 17:53:42
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
export interface internshipPositionGetPageListResponType {
  company: string;
  createTime: number;
  degree: string;
  experience: string;
  id: number;
  jobType: string;
  location: string;
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
export interface WechatPayControllerQueryAllOrdersType {
  attach: string;
  createTime: number;
  customerId: number;
  id: number;
  orderId: string;
  orderStatus: string;
  tradeType: tradeType;
}
export interface pageInfo {
  pageNum: number;
  pageSize: number;
}

export interface CompanyInfoDTO {
  /** 公司名称 */
  companyName?: string;
  /** 创建时间 */
  createTime?: string;
  id?: number;
  /** 公司简介 */
  introduction?: string;
  /** logo */
  logo?: string;
  /** 上市情况 枚举 */
  market?: number;
  /** 当前页码数 */
  pageNum?: number;
  /** 页吗容量 */
  pageSize?: number;
  /** 内推码 */
  recommendCode?: Array<string>;
  /** 公司规模 枚举 */
  scale?: number;
  /** 行业number 枚举 */
  sectorNumber?: number;
  /** 更新时间 */
  updateTime?: string;
}

export interface CommonResultListCompanyInfo {
  code: number;
  data: Array<CompanyInfo>;
  message: string;
  pageInfo: PageInfoType;
}

export interface CompanyInfo {
  /** 公司名称 */
  companyName: string;
  /** 创建时间 */
  createTime: string;
  id: number;
  /** 公司简介 */
  introduction: string;
  /** logo */
  logo: string;
  /** 上市情况 枚举 */
  market: number;
  /** 内推码 */
  recommendCode: Array<string>;
  /** 公司规模 枚举 */
  scale: number;
  /** 行业number 枚举 */
  sectorNumber: number;
  /** 更新时间 */
  updateTime: string;
}
export interface ArticleDto {
  articleId?: number;
  articleTitle?: string;
  categoryFirst?: string;
  categorySecond?: string;
  categoryThird?: string;
  collectNum?: number;
  commentNum?: number;
  content?: string;
  coverUrl?: string;
  createTime?: string;
  id?: number;
  isFree?: boolean;
  pageNum?: number;
  pageSize?: number;
  summery?: string;
  supportNum?: number;
  tags?: Array<string>;
  updateTime?: string;
  viewNum?: number;
}
export interface CommonPageResultListArticle {
  code: number;
  data: Array<Article>;
  message: string;
  pageInfo: PageInfoType;
}
export interface Article {
  articleId: number;
  articleTitle: string;
  categoryFirst: string;
  categorySecond: string;
  categoryThird: string;
  collectNum: number;
  commentNum: number;
  content: string;
  coverUrl: string;
  createTime: string;
  id: number;
  isFree: boolean;
  summery: string;
  supportNum: number;
  tags: Array<string>;
  updateTime: string;
  viewNum: number;
}

export interface CommonResultArticle {
  code: number;
  data: Article;
  message: string;
}
export interface ArticleUpdateParams{
  articleId:number;
  articleTitle:string;
  collectFlag:number
}

export interface ArticleUpdateResponse<T> {
  result: number;
  data: T;
  error_msg: string;
}
export interface  ArticleCommentParams{
  articleId: number,
  articleTitle?: string,
  content?: string,
  fromName?: string,
  fromUid?: number,
 
}
export interface CommentReponseList
{
  "articleId": number,
      "articleTitle":string,
      "commentId": number,
      "content":string,
      "createTime": string,
      "fromName": string,
      "fromUid": number,
      "id": number,
      "subCommentsNum": number,
      "updateTime": string
}
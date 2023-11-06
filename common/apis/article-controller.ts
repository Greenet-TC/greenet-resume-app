/*
 * @Author: maxueming maxueming@kuaishou.com
 * @Date: 2023-11-04 17:50:53
 * @LastEditors: maxueming maxueming@kuaishou.com
 * @LastEditTime: 2023-11-04 17:59:29
 * @FilePath: /greenet-resume-app/common/apis/article-controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from "../../components/common/tui-request";
import { Article, ArticleDto, CommonPageResultListArticle, CommonResultArticle } from "./model";

/** CompanyInfoController 分页查询所有文章信息 */
export async function getArticleListPost(
  payload: ArticleDto
): Promise<CommonPageResultListArticle> {
  const data = payload;
  const result = await http.request({
    url: `/api/article/getList`,
    method: "post",
    data,
    headers: { "Content-Type": "application/json" },
  });
  return result.data;
}

/** article-controller 查询文章详情 */
export async function viewArticleDetailPost(payload: Article):Promise<CommonResultArticle> {
  const data = payload;

  const result = await http.request({
    url: `/api/article/viewArticle`,
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/json' },
  });

  return result.data;
}
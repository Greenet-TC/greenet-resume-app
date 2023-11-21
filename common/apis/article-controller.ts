/*
 * @Author: maxueming maxueming@kuaishou.com
 * @Date: 2023-11-04 17:50:53
 * @LastEditors: maxueming maxueming@kuaishou.com
 * @LastEditTime: 2023-11-04 17:59:29
 * @FilePath: /greenet-resume-app/common/apis/article-controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from '../../components/common/tui-request'
import {
  Article,
  ArticleDto,
  CommonPageResultListArticle,
  CommonResultArticle,
  ArticleUpdateParams,
  ArticleUpdateResponse,
  ArticleCommentParams,
  CommentReponseList,
} from './model'

/** CompanyInfoController 分页查询所有文章信息 */
export async function getArticleListPost(
  payload: ArticleDto,
): Promise<CommonPageResultListArticle> {
  const data = payload
  const result = await http.request({
    url: `/api/article/getList`,
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/json' },
  })
  return result.data
}

/** article-controller 查询文章详情 */
export async function viewArticleDetailPost(
  payload: Article,
): Promise<CommonResultArticle> {
  const data = payload

  const result = await http.request({
    url: `/api/article/viewArticle`,
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/json' },
  })

  return result.data
}

/**更新文章收藏量 */
export async function articleUpdateCollectNumGET(
  payload: ArticleUpdateParams,
): Promise<ArticleUpdateResponse<boolean>> {
  const result = await http.request({
    url: `/api/article/updateCollectNum?articleId=${payload.articleId}&articleTitle=${payload.articleTitle}&collectFlag=${payload.collectFlag}`,
    method: 'get',
  })
  return result.data
}

/**更新文章点赞量 */
export async function articleUpdateSupportNumGET(
  payload: ArticleUpdateParams,
): Promise<ArticleUpdateResponse<boolean>> {
  const result = await http.request({
    url: `/api/article/updateSupportNum?articleId=${payload.articleId}&articleTitle=${payload.articleTitle}&collectFlag=${payload.collectFlag}`,
    method: 'get',
  })
  return result.data
}

/** comment-controller 文章评论 */
export async function commentInsertCommentPOST(
  payload: ArticleCommentParams,
): Promise<ArticleUpdateResponse<boolean>> {
  const data = payload

  const result = await http.request({
    url: `/api/comment/insertComment`,
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/json' },
  })

  return result.data
}


/** comment-controller 获取评论 */
export async function commentGetCommentListPOST(
  payload: ArticleCommentParams,
): Promise<ArticleUpdateResponse<CommentReponseList[]>> {
  const data = payload
  
  const result = await http.request({
    url: `/api/comment/getCommentList`,
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/json' },
  })

  return result.data
}

/** comment-controller 获取分类 */
export async function articleParamListPOST(
  
): Promise<ArticleUpdateResponse<string>> {
  const data = {}
  
  const result = await http.request({
    url: `/api/article/param/getList`,
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/json' },
  })

  return result.data
}
<template>
  <view class="content">
    <view class="greenet-top-tab">
      <tui-tab
        :tabs="tabs"
        :current="current"
        selectedColor="#ff4906"
        sliderBgColor="#ff4906"
        scroll
        @change="change"
        isFixed
      ></tui-tab>
    </view>
    <tui-skeleton v-if="loading"></tui-skeleton>
    <view class="sort-list">
      <view
        class="sort-card"
        :class="'tui-skeleton'"
        v-for="item in categoryThirdList"
        :key="item.id"
        v-show="!!item.articleList.length"
      >
        <view class="sort-card-top">
          <view class="sort-card-top-left">
            <view class="title" :class="'tui-skeleton-rect'">
              <img :src="compilation" alt="" class="sort-card-top-left-icon" />
              <tui-text
                :text="item.label"
                block
                size="36"
                fontWeight="500"
                color="#000000"
                padding="0 15rpx"
              ></tui-text>
            </view>
            <tui-text
              :text="`${item.description.slice(0, 10)}... | ${
                item.articleList.length
              } 章知识`"
              block
              class="tui-skeleton-rect"
              fontWeight="400"
              color="#9c9c9c"
              padding="10rpx 10rpx"
            ></tui-text>
          </view>
          <view class="sort-card-top-right" :class="'tui-skeleton-rect'">
            <tui-form-button
              radius="5px"
              size="30"
              height="60rpx"
              background="rgba(234, 234, 241,.9)"
              color="#00000060"
              >查看

              <tui-icon
                name="arrowright"
                :size="40"
                unit="rpx"
                margin="0 0 0 10rpx"
                color="#00000060"
              ></tui-icon>
            </tui-form-button>
          </view>
        </view>
        <view class="sort-card-content">
          <scroll-view scroll-x>
            <view class="tui-article-list">
              <view
                v-for="(item, index) in item.articleList"
                :key="index"
                class="course-card-item"
                @tap="moreDetail(item)"
              >
                <view class="cover-url" :class="'tui-skeleton-rect'">
                  <tui-image-group
                    radius="10rpx"
                    :imageList="[
                      {
                        src: item?.coverUrl,
                      },
                    ]"
                    width="282rpx"
                    height="155rpx"
                  ></tui-image-group>
                  <view class="cover-url-mask">
                    <view>{{ tranNumber(item.viewNum ?? 0, 2) }} 看过</view>
                    <view>{{ tranNumber(item.supportNum ?? 0, 2) }} 点赞</view>
                    <!-- <view>{{ tranNumber(item.commentNum??0,2)  }} 评论</view> -->
                  </view>
                </view>
                <view class="article-detail">
                  <view
                    class="article-detail-title"
                    :class="'tui-skeleton-rect'"
                  >
                    {{ item.articleTitle }}
                  </view>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </view>
    <!-- <view class="greenet-content-list">
      <view v-for="item in couresList" :key="item.couresId">
        <view class="greenet-course-list-item">
          <view class="course-list-item-image">
            <image
              :src="'/static/images/banner/' + item.coverUrl"
              class="img"
              mode="scaleToFill"
            />
          </view>
          <view class="course-list-item-right">
            <view class="course-list-item-title">{{ item.title }}</view>
            <view class="course-list-item-tag">
              <tui-tag
                v-for="(_i, index) in item.tag"
                :key="index"
                type="light-orange"
                margin="0 8rpx 0 0"
                padding="8rpx"
                size="20rpx"
                >{{ _i }}</tui-tag
              >
            </view>
            <view class="course-list-item-intro">
              <view class="course-list-item-intro-price">
                <span class="span"> ¥ {{ item.price }}</span>

                <span class="line-thro">{{ item.originPrice }}</span>
              </view>
              <view class="course-list-item-intro-applicant">
                <tui-text
                  :text="item.applicantNum"
                  padding="0 8rpx"
                  color="#7d7c7c"
                  size="24"
                ></tui-text>
              </view>
            </view>
          </view>
        </view>
        <tui-divider height="4" />
      </view>
    </view> -->
  </view>
</template>

<script>
import {
  getArticleListPost,
  articleParamListPOST,
} from "@/common/apis/article-controller";
import compilation from "@/static/course/compilation.svg";
import { tranNumber, getCategoryTreeToArr } from "@/common/utils";
export default {
  async onLoad() {
    this.share.title = "🗂️🗂️🗂️ 优加知识库更新啦";
    try {
      this.loading = true;
      const arr = [];
      const res = await articleParamListPOST();
      this.category = JSON.parse(res.data);
      for (const item of getCategoryTreeToArr(JSON.parse(res.data), "3")) {
        const { data } = await getArticleListPost({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          categoryThird: [String(item.id)],
        });
        arr.push({
          ...item,
          articleList: data,
        });
      }
      this.categoryThirdList = arr;
    } catch (e) {
    } finally {
      this.loading = false;
    }
  },
  data() {
    return {
      loading: true,
      current: 0,
      tranNumber,
      compilation,
      courseList: [],
      tabs: ["全部", "产品经理", "前端开发", "后端开发", "运营", "数据分析"],
      couresList: [
        {
          couresId: "11",
          title: "深信服春深信金牌课程服招金牌课程",
          tag: ["行业热点", "录像视频", "精品"],
          price: "199",
          coverUrl: "a.png",
          originPrice: "499",
          applicantNum: "92人报名",
        },
        {
          couresId: "11",
          title: "深信服春深信服招金牌课程",
          tag: ["行业热点", "录像视频", "精品"],
          price: "199",
          coverUrl: "a.png",
          originPrice: "499",
          applicantNum: "211人报名",
        },
        {
          couresId: "11",
          title: "深信服春深信服招金牌课程",
          tag: ["行业热点", "录像视频", "精品"],
          price: "199",
          coverUrl: "a.png",
          originPrice: "499",
          applicantNum: "922人报名",
        },
        {
          couresId: "11",
          title: "深信服春深信服招金牌课程",
          tag: ["行业热点", "录像视频", "精品"],
          price: "199",
          coverUrl: "d.png",
          originPrice: "499",
          applicantNum: "2222人报名",
        },
        {
          couresId: "11",
          title: "深信服春深信服招金牌课程",
          tag: ["行业热点", "录像视频", "精品"],
          price: "199",
          coverUrl: "b.png",
          originPrice: "499",
          applicantNum: "922人报名",
        },
        {
          couresId: "11",
          title: "深信服春深信服招金牌课程",
          tag: ["行业热点", "录像视频", "精品"],
          price: "199",
          coverUrl: "b.png",
          originPrice: "499",
          applicantNum: "92人报名",
        },
        {
          couresId: "11",
          title: "深信服春深信服招金牌课程",
          tag: ["行业热点", "录像视频", "精品"],
          price: "399",
          coverUrl: "d.png",
          originPrice: "599",
          applicantNum: "92人报名",
        },
        {
          couresId: "11",
          title: "深信服春深信服招金牌课程",
          tag: ["行业热点", "录像视频", "精品"],
          price: "99",
          coverUrl: "c.png",
          originPrice: "399",
          applicantNum: "92人报名",
        },
        {
          couresId: "11",
          title: "深信服春深信服招金牌课程",
          tag: ["行业热点", "录像视频", "精品"],
          price: "139",
          coverUrl: "b.png",
          originPrice: "399",
          applicantNum: "92人报名",
        },
      ],
      category: [],
      pageNum: 1,
      pageSize: 10,
      categoryThirdList: [
        {
          category: "3",
          description:
            "本知识库收录产品经理基础知识，包括产品经理岗位介绍，产品经理岗位分析等",
          id: 100235213,
          innerTree: Array(0),
          label: "产品经理基础知识",
          articleList: [
            {
              articleId: 1700204113361350,
              articleTitle: "产品专栏01｜产品入门介绍",
              categoryFirst: ["100"],
              categorySecond: ["100235"],
              categoryThird: ["100235213"],
              collectNum: 7,
              commentNum: 14,
              content: null,
              coverUrl:
                "https://resumes-docs-1312496861.cos.ap-beijing.myqcloud.com/4d844aaf0d174dbea44e3fc57fd13758.png",
              createTime: 1700204113000,
              id: 73,
              isFree: true,
              summery:
                "看到这，相信我们对于是否选择互联网产品/运营岗，已经有了一个基本的认知。而伴随着互联网发展的精细化，岗位也开始细分，产品经理不仅仅都是个画原型图，做功能的工具人，还需要我们在不同业务场景有一定的擅长领域。需要注意的是：岗位的细分虽然伴随着部分能力模型要求的变化，但是对于校招岗位来说，我们面试重点考察的能力还是以通用的基础能力为主。而当我们基础能力完善后，还具备某一岗位/行业的“优势”",
              supportNum: 7,
              tags: ["产品经理", "互联网产品", "产品专栏"],
              updateTime: 1702287607000,
              viewNum: 1515,
            },
            {
              articleId: 1700204113361350,
              articleTitle: "产品专栏01｜产品入门介绍",
              categoryFirst: ["100"],
              categorySecond: ["100235"],
              categoryThird: ["100235213"],
              collectNum: 7,
              commentNum: 14,
              content: null,
              coverUrl:
                "https://resumes-docs-1312496861.cos.ap-beijing.myqcloud.com/4d844aaf0d174dbea44e3fc57fd13758.png",
              createTime: 1700204113000,
              id: 73,
              isFree: true,
              summery:
                "看到这，相信我们对于是否选择互联网产品/运营岗，已经有了一个基本的认知。而伴随着互联网发展的精细化，岗位也开始细分，产品经理不仅仅都是个画原型图，做功能的工具人，还需要我们在不同业务场景有一定的擅长领域。需要注意的是：岗位的细分虽然伴随着部分能力模型要求的变化，但是对于校招岗位来说，我们面试重点考察的能力还是以通用的基础能力为主。而当我们基础能力完善后，还具备某一岗位/行业的“优势”",
              supportNum: 7,
              tags: ["产品经理", "互联网产品", "产品专栏"],
              updateTime: 1702287607000,
              viewNum: 1515,
            },
            {
              articleId: 1700204113361350,
              articleTitle: "产品专栏01｜产品入门介绍",
              categoryFirst: ["100"],
              categorySecond: ["100235"],
              categoryThird: ["100235213"],
              collectNum: 7,
              commentNum: 14,
              content: null,
              coverUrl:
                "https://resumes-docs-1312496861.cos.ap-beijing.myqcloud.com/4d844aaf0d174dbea44e3fc57fd13758.png",
              createTime: 1700204113000,
              id: 73,
              isFree: true,
              summery:
                "看到这，相信我们对于是否选择互联网产品/运营岗，已经有了一个基本的认知。而伴随着互联网发展的精细化，岗位也开始细分，产品经理不仅仅都是个画原型图，做功能的工具人，还需要我们在不同业务场景有一定的擅长领域。需要注意的是：岗位的细分虽然伴随着部分能力模型要求的变化，但是对于校招岗位来说，我们面试重点考察的能力还是以通用的基础能力为主。而当我们基础能力完善后，还具备某一岗位/行业的“优势”",
              supportNum: 7,
              tags: ["产品经理", "互联网产品", "产品专栏"],
              updateTime: 1702287607000,
              viewNum: 1515,
            },
          ],
        },
        {
          category: "3",
          description:
            "本知识库收录产品经理基础知识，包括产品经理岗位介绍，产品经理岗位分析等",
          id: 100235213,
          innerTree: Array(0),
          label: "产品经理基础知识",
          articleList: [
            {
              articleId: 1700204113361350,
              articleTitle: "产品专栏01｜产品入门介绍",
              categoryFirst: ["100"],
              categorySecond: ["100235"],
              categoryThird: ["100235213"],
              collectNum: 7,
              commentNum: 14,
              content: null,
              coverUrl:
                "https://resumes-docs-1312496861.cos.ap-beijing.myqcloud.com/4d844aaf0d174dbea44e3fc57fd13758.png",
              createTime: 1700204113000,
              id: 73,
              isFree: true,
              summery:
                "看到这，相信我们对于是否选择互联网产品/运营岗，已经有了一个基本的认知。而伴随着互联网发展的精细化，岗位也开始细分，产品经理不仅仅都是个画原型图，做功能的工具人，还需要我们在不同业务场景有一定的擅长领域。需要注意的是：岗位的细分虽然伴随着部分能力模型要求的变化，但是对于校招岗位来说，我们面试重点考察的能力还是以通用的基础能力为主。而当我们基础能力完善后，还具备某一岗位/行业的“优势”",
              supportNum: 7,
              tags: ["产品经理", "互联网产品", "产品专栏"],
              updateTime: 1702287607000,
              viewNum: 1515,
            },
            {
              articleId: 1700204113361350,
              articleTitle: "产品专栏01｜产品入门介绍",
              categoryFirst: ["100"],
              categorySecond: ["100235"],
              categoryThird: ["100235213"],
              collectNum: 7,
              commentNum: 14,
              content: null,
              coverUrl:
                "https://resumes-docs-1312496861.cos.ap-beijing.myqcloud.com/4d844aaf0d174dbea44e3fc57fd13758.png",
              createTime: 1700204113000,
              id: 73,
              isFree: true,
              summery:
                "看到这，相信我们对于是否选择互联网产品/运营岗，已经有了一个基本的认知。而伴随着互联网发展的精细化，岗位也开始细分，产品经理不仅仅都是个画原型图，做功能的工具人，还需要我们在不同业务场景有一定的擅长领域。需要注意的是：岗位的细分虽然伴随着部分能力模型要求的变化，但是对于校招岗位来说，我们面试重点考察的能力还是以通用的基础能力为主。而当我们基础能力完善后，还具备某一岗位/行业的“优势”",
              supportNum: 7,
              tags: ["产品经理", "互联网产品", "产品专栏"],
              updateTime: 1702287607000,
              viewNum: 1515,
            },
            {
              articleId: 1700204113361350,
              articleTitle: "产品专栏01｜产品入门介绍",
              categoryFirst: ["100"],
              categorySecond: ["100235"],
              categoryThird: ["100235213"],
              collectNum: 7,
              commentNum: 14,
              content: null,
              coverUrl:
                "https://resumes-docs-1312496861.cos.ap-beijing.myqcloud.com/4d844aaf0d174dbea44e3fc57fd13758.png",
              createTime: 1700204113000,
              id: 73,
              isFree: true,
              summery:
                "看到这，相信我们对于是否选择互联网产品/运营岗，已经有了一个基本的认知。而伴随着互联网发展的精细化，岗位也开始细分，产品经理不仅仅都是个画原型图，做功能的工具人，还需要我们在不同业务场景有一定的擅长领域。需要注意的是：岗位的细分虽然伴随着部分能力模型要求的变化，但是对于校招岗位来说，我们面试重点考察的能力还是以通用的基础能力为主。而当我们基础能力完善后，还具备某一岗位/行业的“优势”",
              supportNum: 7,
              tags: ["产品经理", "互联网产品", "产品专栏"],
              updateTime: 1702287607000,
              viewNum: 1515,
            },
          ],
        },
        {
          category: "3",
          description:
            "本知识库收录产品经理基础知识，包括产品经理岗位介绍，产品经理岗位分析等",
          id: 100235213,
          innerTree: Array(0),
          label: "产品经理基础知识",
          articleList: [
            {
              articleId: 1700204113361350,
              articleTitle: "产品专栏01｜产品入门介绍",
              categoryFirst: ["100"],
              categorySecond: ["100235"],
              categoryThird: ["100235213"],
              collectNum: 7,
              commentNum: 14,
              content: null,
              coverUrl:
                "https://resumes-docs-1312496861.cos.ap-beijing.myqcloud.com/4d844aaf0d174dbea44e3fc57fd13758.png",
              createTime: 1700204113000,
              id: 73,
              isFree: true,
              summery:
                "看到这，相信我们对于是否选择互联网产品/运营岗，已经有了一个基本的认知。而伴随着互联网发展的精细化，岗位也开始细分，产品经理不仅仅都是个画原型图，做功能的工具人，还需要我们在不同业务场景有一定的擅长领域。需要注意的是：岗位的细分虽然伴随着部分能力模型要求的变化，但是对于校招岗位来说，我们面试重点考察的能力还是以通用的基础能力为主。而当我们基础能力完善后，还具备某一岗位/行业的“优势”",
              supportNum: 7,
              tags: ["产品经理", "互联网产品", "产品专栏"],
              updateTime: 1702287607000,
              viewNum: 1515,
            },
            {
              articleId: 1700204113361350,
              articleTitle: "产品专栏01｜产品入门介绍",
              categoryFirst: ["100"],
              categorySecond: ["100235"],
              categoryThird: ["100235213"],
              collectNum: 7,
              commentNum: 14,
              content: null,
              coverUrl:
                "https://resumes-docs-1312496861.cos.ap-beijing.myqcloud.com/4d844aaf0d174dbea44e3fc57fd13758.png",
              createTime: 1700204113000,
              id: 73,
              isFree: true,
              summery:
                "看到这，相信我们对于是否选择互联网产品/运营岗，已经有了一个基本的认知。而伴随着互联网发展的精细化，岗位也开始细分，产品经理不仅仅都是个画原型图，做功能的工具人，还需要我们在不同业务场景有一定的擅长领域。需要注意的是：岗位的细分虽然伴随着部分能力模型要求的变化，但是对于校招岗位来说，我们面试重点考察的能力还是以通用的基础能力为主。而当我们基础能力完善后，还具备某一岗位/行业的“优势”",
              supportNum: 7,
              tags: ["产品经理", "互联网产品", "产品专栏"],
              updateTime: 1702287607000,
              viewNum: 1515,
            },
            {
              articleId: 1700204113361350,
              articleTitle: "产品专栏01｜产品入门介绍",
              categoryFirst: ["100"],
              categorySecond: ["100235"],
              categoryThird: ["100235213"],
              collectNum: 7,
              commentNum: 14,
              content: null,
              coverUrl:
                "https://resumes-docs-1312496861.cos.ap-beijing.myqcloud.com/4d844aaf0d174dbea44e3fc57fd13758.png",
              createTime: 1700204113000,
              id: 73,
              isFree: true,
              summery:
                "看到这，相信我们对于是否选择互联网产品/运营岗，已经有了一个基本的认知。而伴随着互联网发展的精细化，岗位也开始细分，产品经理不仅仅都是个画原型图，做功能的工具人，还需要我们在不同业务场景有一定的擅长领域。需要注意的是：岗位的细分虽然伴随着部分能力模型要求的变化，但是对于校招岗位来说，我们面试重点考察的能力还是以通用的基础能力为主。而当我们基础能力完善后，还具备某一岗位/行业的“优势”",
              supportNum: 7,
              tags: ["产品经理", "互联网产品", "产品专栏"],
              updateTime: 1702287607000,
              viewNum: 1515,
            },
          ],
        },
      ],
    };
  },
  methods: {
    change(preValue) {
      this.current = preValue.index;
    },
    moreDetail(e) {
      uni.navigateTo({
        url: `/pages/coures/article/article?articleId=${e.articleId}`,
      });
    },
  },
};
</script>

<style lang="less">
page {
  background-color: rgb(234, 234, 241);
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.greenet-top-tab {
  width: 100%;
}
.greenet-content-list {
  background: #fff;
  border-radius: 10rpx;
  margin: 100rpx 0;
  width: 100%;
  overflow: hidden;
}
.greenet-course-list-item {
  padding: 26rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.course-list-item-image {
  overflow: hidden;
  position: relative;
  border-radius: 8rpx;
  flex: 0 0 auto;
  width: 282rpx;
  margin-right: 20rpx;
}
.img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  -o-object-fit: cover;
  -webkit-object-fit: cover;
  -ms-object-fit: cover;
  -moz-object-fit: cover;
}
.course-list-item-right {
  flex: 1 1 auto;
  height: 148rpx;
  display: flex;
  flex-direction: column;
}
.course-list-item-title {
  line-height: 1.25;
  display: -webkit-box;
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-word;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 28rpx;
  color: #222222;
}

.course-list-item-tag {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 15rpx 0;
}
.course-list-item-intro {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
}
.course-list-item-intro .span {
  font-size: 32rpx;
  color: #ff4f4c;
  position: relative;
  margin-right: 8rpx;
}
.course-list-item-intro .line-thro {
  font-size: 24rpx;
  position: relative;
  font-weight: 400;
  color: #9c9c9c;
  text-decoration: line-through;
}
.sort-list {
  height: 100%;
  width: 100%;
  margin: 100rpx 0;
}
.sort-card {
  background: #ffffff;
  height: 200px;
  margin: 0 20rpx 24rpx 20rpx;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 28rpx 0rpx 28rpx 20rpx;
  &-top {
    height: 100rpx;
    display: flex;
    justify-content: space-between;
    padding-right: 20rpx;
    &-left {
      flex: 1;
      .title {
        display: flex;
        color: #000000;
      }
      &-icon {
        width: 50rpx;
        height: 50rpx;
      }
    }
    &-right {
      width: 150rpx;
      height: 70%;
    }
  }
}
.tui-article-list {
  margin-top: 25rpx;
  display: flex;
}
.course-card-item {
  width: 282rpx;
  margin-right: 20rpx;

  .cover-url {
    border-radius: 8rpx;
    flex: 0 0 auto;
    width: 282rpx;
    height: 154rpx;
    position: relative;
    &-mask {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 2;
      box-sizing: border-box;
      padding: 16px 8px 6px;
      width: 100%;
      height: 38px;
      border-bottom-right-radius: 6px;
      border-bottom-left-radius: 6px;
      background-image: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.8) 100%
      );
      color: #ffffff;
      font-size: 22rpx;
      opacity: 1;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-img {
      height: 100%;
      width: 100%;
      border-radius: 8rpx;
      object-fit: cover;
      -o-object-fit: cover;
      -webkit-object-fit: cover;
      -ms-object-fit: cover;
      -moz-object-fit: cover;
    }
  }
}
.article-detail {
  margin-top: 14rpx;
  height: 94rpx;
  &-title {
    font-size: 25rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    height: 100%;
    -webkit-box-orient: vertical;
  }
}
</style>

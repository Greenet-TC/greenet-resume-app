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
    <view class="sort-list">
      <view class="sort-card">
        <view class="sort-card-header">
          <view class="sort-card-header-left"></view>
          <view class="sort-card-header-right"></view>
        </view>
        <view class="sort-card-conent"></view>
      </view>
    </view>
    <view class="greenet-content-list">
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
    </view>
  </view>
</template>

<script>
import { getArticleListPost } from "@/common/apis/article-controller";
export default {
  async onLoad() {
    const data = await getArticleListPost({
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    });
    console.log(111, data);
  },
  data() {
    return {
      current: 0,
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
      pageNum: 0,
      pageSize: 10,
    };
  },
  methods: {
    change(preValue) {
      this.current = preValue.index;
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
  background-color: #ffffff60;
  height: 300px;
  margin: 0 20rpx;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 20rpx 20rpx;
  &-header {
    height: 80rpx;
    display: flex;
    justify-content: space-between;
    background: #ff4f4c;
  }
}
</style>

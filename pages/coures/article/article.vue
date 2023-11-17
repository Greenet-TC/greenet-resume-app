<!--
 * @Author: maxueming maxueming@kuaishou.com
 * @Date: 2023-09-12 11:26:53
 * @LastEditors: maxueming maxueming@kuaishou.com
 * @LastEditTime: 2023-11-17 10:25:36
 * @FilePath: /greenet-resume-app/pages/activityPage/schoolRecruitment/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="school-active">
    <tui-navigation-bar
      dropDownHide
      splitLine
      @init="initNavigation"
      @change="opacityChange"
      :scrollTop="scrollTop"
      title="文章详情"
      backgroundColor="#ffffff"
      color="#333"
    >
      <view class="tui-header-icon" :style="{ marginTop: top + 'px' }">
        <tui-icon
          name="arrowleft"
          :color="opacity > 0.85 ? 'rgb(96,98,102)' : '#ffffff0'"
          @click="back"
          size="19"
        ></tui-icon>
        <view class="tui-header-icon-divider"></view>
        <tui-icon
          name="home"
          :color="opacity > 0.85 ? 'rgb(96,98,102)' : '#ffffff0'"
          @click="home"
          size="19"
        ></tui-icon>
      </view>
    </tui-navigation-bar>
    <view class="article-cover">
      <image
        :src="articleInfo?.coverUrl"
        class="article-cover"
        mode="scaleToFill"
      ></image>
    </view>
    <view class="content-box">
      <view class="article">
        <view class="article-header">
          <tui-divide-list
            :list="list"
            badgeBgColor="rgb(247, 77, 84)"
            badgeColor="#fff"
          ></tui-divide-list>

          <view>
            <tui-tag
              v-if="articleInfo?.createTime"
              type="light-orange"
              margin="0 14rpx 0 0"
              padding="10rpx"
              size="20rpx"
              >{{ getFormateDateTime(articleInfo?.createTime) }}</tui-tag
            >
            <tui-tag
              v-for="(item, index) in articleInfo?.tags"
              :key="index"
              type="light-brownish"
              margin="0 14rpx 0 0"
              padding="10rpx"
              size="20rpx"
              >{{ item }}</tui-tag
            >
            <tui-tag
              v-if="articleInfo?.viewNum"
              type="light-brownish"
              margin="0 14rpx 0 0"
              padding="10rpx"
              size="20rpx"
              >{{ articleInfo?.viewNum }}人看过</tui-tag
            >
          </view>
        </view>
        <view>
          <tui-section
            size="36"
            :title="articleInfo?.articleTitle"
            :descr="articleInfo?.summery"
          ></tui-section>
        </view>
        <view class="article-content">
          <uParse :content="articleInfo?.content || ''" />
        </view>
      </view>
      <view class="comments">
        <tui-section title="热门评论" :size="34"></tui-section>
      </view>
    </view>

    <view class="tui-tabbar">
      <view class="search-container">
        <!-- <view class="tui-search__bar">
              <view class="tui-searchbox" @tap="search">
                <icon type="search" :size="13" color="#999"></icon>
                <text class="tui-search-text">搜索岗位/公司/行业名称等</text>
              </view>
            </view> -->
        <tui-searchbar
          radius="40rpx"
          inputBgColor="#f3f4f6"
          placeholder="发表你的评论..."
          backgroundColor="rgb(245, 246, 248,0)"
          @search="search"
          @clear="clear"
          searchText="确认"
        ></tui-searchbar>
      </view>

      <view class="tui-badge-item">
        <tui-icon name="message" size="22"></tui-icon>
        <tui-badge
          type="gray"
          absolute
          :scaleRatio="0.8"
          translateX="40%"
          top="-6rpx"
          >{{ articleInfo?.commentNum }}</tui-badge
        >
      </view>
      <view class="tui-badge-item">
        <tui-icon size="22" name="agree"></tui-icon>
        <tui-badge
          type="gray"
          absolute
          :scaleRatio="0.8"
          translateX="40%"
          top="-6rpx"
          >{{ articleInfo?.supportNum }}</tui-badge
        >
      </view>

      <view class="tui-badge-item">
        <tui-icon name="like" size="22"></tui-icon>
        <tui-badge
          type="gray"
          absolute
          :scaleRatio="0.8"
          translateX="40%"
          top="-6rpx"
          >{{ articleInfo?.collectNum }}</tui-badge
        >
      </view>
      <button open-type="share" class="tui-share-btn">
        <tui-icon name="share" size="22"></tui-icon>
      </button>
    </view>
    <view class="footer">
      <tui-footer
        :fixed="false"
        class="service-tui-footer"
        copyright="Copyright © 2022-2025 Greenet-TC."
      ></tui-footer
    ></view>
  </view>
</template>
<script>
import { viewArticleDetailPost } from "@/common/apis/article-controller";
import uParse from "@/components/uni/uParse/src/wxParse";
import { getFormateDateTime } from "@/common/utils";

export default {
  components: { uParse },
  onPageScroll(e) {},
  async onLoad(options) {
    try {
      const data = await viewArticleDetailPost({
        articleId: options.articleId,
      });
      this.articleInfo = data.data;
      this.list = this.list.map((i) => {
        return {
          ...i,
          value: this.articleInfo[i.id],
        };
      });
    } catch (e) {
      
    }
  },
  data() {
    return {
      top: 0, //标题图标距离顶部距离
      opacity: 0,
      scrollTop: 0.5,
      articleInfo: null,
      getFormateDateTime,
      list: [
        {
          id: "viewNum",
          text: "浏览量",
          value: 251,
          //角标数字，大于0时显示
          num: Math.floor(Math.random() * 10 + 1),
        },
        {
          text: "点赞量",
          id: "supportNum",
          value: 20, //角标数字，大于0时显示
          num: 0,
        },
        {
          text: "收藏量",
          value: 20, //角标数字，大于0时显示
          num: 0,
          id: "collectNum",
        },
        {
          text: "评论量",
          value: 0, //角标数字，大于0时显示
          num: 0,
          id: "commentNum",
        },
      ],
    };
  },

  methods: {
    initNavigation(e) {
      this.opacity = e.opacity;
      this.top = e.top;
    },
    home() {
      uni.switchTab({
        url: "/pages/index/index",
      });
    },
    back() {
      uni.navigateBack();
    },

    opacityChange(e) {
      this.opacity = e.opacity;
    },
  },
};
</script>
<style lang="less">
.tui-header-icon {
  margin-left: 10px;
  width: 80px;
  position: fixed;
  top: 0;
  padding: 0 16rpx;
  border-radius: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 0.5px solid #dadbde;
  padding: 0 16rpx;
  align-items: center;
  height: 32px;
  transform: translateZ(0);
  z-index: 99999;
  box-sizing: border-box;
  &-divider {
    border-left: 1px solid rgb(214, 215, 217);
    height: 16px;
    border-top-color: rgb(214, 215, 217);
    border-right-color: rgb(214, 215, 217);
    border-bottom-color: rgb(214, 215, 217);
    margin: 0px 8px;
  }
}
page {
  background-color: rgb(245, 246, 248);
}
.school-active {
  height: 100vh;
  width: 100%;
  &-img {
    width: 100%;
    height: 120%;
  }
  .back-icon {
    position: absolute;
    width: 24rpx;
    height: 24rpx;
    top: 90rpx;
    left: 20rpx;
  }
}
.content-box {
  position: absolute;
  top: 203px;

  width: 94%;
  left: 3%;
}
.article {
  background: #ffffff;
  border-radius: 20rpx;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.01);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: -1 0 10px rgba(0, 0, 0, 0.35);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(80rpx);
  &-cover {
    width: 100%;
  }
  &-content {
    padding: 20rpx 20rpx;
  }
  &-header {
    padding: 20rpx;
  }
}
.comments {
  background: #ffffff;
  height: 200rpx;
  width: 94%;
  margin-top: 20rpx;
  padding: 14rpx;
}
.tui-tabbar {
  width: 100%;
  height: 150rpx;
  background: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 0;
  bottom: 0;
  /* #ifdef H5 */
  /* bottom: 50px; */
  /* #endif */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40rpx 32rpx 0;
  box-sizing: border-box;
  font-size: 24rpx;
  z-index: 9999;
}
.search-container {
  width: 352rpx;
}
.tui-badge-item {
  position: relative;
}
.tui-share-btn {
  // flex: 1;
  display: block;
  background: transparent;
  margin: 0;
  padding: 0;
  border-radius: 0;
  border: 0;
  line-height: 1;
}

.tui-share-btn::after {
  border: 0;
}
.footer {
  width: 100%;
  height: 200rpx;
}
</style>

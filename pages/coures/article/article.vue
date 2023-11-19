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
            background="rgb(247, 77, 84,0)"
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
              >{{ tranNumber(articleInfo?.viewNum ?? 0, 2) }}人看过</tui-tag
            >
          </view>
        </view>
        <view>
          <tui-section
            size="40"
            fontWeight="500"
            :title="articleInfo?.articleTitle"
            :descr="articleInfo?.summery"
          ></tui-section>
        </view>
        <view class="article-content">
          <uParse :content="articleInfo?.content || ''" />
        </view>
      </view>
      <view class="comments">
        <tui-section
          padding="5px 5px"
          :title="`精彩评论 (${commentLists.length})`"
          :size="30"
          fontWeight="500"
        >
        </tui-section>

        <view
          class="comments-item"
          v-for="(item, index) in commentLists"
          :key="index"
        >
          <view>
            <image
              :src="
                baseInfo?.avatar
                  ? baseInfo?.avatar
                  : baseInfo?.sex === 1
                  ? webURLBase + `/profile/man.png`
                  : webURLBase + `/profile/woman.png`
              "
              class="tui-avatar"
            ></image>
          </view>
          <view>
            <tui-section
              size="28"
              fontWeight="400"
              padding="0px 6px"
              descrTop="2"
              descrColor="#252933"
              :title="item?.fromName"
              :descr="item?.content"
            ></tui-section>
            <tui-text
              :text="getFormateDateTime(item?.createTime)"
              size="20"
              padding="0 6px 0 6px"
              type="gray"
            ></tui-text
            ><tui-tag
              type="primary"
              plain
              v-if="index === 0"
              size="20rpx"
              padding="8rpx 18rpx"
              >首评</tui-tag
            >
          </view>
        </view>
      </view>

      <view class="footer">
        <tui-footer
          :fixed="false"
          class="service-tui-footer"
          copyright="Copyright © 2022-2025 Greenet-TC."
        ></tui-footer
      ></view>
    </view>

    <view
      class="tui-tabbar"
      :style="{ height: isComment ? '390rpx' : '150rpx' }"
    >
      <view class="tui-tabbar-textarea" v-if="isComment">
        <view class="tui-tabbar-textarea-useInfo">
          <image
            :src="
              baseInfo?.avatar
                ? baseInfo?.avatar
                : baseInfo?.sex === 1
                ? webURLBase + `/profile/man.png`
                : webURLBase + `/profile/woman.png`
            "
            class="tui-avatar"
          ></image>
          <view class="tui-nickname">
            {{ baseInfo?.username }}
          </view>
        </view>
      </view>
      <view class="tui-tabbar-tab">
        <view
          class="search-container"
          :style="{ width: isComment ? '640rpx' : '352rpx' }"
        >
          <tui-searchbar
            ref="searchbar"
            radius="40rpx"
            inputBgColor="#f3f4f6"
            placeholder="发表你的评论..."
            backgroundColor="rgb(245, 246, 248,0)"
            @click="click"
            @cancel="cancel"
            @blur="blur"
            @search="search"
            searchText="发送"
            padding="16rpx 22rpx"
            cursorSpacing="40"
          >
          </tui-searchbar>
        </view>
        <view class="tui-tabbar-textarea-btn" v-if="!isComment">
          <view class="tui-badge-item"    @tap="click">
            <tui-icon name="message" size="22"></tui-icon>
            <tui-badge
              type="gray"
              absolute
              :scaleRatio="0.8"
              translateX="40%"
              top="-6rpx"
              >{{ tranNumber(articleInfo?.commentNum ?? 0, 2) }}</tui-badge
            >
          </view>
          <view class="tui-badge-item" @tap="handleSupportNum">
            <tui-icon size="22" name="agree" :color="supportColor"></tui-icon>
            <tui-badge
              type="gray"
              absolute
              :scaleRatio="0.8"
              translateX="40%"
              top="-6rpx"
              >{{ tranNumber(articleInfo?.supportNum ?? 0, 2) }}</tui-badge
            >
          </view>

          <view class="tui-badge-item" @tap="handleCollectNum">
            <tui-icon name="like" size="22" :color="collectColor"></tui-icon>
            <tui-badge
              type="gray"
              absolute
              :scaleRatio="0.8"
              translateX="40%"
              top="-6rpx"
              >{{ tranNumber(articleInfo?.collectNum ?? 0, 2) }}</tui-badge
            >
          </view>
          <button open-type="share" class="tui-share-btn">
            <tui-icon name="share" size="22"></tui-icon></button
        ></view>
      </view>
    </view>
  </view>
</template>
<script>
import {
  viewArticleDetailPost,
  articleUpdateCollectNumGET,
  articleUpdateSupportNumGET,
  commentInsertCommentPOST,
  commentGetCommentListPOST,
} from "@/common/apis/article-controller";
import uParse from "@/components/uni/uParse/src/wxParse";
import { getFormateDateTime, WEBURL, tranNumber } from "@/common/utils";
import store from "@/store/index.ts";

export default {
  async onLoad(options) {
    try {
      const data = await viewArticleDetailPost({
        articleId: options.articleId,
      });
      this.articleInfo = data.data;
      this.list = this.list.map((i) => {
        return {
          ...i,
          value: tranNumber(this.articleInfo[i.id] ?? 0, 2),
        };
      });
      const _comments = await commentGetCommentListPOST({
        articleId: options.articleId,
      });
      this.commentLists = _comments.data;
    } catch (e) {}
  },

  onPageScroll(e) {},
  components: { uParse },

  data() {
    return {
      top: 0, //标题图标距离顶部距离
      opacity: 0,
      scrollTop: 0.5,
      articleInfo: null,
      getFormateDateTime,
      searchHeight: "72rpx",
      isComment: false,
      webURLBase: WEBURL,
      tranNumber,
      commentLists: [],

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
          num: Math.floor(Math.random() * 10 + 1),
        },
        {
          text: "收藏量",
          value: 20, //角标数字，大于0时显示
          num: Math.floor(Math.random() * 10 + 1),
          id: "collectNum",
        },
        {
          text: "评论量",
          value: 0, //角标数字，大于0时显示
          num: Math.floor(Math.random() * 10 + 1),
          id: "commentNum",
        },
      ],
      supportColor: "",
      collectColor: "",
      CommentColor: "",
    };
  },
  computed: {
    baseInfo() {
      return store.state.userBaseInfo;
    },
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
    click(e) {
      console.log(e);
      this.getElementScollTop('.comments')
      this.isComment = true;
    },
    blur() {
      this.cancel();
    },
    cancel() {
      this.isComment = false;
    },
    //调用方法开始计时
    reset() {
      this.$refs.searchbar && this.$refs.searchbar.reset();
    },
    async search(value) {
      try {
        await commentInsertCommentPOST({
          articleId: this.articleInfo.articleId,
          articleTitle: this.articleInfo.articleTitle,
          content: value.value,
          // fromName: "string",
          // fromUid: "number",
        });
        this.articleInfo.commentNum += 1;
        this.CommentColor = !this.CommentColor ? "#FE3666" : "";

        const _comments = await commentGetCommentListPOST({
          articleId: this.articleInfo.articleId,
        });
        this.commentLists = _comments.data;
        this.reset()
      } catch (e) {
        console.error("评论错误", e);
      }
      this.isComment = false;
    },
    async handleCollectNum() {
      try {
        await articleUpdateCollectNumGET({
          articleId: this.articleInfo.articleId,
          articleTitle: this.articleInfo.articleTitle,
          collectFlag: !this.collectColor ? 1 : -1,
        });
        this.articleInfo.collectNum += !this.collectColor ? 1 : -1;
        this.collectColor = !this.collectColor ? "#FE3666" : "";
      } catch (e) {
        console.error("收藏错误", e);
      }
    },
    async handleSupportNum() {
      try {
        await articleUpdateSupportNumGET({
          articleId: this.articleInfo.articleId,
          articleTitle: this.articleInfo.articleTitle,
          collectFlag: !this.supportColor ? 1 : -1,
        });
        this.articleInfo.supportNum += !this.supportColor ? 1 : -1;
        this.supportColor = !this.supportColor ? "#FE3666" : "";
      } catch (e) {
        console.error("点赞错误", e);
      }
    },
    getElementScollTop(ele) {
      const query = uni.createSelectorQuery()
      query
        .select(ele)
        .boundingClientRect((data) => {
          console.log(data, 'data')
          let pageScrollTop = Math.round(data.top)
          uni.pageScrollTo({
            scrollTop: pageScrollTop, //滚动的距离
            duration: 0, //过渡时间
        })
      })
        .exec()
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

  width: 100%;
  height: 100%;
  --color: #e1e1e170;
  // background-color: #F3F3F3;
  background-image: linear-gradient(
      0deg,
      transparent 24%,
      var(--color) 25%,
      var(--color) 26%,
      transparent 27%,
      transparent 74%,
      var(--color) 75%,
      var(--color) 76%,
      transparent 77%,
      transparent
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      var(--color) 25%,
      var(--color) 26%,
      transparent 27%,
      transparent 74%,
      var(--color) 75%,
      var(--color) 76%,
      transparent 77%,
      transparent
    );
  background-size: 55px 55px;
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
  // background: #ffffff;
  // border-radius: 20rpx;
  // box-shadow: 0 2px 1px rgba(0, 0, 0, 0.01);
  // background: rgba(255, 255, 255, 0.95);
  // box-shadow: -1 0 10px rgba(0, 0, 0, 0.35);
  // -webkit-backdrop-filter: blur(10px);
  // backdrop-filter: blur(80rpx);
  &-cover {
    width: 100%;
  }
  &-content {
    padding: 20rpx 20rpx;
  }
  &-header {
    padding: 20rpx;
    // background: #ffffff;
    border-radius: 20rpx 20rpx 20rpx 20rpx;
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(80rpx);
  }
}
.comments {
  background: #ffffff;
  width: 94%;
  margin-top: 20rpx;
  padding: 28rpx;
  &-item {
    display: flex;
    margin-top: 20px;
    .tui-avatar {
      width: 40rpx;
      height: 40rpx;
    }
  }
}
.tui-tabbar {
  width: 100%;
  background: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9999;
  /* #ifdef H5 */
  /* bottom: 50px; */
  /* #endif */
  padding: 0 40rpx 32rpx 0;
  box-sizing: border-box;
  font-size: 24rpx;
  &-tab {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-textarea {
    margin-top: 10rpx;
    width: 600rpx;
    padding: 0rpx 40rpx;
    &-btn {
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex: 1;
    }
    .tui-avatar {
      width: 40rpx;
      height: 40rpx;
    }
    .tui-nickname {
      margin-left: 20rpx;
    }
    &-useInfo {
      display: flex;
      height: 50rpx;
      align-items: center;
      // margin-bottom: 22rpx;
      // justify-content: ;
    }
  }
}
.search-container {
  padding-left: 20rpx;
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
  height: 250rpx;
}
</style>

<template>
  <view class="container">
    <!--header-->
    <!--加载loadding-->
    <tui-loadmore v-if="pullUpOn" :index="1"></tui-loadmore>
    <view class="tui-header-banner">
      <view class="tui-banner-bg">
        <!--banner-->
        <view class="tui-banner-box">
          <swiper
            :indicator-dots="true"
            :autoplay="true"
            :interval="5000"
            :duration="150"
            class="tui-banner-swiper"
            :circular="true"
            indicator-color="rgba(255, 255, 255, 0.8)"
            indicator-active-color="#fff"
          >
            <swiper-item
              v-for="(item, index) in banner"
              :key="index"
              @tap.stop="detail"
            >
              <image
                :src="'/static/images/banner/' + item"
                class="tui-slide-image"
                mode="scaleToFill"
              />
            </swiper-item>
          </swiper>
        </view>
      </view>
    </view>

    <view class="tui-product-category">
      <view
        class="tui-category-item"
        v-for="(item, index) in category"
        :key="index"
        :data-key="item.id"
        @tap="resumeEdit"
      >
        <image
          :src="'/static/images/icon/' + item.img"
          class="tui-category-img"
          mode="scaleToFill"
        ></image>
        <view class="tui-category-name">{{ item.name }}</view>
      </view>
    </view>
    <view class="category-active" @tap="activePage">
      <image
        src="https://mxm1923893223-ulteh-1302287111.tcloudbaseapp.com/activity/banner.png"
        class="tui-img__coupon"
      ></image>
      <view class="coupon-contant">
        <view class="coupon-contant-text">
          <view class="coupon-contant-text-title">
            优加实习城市信息共享群
          </view>
          <view class="coupon-contant-text-sub">
            300+名企岗位内推offer轻松拿！
          </view>
        </view>
        <view class="coupon-contant-btn">加入+</view>
      </view>
    </view>

    <!-- 头部 -->
    <view class="tui-title-contant">
      <tui-text size="35" fontWeight="500" block text="实习内推"></tui-text>
      <tui-button
        width="140rpx"
        size="24"
        shape="circle"
        type="gray-primary"
        height="50rpx"
        disabledGray
        @tap="moreCompany"
        >更多内推</tui-button
      >
    </view>
    <view class="tui-product-box">
      <!--简历模板-->
      <view class="tui-block__box">
        <view class="tui-group-name" @tap="more">
          <view>
            <text>热招岗位</text>
            <text class="tui-sub__desc">大家都在投递</text>
          </view>
          <view class="tui-more__box">
            <text>100+ 岗位</text>
            <tui-icon
              name="arrowright"
              :size="30"
              unit="rpx"
              color="#999"
            ></tui-icon>
          </view>
        </view>
        <view class="tui-new-box">
          <view class="tui-new-job-info-box">
            <view class="tui-new-job-info">
              <tui-image-group
                :imageList="[
                  {
                    src: `https://uploadfiles.nowcoder.com/files/20181102/4575098_1541147538969_826546_1499420128657_7.png?x-oss-process=image%2Fresize%2Cw_120%2Ch_120%2Cm_fill`,
                  },
                ]"
                isGroup
                width="80rpx"
                height="80rpx"
              ></tui-image-group>
              <view class="tui-recru-info-text">
                <tui-text block text="阿里巴巴" size="30"></tui-text>
                <tui-text
                  block
                  text="`互联网 | 已上市 | 10000 + 人`"
                  size="22"
                  type="gray"
                ></tui-text
              ></view>
            </view>
            <tui-notice-bar
              single
              :padding="['0', '20rpx']"
              content="阿里巴巴集团的业务包括核心商业、云计算、本地生活服务、数字媒体及娱乐以及创新业务。围绕着阿里巴巴的平台与业务，一个涵盖了消费者、商家、品牌"
            ></tui-notice-bar>
          </view>
          <view
            class="tui-new-item"
            :class="[index != 0 && index != 1 ? 'tui-new-mtop' : '']"
            v-for="(item, index) in recruitInfo"
            :key="index"
            @tap="moreDetail(item)"
          >
            <view class="tui-recru-info-item">
              <tui-image-group
                :imageList="[{ src: item.logo }]"
                isGroup
                width="70rpx"
                height="70rpx"
              ></tui-image-group>
              <view class="tui-recru-info-text">
                <tui-text block :text="item.name" size="30"></tui-text>
                <tui-text
                  block
                  :text="`${item.jobNum}个内推岗位`"
                  size="22"
                  type="gray"
                ></tui-text>
              </view>
            </view>
            <view class="job-company-detail">
              <text>详情</text>
              <tui-icon
                name="arrowright"
                :size="30"
                unit="rpx"
                color="#999"
              ></tui-icon>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 优秀简历 -->

    <!--加载loadding-->
    <tui-loadmore v-if="loadding" :index="1"></tui-loadmore>
    <!-- <tui-nomore v-if="!pullUpOn"></tui-nomore> -->
    <!--加载loadding-->
    <!-- <view class="tui-footer-box"> -->
    <!--uni-app-->
    <tui-actionsheet
      :show="showActionSheet"
      :item-list="itemList"
      @click="itemClick"
      @cancel="closeActionSheet"
      tips="您还没有登录，请登录后获取更多？"
      color="#e41f19"
    >
    </tui-actionsheet>
    <tui-footer
      :fixed="false"
      copyright="Copyright © 2022-2025 Greenet-TC."
    ></tui-footer>
    <!-- </view> -->
  </view>
</template>
<script>
import { companyInfo } from "../../common/contant";
import { login, getBaseInfo, setLoginStatus } from "../../common/login";
import { getToken } from "../../common/utils";
export default {
  onShow() {
    if (!getToken()) {
      setTimeout(() => {
        if (!getToken()) {
          this.openActionSheet();
        }
      }, 3000);
    }
  },

  onLoad() {
    if (getToken()) {
      getBaseInfo();
      setLoginStatus(true);
    }
  },

  onPullDownRefresh: function () {
    let loadData = JSON.parse(JSON.stringify(this.productList));
    loadData = loadData.splice(0, 10);
    this.productList = loadData;
    this.pageIndex = 1;
    this.pullUpOn = true;
    this.loadding = false;
    uni.stopPullDownRefresh();
  },

  onReachBottom: function () {
    if (!this.pullUpOn) return;
    this.loadding = true;
    if (this.pageIndex == 4) {
      this.loadding = false;
      this.pullUpOn = false;
    } else {
      let loadData = JSON.parse(JSON.stringify(this.productList));
      loadData = loadData.splice(0, 10);
      if (this.pageIndex == 1) {
        loadData = loadData.reverse();
      }
      this.productList = this.productList.concat(loadData);
      this.pageIndex = this.pageIndex + 1;
      this.loadding = false;
    }
  },

  //设置页面全屏
  onPageScroll(e) {
    // #ifdef APP-PLUS
    let scrollTop = e.scrollTop;
    if (scrollTop < 0) {
      if (this.opacity > 0) this.opacity = 1 - Math.abs(scrollTop) / 30;
    } else {
      this.opacity = 1;
    }
    // #endif
  },

  // 调用wx.getUserProfile接口

  data() {
    return {
      banner: ["a.png", "b.png", "c.png", "d.png"],
      category: [
        {
          img: "cv.png",
          name: "简历修改",
          id: "1",
        },
        {
          img: "interview.png",
          name: "模拟面试",
          id: "2",
        },
        {
          img: "qa.png",
          name: "实习内推",
          id: "3",
        },
        {
          img: "house.png",
          name: "实习租房",
          id: "4",
        },
      ],
      recruitInfo: companyInfo.filter((e, i) => {
        return i < 6;
      }),
      pageIndex: 1,
      loadding: false,
      pullUpOn: false,
      opacity: 1,
      showActionSheet: false,
      itemList: [
        {
          text: "登录",
          color: "#ff4906",
        },
      ],
    };
  },

  methods: {
    resumeEdit: function (e) {
      uni.navigateTo({
        url: `/pages/index/servier-select/servier-select?type=${e.currentTarget.dataset.key}`,
      });
    },

    moreDetail: function (e) {
      uni.navigateTo({
        url: `/pages/job/companyDetail/index?id=${e.id}`,
      });
    },

    more: function () {
      uni.switchTab({
        url: "/pages/job/index",
      });
    },
    moreCompany: function () {
      uni.navigateTo({
        url: "/pages/job/companyInfo/index",
      });
    },
    activePage: function () {
      uni.navigateTo({
        url: "/pages/activityPage/schoolRecruitment/index",
      });
    },
    //隐藏组件
    closeActionSheet: function () {
      this.showActionSheet = false;
    },
    //调用此方法显示组件
    openActionSheet: function (type) {
      this.showActionSheet = true;
    },
    itemClick: function (e) {
      let index = e.index;
      this.closeActionSheet();
      if (index === 0) {
        login();
      }
    },
  },
};
</script>

<style lang="less">
page {
  background-color: #f7f7f7;
}

.container {
  padding-bottom: 100rpx;
  color: #333;
}

.tui-header-banner {
  padding-top: 100rpx;
  box-sizing: border-box;
  /* background: #e41f19; */
}

.tui-banner-bg {
  display: flex;
  height: 120rpx;
  /* background-color: #e41f19; */
  position: relative;
}

.tui-banner-box {
  width: 100%;
  padding: 0 10rpx;
  box-sizing: border-box;
  position: absolute;
  /* overflow: hidden; */
  z-index: 99;
  bottom: -80rpx;
  left: 0;
}

.tui-banner-swiper {
  width: 100%;
  height: 300rpx;
  border-radius: 10rpx;
  overflow: hidden;
  transform: translateY(0);
  background-color: #f8f8f8;
}

.tui-slide-image {
  width: 100%;
  height: 300rpx;
  display: block;
}

/* #ifdef MP-WEIXIN */
.tui-banner-swiper .wx-swiper-dot {
  width: 8rpx;
  height: 8rpx;
  display: inline-flex;
  background: none;
  justify-content: space-between;
}

.tui-banner-swiper .wx-swiper-dot::before {
  content: "";
  flex-grow: 1;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 16rpx;
  overflow: hidden;
}

.tui-banner-swiper .wx-swiper-dot-active::before {
  background-color: #fff;
}

.tui-banner-swiper .wx-swiper-dot.wx-swiper-dot-active {
  width: 16rpx;
}

/* #endif */

/* #ifndef MP-WEIXIN */
.tui-banner-swiper .uni-swiper-dot::v-deep {
  width: 8rpx;
  height: 8rpx;
  display: inline-flex;
  background-color: none;
  justify-content: space-between;
}

.tui-banner-swiper .uni-swiper-dot::v-deep::before {
  content: "";
  flex-grow: 1;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 16rpx;
  overflow: hidden;
}

.tui-banner-swiper .uni-swiper-dot-active::v-deep::before {
  background-color: #fff;
}

.tui-banner-swiper .uni-swiper-dot.uni-swiper-dot-active::v-deep {
  width: 16rpx;
}

/* #endif */

.tui-product-category {
  padding: 80rpx 20rpx 30rpx 20rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 24rpx;
  color: #555;
  margin-top: 20rpx;
}

.tui-category-item {
  width: 20%;
  height: 118rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding-top: 30rpx;
}

.tui-category-img {
  height: 80rpx;
  width: 80rpx;
  display: block;
}

.tui-category-name {
  line-height: 24rpx;
}

.tui-block__box {
  width: 100%;
  padding: 0 25rpx 25rpx;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 20rpx;
  overflow: hidden;
}

.tui-product-box {
  box-sizing: border-box;
  border-radius: 5px 5px 0 0;
}
.category-active {
  height: 156rpx;
  position: relative;
  margin-top: 20rpx;
  padding: 0 32rpx;

  .tui-img__coupon {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 20rpx;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  }
  .coupon-contant {
    position: absolute;
    height: 100%;
    top: 0;
    right: 32rpx;
    width: 545rpx;
    display: flex;
    align-items: center;

    &-text {
      padding: 32rpx 0rpx 32rpx 0;
      flex-shrink: 1;
      &-title {
        font-size: 35rpx;
        font-weight: 600;
        color: #434a79;
        line-height: 1.5;
      }
      &-sub {
        font-size: 28rpx;
        font-weight: 400;
        color: #434a79;
        line-height: 1.5;
      }
    }
    &-btn {
      width: 116rpx;
      height: 56rpx;
      background: #eaeaea;
      border-radius: 26rpx;
      text-align: center;
      align-items: center;
      line-height: 56rpx;
      box-shadow: 0 15px 25px -4px rgba(0, 0, 0, 0.5),
        inset 0 -3px 4px -1px rgba(0, 0, 0, 0.2),
        0 -10px 15px -1px rgba(255, 255, 255, 0.6),
        inset 0 3px 4px -1px rgba(255, 255, 255, 0.2),
        inset 0 0 5px 1px rgba(255, 255, 255, 0.8),
        inset 0 20px 30px 0 rgba(255, 255, 255, 0.2);
      font-weight: 500;
    }
  }
}

.tui-bg-white {
  background-color: #fff;
}

.tui-group-name {
  width: 100%;
  font-size: 34rpx;
  line-height: 34rpx;
  font-weight: bold;
  text-align: center;
  padding: 30rpx 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #333;
}

.tui-sub__desc {
  color: #ff4906;
  font-size: 28rpx;
  font-weight: 400;
  padding-left: 25rpx;
}

.tui-color__pink {
  color: #ef1346;
}

.tui-seckill__box {
  display: flex;
  align-items: center;
}

.tui-seckill__img {
  width: 160rpx;
  height: 34rpx;
}
.job-company-detail {
  display: flex;
  align-items: center;
  font-weight: 400;
  color: #999;
  position: absolute;
  right: 6rpx;
  font-size: 24rpx;
  top: 16rpx;
}
.tui-countdown__box {
  width: 228rpx;
  display: flex;
  align-items: center;

  color: #fff;
  background-color: #fff;
  font-weight: 400;
  border: 1rpx solid #eb0909;
  height: 40rpx;
  border-radius: 30px;
  overflow: hidden;
  margin-left: 25rpx;
}

.tui-countdown__title {
  width: 100rpx;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eb0909;
  flex-shrink: 0;
  font-size: 24rpx;
  line-height: 24rpx;
}

.tui-flex__center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

/*秒杀商品*/

.tui-goods__img {
  max-width: 150rpx;
  max-height: 150rpx;
  display: block;
}

/*秒杀商品*/

.tui-more__box {
  display: flex;
  align-items: center;
  font-weight: 400;
  color: #999;
}

.tui-more__box text {
  font-size: 24rpx;
  line-height: 24rpx;
}

.tui-new-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.tui-new-item {
  width: 49%;
  height: 130rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background: #f5f2f9;
  position: relative;
  border-radius: 12rpx;
}

.tui-new-mtop {
  margin-top: 2%;
}

.tui-title-box {
  font-size: 24rpx;
}

.tui-title-contant {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  margin-top: 20rpx;
}
.tui-recru-info-item {
  display: flex;
  justify-content: space-around;
}
.tui-recru-info-text {
  margin-left: 20rpx;
}
.tui-new-job-info {
  height: 80rpx;
  display: flex;
  justify-content: left;
  padding: 20rpx 0;
  border-radius: 10rpx;
}
.tui-new-job-info-box {
  margin-bottom: 50rpx;
  width: 100%;
}
.tui-footer-box {
  display: block;
}
</style>

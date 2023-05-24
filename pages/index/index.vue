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
    <image
      src="/static/images/coupon/banner.png"
      class="tui-img__coupon"
      @tap="coupon"
    ></image>
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
            @tap="detail"
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
    <tui-footer
      :fixed="false"
      copyright="Copyright © 2022-2025 Greenet-TC."
    ></tui-footer>
    <!-- </view> -->
  </view>
</template>
<script>
export default {
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
      recruitInfo: [
        {
          name: "字节跳动",
          logo: "https://uploadfiles.nowcoder.com/images/20220808/330699344_1659946449229/1FC8B2F316140F82B3F02B371E5E6B3A",
          webSite: "https://jobs.toutiao.com/s/k6F397w",
          pushCode: "2E54XY2",
          jobNum: 4,
          state: 1,
          updateDate: "2023-01-16",
        },
        {
          name: "锐捷网络",
          logo: "https://uploadfiles.nowcoder.com/files/20221028/1030035845_1666949017907/%E5%9C%86%E5%BD%A9120x120.png?x-oss-process=image%2Fresize%2Cw_120%2Ch_120%2Cm_fill",
          webSite: "https://www.ruijie.com.cn/campus-recruiting/",
          pushCode: "DScpG3QT",
          state: 1,
          jobNum: 43,
          updateDate: "2023-01-16",
        },
        {
          name: "TCL",
          logo: "http://campus.tcl.com/image/logo1.png",
          webSite: "http://campus.tcl.com/",
          state: 1,
          jobNum: 64,
          pushCode: "wsztcd",
          updateDate: "2023-01-16",
        },
        {
          name: "滴滴",
          jobNum: 54,
          logo: "https://uploadfiles.nowcoder.com/files/20221017/621313650_1666004314939/didi.png?x-oss-process=image%2Fresize%2Cw_120%2Ch_120%2Cm_fill",
          webSite:
            "https://campus.didiglobal.com/campus_apply/didiglobal/6223#/",
          pushCode: "DSCuWZt4",
          state: 14,
          updateDate: "2023-01-16",
        },
        {
          name: "理想汽车",
          logo: "https://uploadfiles.nowcoder.com/files/20220211/127456592_1644572366024/64D3B5811C97FF69FE9F9874DE5BE1F11?x-oss-process=image%2Fresize%2Cw_120%2Ch_120%2Cm_fill",
          webSite:
            "https://li.jobs.feishu.cn/referral/campus/position?token=MzsxNjcyMzkyNDIyMDE1OzcxMTcwNDI0NTEzMTk1Mzc2Njc7MA",
          pushCode: "4JZBW6Q",
          state: 1,
          jobNum: 14,
          updateDate: "2023-01-16",
        },
        {
          name: "京东",
          logo: "https://uploadfiles.nowcoder.com/files/20221009/1030035845_1665311754589/%E5%9C%86%E5%BD%A9120x120.png?x-oss-process=image%2Fresize%2Cw_120%2Ch_120%2Cm_fill",
          webSite: "https://zhaopin.jd.com/home",
          pushCode: "C38L6",
          state: 1,
          jobNum: 40,
          updateDate: "2023-01-16",
        },
      ],
      pageIndex: 1,
      loadding: false,
      pullUpOn: false,
      opacity: 1,
    };
  },
  methods: {
    resumeEdit: function (e) {
      uni.navigateTo({
        url: `/pages/index/servier-select/servier-select?type=${e.currentTarget.dataset.key}`,
      });
    },
    coupon() {
      uni.navigateTo({
        url: "/pages/index/coupon/coupon",
      });
    },

    classify: function () {
      uni.switchTab({
        url: "../classify/classify",
      });
    },
    more: function (e) {
      let key = e.currentTarget.dataset.key || "";
      uni.navigateTo({
        url: "/pages/index/productList/productList?searchKey=" + key,
      });
    },
    search: function () {
      uni.navigateTo({
        url: "/pages/common/search/search",
      });
    },
    seckill(type) {
      let url =
        type == 1
          ? "/pages/index/seckillList/seckillList"
          : "/pages/index/seckillDetail/seckillDetail";
      this.tui.href(url);
    },
    group(type) {
      let url =
        type == 1
          ? "/pages/index/groupList/groupList"
          : "/pages/index/groupDetail/groupDetail";
      this.tui.href(url);
    },
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
  onPageScroll(e) {
    // #ifdef APP-PLUS
    let scrollTop = e.scrollTop;
    if (scrollTop < 0) {
      if (this.opacity > 0) this.opacity = 1 - Math.abs(scrollTop) / 30;
    } else {
      this.opacity = 1;
    }
    // #endif
  }, //设置页面全屏
};
</script>

<style>
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

.tui-img__coupon {
  width: 100%;
  height: 200rpx;
  display: block;
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

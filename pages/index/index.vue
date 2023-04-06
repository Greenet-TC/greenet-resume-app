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
        :data-key="item.name"
        @tap="more"
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
            <text>简历模板</text>
            <text class="tui-sub__desc">大家都在买</text>
          </view>
          <view class="tui-more__box">
            <text>更多</text>
            <tui-icon
              name="arrowright"
              :size="36"
              unit="rpx"
              color="#999"
            ></tui-icon>
          </view>
        </view>
        <view class="tui-new-box">
          <view
            class="tui-new-item"
            :class="[index != 0 && index != 1 ? 'tui-new-mtop' : '']"
            v-for="(item, index) in newProduct"
            :key="index"
            @tap="detail"
          >
            <image
              :src="
                '/static/images/mall/new/' +
                (item.type == 1 ? 'new' : 'discount') +
                '.png'
              "
              class="tui-new-label"
              v-if="item.isLabel"
            ></image>
            <view class="tui-title-box">
              <view class="tui-new-title">{{ item.name }}</view>
              <view class="tui-new-price">
                <text class="tui-new-present">￥{{ item.present }}</text>
                <text class="tui-new-original">￥{{ item.original }}</text>
              </view>
            </view>
            <image
              :src="'/static/images/mall/new/' + item.pic"
              class="tui-new-img"
            ></image>
          </view>
        </view>
      </view>
    </view>

    <!--加载loadding-->
    <tui-loadmore v-if="loadding" :index="1"></tui-loadmore>
    <!-- <tui-nomore v-if="!pullUpOn"></tui-nomore> -->
    <!--加载loadding-->
    <view class="tui-safearea-bottom"></view>
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
        },
        {
          img: "interview.png",
          name: "模拟面试",
        },
        {
          img: "qa.png",
          name: "模拟面试",
        },
        {
          img: "house.png",
          name: "实习内推",
        },
      ],
      newProduct: [
        {
          name: "时尚舒适公主裙高街修身长裙",
          present: 198,
          original: 298,
          pic: "1.jpg",
          type: 1,
          isLabel: true,
        },
        {
          name: "高街修身雪纺衫",
          present: 398,
          original: 598,
          pic: "2.jpg",
          type: 2,
          isLabel: true,
        },
        {
          name: "轻奢商务上衣",
          present: 99,
          original: 199,
          pic: "3.jpg",
          type: 1,
          isLabel: true,
        },
        {
          name: "品质牛皮婚鞋牛皮婚鞋品质就是好",
          present: 99,
          original: 199,
          pic: "5.jpg",
          type: 1,
          isLabel: true,
        },
        {
          name: "轻奢时尚大包限时新品推荐",
          present: 99,
          original: 199,
          pic: "6.jpg",
          type: 1,
          isLabel: false,
        },
        {
          name: "高街修身长裙",
          present: 999,
          original: 1299,
          pic: "4.jpg",
          type: 2,
          isLabel: true,
        },
      ],
      productList: [
        {
          img: 1,
          name: "欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜 30ml（欧莱雅彩妆 BB霜 粉BB 遮瑕疵 隔离）",
          sale: 599,
          factory: 899,
          payNum: 2342,
        },
        {
          img: 2,
          name: "德国DMK进口牛奶  欧德堡（Oldenburger）超高温处理全脂纯牛奶1L*12盒",
          sale: 29,
          factory: 69,
          payNum: 999,
        },
        {
          img: 3,
          name: "【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红",
          sale: 299,
          factory: 699,
          payNum: 666,
        },
        {
          img: 4,
          name: "百雀羚套装女补水保湿护肤品",
          sale: 1599,
          factory: 2899,
          payNum: 236,
        },
        {
          img: 5,
          name: "百草味 肉干肉脯 休闲零食 靖江精制猪肉脯200g/袋",
          sale: 599,
          factory: 899,
          payNum: 2399,
        },
        {
          img: 6,
          name: "短袖睡衣女夏季薄款休闲家居服短裤套装女可爱韩版清新学生两件套 短袖粉色长颈鹿 M码75-95斤",
          sale: 599,
          factory: 899,
          payNum: 2399,
        },
        {
          img: 1,
          name: "欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜",
          sale: 599,
          factory: 899,
          payNum: 2342,
        },
        {
          img: 2,
          name: "德国DMK进口牛奶",
          sale: 29,
          factory: 69,
          payNum: 999,
        },
        {
          img: 3,
          name: "【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红",
          sale: 299,
          factory: 699,
          payNum: 666,
        },
        {
          img: 4,
          name: "百雀羚套装女补水保湿护肤品",
          sale: 1599,
          factory: 2899,
          payNum: 236,
        },
      ],
      pageIndex: 1,
      loadding: false,
      pullUpOn: false,
      opacity: 1,
    };
  },
  methods: {
    detail: function () {
      uni.navigateTo({
        url: "/pages/index/productDetail/productDetail",
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
  color: #34c7a9;
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
.tui-goods__list {
  display: flex;
  align-items: center;
}

.tui-goods__item {
  background-color: #fff;
  width: 150rpx;
  height: 230rpx;
  border-radius: 6rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-shrink: 0;
  margin-right: 18rpx;
}

.tui-goods__imgbox {
  width: 150rpx;
  height: 150rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.tui-goods__img {
  max-width: 150rpx;
  max-height: 150rpx;
  display: block;
}

.tui-pri__box {
  max-width: 150rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tui-sale-pri {
  display: flex;
  align-items: flex-end;
  padding: 10rpx 0 8rpx;
  box-sizing: border-box;
  font-size: 28rpx;
  line-height: 28rpx;
  color: #eb0909;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.tui-size-sm {
  font-size: 24rpx;
  line-height: 24rpx;
  transform: scale(0.8);
  transform-origin: 0 50%;
}

.tui-original__pri {
  font-size: 24rpx;
  line-height: 24rpx;
  color: #999999;
  transform-origin: center 10%;
  transform: scale(0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: line-through;
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
  height: 180rpx;
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

.tui-new-title {
  font-size: 26rpx;
  line-height: 32rpx;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.tui-new-price {
  padding-top: 18rpx;
}

.tui-new-present {
  color: #ff201f;
  font-weight: bold;
}

.tui-new-original {
  display: inline-block;
  color: #a0a0a0;
  text-decoration: line-through;
  padding-left: 12rpx;
  transform: scale(0.8);
  transform-origin: center center;
}

.tui-new-img {
  width: 148rpx;
  height: 148rpx;
  display: block;
  flex-shrink: 0;
}

.tui-new-label {
  width: 56rpx;
  height: 56rpx;
  border-top-left-radius: 12rpx;
  position: absolute;
  left: 0;
  top: 0;
}

.tui-title__img {
  width: 100%;
  padding: 30rpx 0;
  display: flex;
  justify-content: center;
}

.tui-title__img image {
  width: 352rpx;
  height: 32rpx;
}

.tui-product-list {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  /* padding-top: 20rpx; */
}

.tui-product-container {
  flex: 1;
  margin-right: 2%;
}

.tui-product-container:last-child {
  margin-right: 0;
}

.tui-pro-item {
  width: 100%;
  margin-bottom: 4%;
  background: #fff;
  box-sizing: border-box;
  border-radius: 12rpx;
  overflow: hidden;
}

.tui-pro-img {
  width: 100%;
  display: block;
}

.tui-pro-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 20rpx;
}

.tui-pro-tit {
  color: #2e2e2e;
  font-size: 26rpx;
  line-height: 32rpx;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.tui-pro-price {
  padding-top: 18rpx;
}

.tui-sale-price {
  font-size: 34rpx;
  font-weight: 500;
  color: #e41f19;
}

.tui-factory-price {
  font-size: 24rpx;
  color: #a0a0a0;
  text-decoration: line-through;
  padding-left: 12rpx;
}

.tui-pro-pay {
  padding-top: 10rpx;
  font-size: 24rpx;
  color: #656565;
}
.tui-title-contant {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  margin-top: 20rpx;
}
</style>

<template>
  <view class="container">
    <view class="tui-order-header" @tap="switchStatus">
      <!-- <image :src="webURL+'img_detail_bg.png'" mode="widthFix" class="tui-img-bg"></image> -->
      <view class="tui-header-content">
        <view>
          <view class="tui-status-text">{{ getStatusText(status) }}</view>
          <view class="tui-reason"
            ><text class="tui-reason-text">{{ getReason(status) }}</text>
            <tui-countdown
              :time="1800"
              color="rgba(254,254,254,0.75)"
              colonColor="rgba(254,254,254,0.75)"
              borderColor="transparent"
              backgroundColor="transparent"
              v-if="status === 1"
            ></tui-countdown>
          </view>
        </view>
        <image
          :src="getImg(status)"
          class="tui-status-img"
          mode="widthFix"
        ></image>
      </view>
    </view>

    <view class="tui-order-item">
      <tui-list-cell :hover="false" :lineLeft="false">
        <view class="tui-order-title"> 已选订单 </view>
      </tui-list-cell>
      <block v-for="(item, index) in serviceType" :key="index">
        <tui-list-cell padding="0">
          <view class="tui-goods-item">
            <!-- <image
              :src="`/static/images/mall/product/${index + 3}.jpg`"
              class="tui-goods-img"
            ></image> -->
            <view class="tui-goods-center">
              <view class="tui-goods-name">{{ item.h6 }}</view>

              <view class="tui-goods-attr">{{ item.desc }}</view>
            </view>
            <view class="tui-price-right">
              <view>￥{{ item.num }}.00</view>
              <view>x1</view>
            </view>
          </view>
        </tui-list-cell>
      </block>
      <view class="tui-goods-info">
        <view class="tui-price-flex tui-size24">
          <view>商品总额</view>
          <view>￥{{ getCount() }}.00</view>
        </view>
        <view class="tui-price-flex tui-size24">
          <view>优惠券</view>
          <view>￥0.00</view>
        </view>
        <view class="tui-price-flex tui-size24">
          <view>其他费用</view>
          <view>￥0.00</view>
        </view>
        <view class="tui-price-flex tui-size32 tui-pbtm20">
          <view class="tui-flex-shrink">合计</view>
          <view class="tui-goods-price">
            <view class="tui-size-24">￥</view>
            <view class="tui-price-large">{{ getCount() }}</view>
            <view class="tui-size-24">.00</view>
          </view>
        </view>
        <view class="tui-price-flex tui-size32">
          <view class="tui-flex-shrink">实付款</view>
          <view class="tui-goods-price tui-primary-color">
            <view class="tui-size-24">￥</view>
            <view class="tui-price-large">{{ getCount() }}</view>
            <view class="tui-size-24">.00</view>
          </view>
        </view>
      </view>
    </view>

    <view class="tui-order-info">
      <tui-list-cell :hover="false">
        <view class="tui-order-title"> 基础信息 </view>
      </tui-list-cell>
      <view class="tui-order-content">
        <view class="tui-order-flex">
          <view class="tui-item-title">姓名:</view>
          <view class="tui-item-content">48690010100035</view>
        </view>
        <view class="tui-order-flex">
          <view class="tui-item-title">电话:</view>
          <view class="tui-item-content">33655511251265578556</view>
        </view>
        <view class="tui-order-flex">
          <view class="tui-item-title">性别:</view>
          <view class="tui-item-content">2019-05-26 10:36</view>
        </view>
        <view class="tui-order-flex">
          <view class="tui-item-title">学校:</view>
          <view class="tui-item-content">2019-05-26 10:44</view>
        </view>
        <view class="tui-order-flex">
          <view class="tui-item-title">年级:</view>
          <view class="tui-item-content">2019-05-27 10:20</view>
        </view>
        <view class="tui-order-flex">
          <view class="tui-item-title">专业:</view>
          <view class="tui-item-content">包邮</view>
        </view>
      </view>
    </view>
    <view class="tui-order-info">
      <tui-list-cell :hover="false">
        <view class="tui-order-title"> 服务信息 </view>
      </tui-list-cell>
      <view class="tui-order-content">
        <view class="tui-order-flex">
          <view class="tui-item-title">最高学历:</view>
          <view class="tui-item-content">48690010100035</view>
        </view>
        <view class="tui-order-flex">
          <view class="tui-item-title">目标行业:</view>
          <view class="tui-item-content">33655511251265578556</view>
        </view>
        <view class="tui-order-flex">
          <view class="tui-item-title">是否留学:</view>
          <view class="tui-item-content">2019-05-26 10:36</view>
        </view>
        <view class="tui-order-flex">
          <view class="tui-item-title">简历语言:</view>
          <view class="tui-item-content">2019-05-26 10:44</view>
        </view>
        <view class="tui-order-flex">
          <view class="tui-item-title">求职经验:</view>
          <view class="tui-item-content">2019-05-27 10:20</view>
        </view>
      </view>
    </view>
    <view class="tui-order-info">
      <tui-list-cell :hover="false">
        <view class="tui-order-title"> 订单信息 </view>
      </tui-list-cell>
      <view class="tui-order-content">
        <view class="tui-order-flex">
          <view class="tui-item-title">订单号:</view>
          <view class="tui-item-content">48690010100035</view>
        </view>

        <view class="tui-order-flex">
          <view class="tui-item-title">创建时间:</view>
          <view class="tui-item-content">2019-05-26 10:36</view>
        </view>
        <view class="tui-order-flex">
          <view class="tui-item-title">付款时间:</view>
          <view class="tui-item-content">2019-05-26 10:44</view>
        </view>

        <view class="tui-order-flex">
          <view class="tui-item-title">订单备注:</view>
          <view class="tui-item-content"
            >提交订单后，会有工作人员和您联系，请保持电话畅通，同时谨防电信诈骗</view
          >
        </view>
      </view>
      <tui-list-view unlined="bottom">
        <tui-list-cell unlined>
          <view class="tui-contact">
            <image
              src="https://thorui.cn/images/mall/group/icon_order_contactmerchant.png"
            ></image>
            <text>联系商家</text>
          </view>
        </tui-list-cell>
      </tui-list-view>
    </view>
    <view class="tui-safe-area"></view>
    <view class="tui-tabbar tui-order-btn">
      <!-- <view class="tui-btn-mr">
				<tui-button type="black" :plain="true" width="152rpx" height="56rpx" :size="26" shape="circle">删除订单</tui-button>
			</view> -->
      <view class="tui-btn-mr">
        <tui-button
          type="black"
          :plain="true"
          width="152rpx"
          height="56rpx"
          :size="26"
          shape="circle"
          @click="refund"
          >申请售后</tui-button
        >
      </view>
      <view class="tui-btn-mr">
        <tui-button
          type="danger"
          :plain="true"
          width="152rpx"
          height="56rpx"
          :size="26"
          shape="circle"
          @click="btnPay"
          >立即支付</tui-button
        >
      </view>
    </view>
    <t-pay-way :show="show" @close="popupClose"></t-pay-way>
  </view>
</template>

<script>
import tPayWay from "@/components/views/t-pay-way/t-pay-way";
import { serviceType } from "@/common/contant";

export default {
  components: {
    tPayWay,
  },
  // 我的页面
  onLoad() {
    this.orderTyppe = uni.getStorageSync("orderTyppe");
    this.serviceType = serviceType[0].serviceContent.filter((i) => {
      return this.orderTyppe.includes(i.orderType);
    });
  },

  data() {
    return {
      webURL: "https://www.thorui.cn/wx/static/images/mall/order/",
      //1-待付款 2-付款成功 3-待收货 4-订单已完成 5-交易关闭
      status: 1,
      show: false,
      orderTyppe: ["1"],
      serviceType: [],
    };
  },
  methods: {
    getImg: function (status) {
      return (
        this.webURL +
        [
          "img_order_payment3x.png",
          "img_order_send3x.png",
          "img_order_received3x.png",
          "img_order_signed3x.png",
          "img_order_closed3x.png",
        ][status - 1]
      );
    },
    getStatusText: function (status) {
      return [
        "等待您付款",
        "付款成功",
        "等待服务",
        "订单进行中",
        "订单结束",
        "订单关闭",
      ][status - 1];
    },
    getReason: function (status) {
      return [
        "剩余时间",
        "等待服务中",
        "小助手将马上联系您",
        "我们追求卓越的服务质量",
        "本次服务已结束，有任何问题可以向小助手反馈",
        "超时未付款，订单自动取消",
      ][status - 1];
    },
    switchStatus() {
      let status = this.status + 1;
      this.status = status > 5 ? 1 : status;
      this.tui.toast("状态切换成功");
    },
    getCount() {
      return uni.getStorageSync("orderCount");
    },
    logistics() {
      this.tui.href("/pages/my/logistics/logistics");
    },
    btnPay() {
      this.show = true;
    },
    popupClose() {
      this.show = false;
    },
    refund() {
      this.tui.href("/pages/my/refund/refund");
    },
  },
};
</script>

<style>
.container {
  padding-bottom: 118rpx;
}

.tui-order-header {
  width: 100%;
  height: 160rpx;
  position: relative;
  background-color: #eb0909;
}

.tui-img-bg {
  width: 100%;
  height: 160rpx;
}

.tui-header-content {
  width: 100%;
  height: 160rpx;
  position: absolute;
  z-index: 10;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 70rpx;
  box-sizing: border-box;
}

.tui-status-text {
  font-size: 34rpx;
  line-height: 34rpx;
  color: #fefefe;
}

.tui-reason {
  font-size: 24rpx;
  line-height: 24rpx;
  color: rgba(254, 254, 254, 0.75);
  padding-top: 15rpx;
  display: flex;
  align-items: center;
}

.tui-reason-text {
  padding-right: 12rpx;
}

.tui-status-img {
  width: 80rpx;
  height: 80rpx;
  display: block;
}

.tui-flex-box {
  width: 100%;
  display: flex;
  align-items: center;
}

.tui-icon-img {
  width: 44rpx;
  height: 44rpx;
  flex-shrink: 0;
}

.tui-logistics {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 24rpx 0 20rpx;
  box-sizing: border-box;
}

.tui-logistics-text {
  font-size: 26rpx;
  line-height: 32rpx;
}

.tui-logistics-time {
  font-size: 24rpx;
  line-height: 24rpx;
  padding-top: 16rpx;
  color: #666;
}

.tui-addr {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20rpx;
  box-sizing: border-box;
}

.tui-addr-userinfo {
  font-size: 30rpx;
  line-height: 30rpx;
  font-weight: bold;
}

.tui-addr-text {
  font-size: 24rpx;
  line-height: 32rpx;
  padding-top: 16rpx;
}

.tui-addr-tel {
  padding-left: 40rpx;
}

.tui-order-item {
  margin-top: 20rpx;
  border-radius: 10rpx;
  overflow: hidden;
}

.tui-goods-title {
  width: 100%;
  font-size: 28rpx;
  line-height: 28rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tui-goods-item {
  width: 100%;
  padding: 20rpx 30rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}

.tui-goods-img {
  width: 180rpx;
  height: 180rpx;
  display: block;
  flex-shrink: 0;
}

.tui-goods-center {
  flex: 1;
  padding: 20rpx 8rpx;
  box-sizing: border-box;
}

.tui-goods-name {
  font-size: 30rpx;
  font-weight: 500;
  color: #404040;
  line-height: 44rpx;
  max-width: 310rpx;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 32rpx;
}

.tui-goods-attr {
  font-size: 22rpx;
  color: #888888;
  line-height: 32rpx;
  padding-top: 20rpx;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.tui-price-right {
  text-align: right;
  font-size: 24rpx;
  color: #888888;
  line-height: 30rpx;
  padding-top: 20rpx;
}

.tui-color-red {
  color: #e41f19;
  padding-right: 30rpx;
}

.tui-goods-price {
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  font-size: 24rpx;
}

.tui-size-24 {
  font-size: 24rpx;
  line-height: 24rpx;
}

.tui-price-large {
  font-size: 32rpx;
  line-height: 30rpx;
}

.tui-goods-info {
  width: 100%;
  padding: 30rpx;
  box-sizing: border-box;
  background: #fff;
}

.tui-price-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tui-size24 {
  padding-bottom: 20rpx;
  font-size: 24rpx;
  line-height: 24rpx;
  color: #888;
}

.tui-size32 {
  font-size: 32rpx;
  line-height: 32rpx;
  font-weight: 500;
}

.tui-pbtm20 {
  padding-bottom: 20rpx;
}

.tui-flex-shrink {
  flex-shrink: 0;
}

.tui-primary-color {
  color: #eb0909;
}

.tui-order-info {
  margin-top: 20rpx;
}

.tui-order-title {
  position: relative;
  font-size: 28rpx;
  line-height: 28rpx;
  padding-left: 12rpx;
  box-sizing: border-box;
}

.tui-order-title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  border-left: 4rpx solid #eb0909;
  height: 100%;
}

.tui-order-content {
  width: 100%;
  padding: 24rpx 30rpx;
  box-sizing: border-box;
  background: #fff;
  font-size: 24rpx;
  line-height: 30rpx;
}

.tui-order-flex {
  display: flex;
  padding-top: 18rpx;
}

.tui-order-flex:first-child {
  padding-top: 0;
}

.tui-item-title {
  width: 132rpx;
  flex-shrink: 0;
}

.tui-item-content {
  color: #666;
  line-height: 32rpx;
}

.tui-safe-area {
  height: 1rpx;
  padding-bottom: env(safe-area-inset-bottom);
}

.tui-tabbar {
  width: 100%;
  height: 98rpx;
  background: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 26rpx;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 996;
}

.tui-btn-mr {
  margin-right: 30rpx;
}
.tui-contact {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
}
.tui-contact image {
  width: 36rpx;
  height: 36rpx;
  margin-right: 16rpx;
}
</style>

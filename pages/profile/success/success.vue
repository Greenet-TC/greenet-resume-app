<template>
  <view class="container">
    <view class="tui-bg"></view>
    <view class="tui-content">
      <view class="tui-form">
        <image
          src="https://youjia.sx.cn/static/media/success.3a12209d.svg"
          class="tui-icon"
        ></image>
        <view class="tui-title">订单已支付成功</view>
        <view class="tui-sub-title">恭喜解锁会员福利，赶快领取吧！</view>
        <image
          :src="webURLBase+`/vip/IMG_0001%203.jpg`"
          class="tui-Qr-code"
        ></image>
        <view class="tui-btn-box">
          <tui-button
            type="danger"
            width="240rpx"
            height="70rpx"
            :size="28"
            plain
            shape="circle"
            @click="go(1)"
            >返回首页</tui-button
          >
          <tui-button
            type="danger"
            shadow
            width="240rpx"
            height="70rpx"
            :size="28"
            shape="circle"
            @click="go(2)"
            >查看订单</tui-button
          >
        </view>
      </view>
    </view>
    <view class="tui-tips">
      <view class="tui-grey">温馨提示:</view>
      <view class="tui-light-grey">
        付款成功后，优加实习不会以付款异常、卡单、系统升级为由联系您。请勿泄露银行卡号、手机验证码，否则会造成钱款损失！谨防电话诈骗！
      </view>
    </view>
  </view>
</template>

<script>
import { WEBURL } from "@/common/utils";

export default {
  data() {
    return {
      webURLBase: WEBURL,
    };
  },
  methods: {
    go(page) {
      if (page == 1) {
        uni.switchTab({
          url: "/pages/index/index",
        });
      } else {
        this.tui.href("/pages/my/myOrder/myOrder");
      }
    },
  },
};
</script>

<style>
.tui-bg {
  width: 100%;
  height: 360rpx;
  background: linear-gradient(180deg, #ecfafa, #f8f8f8);
  border-bottom-left-radius: 30rpx;
}

.tui-content {
  padding: 0 35rpx;
  box-sizing: border-box;
}

.tui-form {
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  height: 600rpx;
  /* box-shadow: 0 10rpx 14rpx 0 rgba(0, 0, 0, 0.08); */
  border-radius: 10rpx;
  margin-top: -295rpx;
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.tui-icon {
  width: 50rpx;
  height: 50rpx;
  display: block;
  margin-top: 30rpx;
}
.tui-Qr-code{
    width: 250rpx;
  height: 250rpx;
  display: block;
  margin-top: 30rpx;
}
.tui-title {
  font-size: 32rpx;
  line-height: 32rpx;
  padding-top: 20rpx;
}

.tui-sub-title {
  color: #9c9c9c70;
  font-size: 20rpx;
  line-height: 20rpx;
  padding-top: 20rpx;
}

.tui-btn-box {
  width: 580rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 30rpx;
}

.tui-tips {
  font-size: 26rpx;
  padding: 48rpx 90rpx;
  box-sizing: border-box;
  text-align: justify;
  line-height: 48rpx;
}

.tui-grey {
  color: #555;
  padding-bottom: 8rpx;
}

.tui-light-grey {
  color: #888;
  line-height: 40rpx;
}
</style>

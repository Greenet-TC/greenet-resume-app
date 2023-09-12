<template>
  <view>
    <tui-bottom-popup :show="show" @close="close">
      <tui-list-cell :hover="false">
        <view class="tui-pay-item__title">
          <view>请选择支付方式</view>
          <view
            >支付金额：<text class="tui-pay-amuont">￥{{ fee }}.00</text></view
          >
        </view>
      </tui-list-cell>
      <radio-group @change="change">
        <tui-list-cell unlined :hover="false">
          <label class="tui-pay-item">
            <image
              :src="webURLBase + `/vip/icon_pay_balance.png`"
              class="tui-pay-logo"
            ></image>
            <text>余额支付（余额0，余额不足）</text>
            <view class="tui-radio" v-if="false">
              <radio color="#EB0909" name="pay"></radio>
            </view>
            <view class="tui-recharge">去充值</view>
          </label>
        </tui-list-cell>
        <tui-list-cell unlined>
          <label class="tui-pay-item">
            <image
              :src="webURLBase + `/vip/icon_pay_weixin.png`"
              class="tui-pay-logo"
            ></image>
            <text>微信支付</text>
            <view class="tui-radio">
              <radio color="#EB0909" name="pay" checked></radio>
            </view>
          </label>
        </tui-list-cell>
        <tui-list-cell unlined>
          <label class="tui-pay-item">
            <image
              :src="webURLBase + `/vip/icon_pay_zhifubao.png`"
              class="tui-pay-logo"
            ></image>
            <text>支付宝支付</text>
            <view class="tui-radio">
              <radio color="#EB0909" name="pay" disabled></radio>
            </view>
          </label>
        </tui-list-cell>
      </radio-group>
      <view class="tui-btn-pay">
        <tui-button
          height="88rpx"
          type="danger"
          shape="circle"
          shadow
          @click="btnPay(activeId)"
          >去付款</tui-button
        >
      </view>
    </tui-bottom-popup>
  </view>
</template>

<script>
import { memberShipData } from "@/common/contant";
import { getlogin } from "@/common/login";
import { WechatPayControllerCreateWeChatJsApiPOST } from "@/common/apis/wei-xin-pay-controller";
import { WEBURL } from "@/common/utils";

export default {
  name: "tPayWay",
  emits: ["close"],
  props: {
    //控制显示
    show: {
      type: Boolean,
      default: false,
    },
    fee: {
      type: Number,
      default: 0,
    },
    activeId: {
      type: Number,
      default: 1,
    },
    page: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return { memberShipData, webURLBase: WEBURL };
  },
  methods: {
    close() {
      this.$emit("close", {});
    },
    async btnPay(activeId) {
      const { code } = await getlogin();
      const param = {
        total_fee: this.memberShipData.filter((item) => item.id === activeId)[0]
          .fee,
        body: this.memberShipData.filter((item) => item.id === activeId)[0]
          .title,
        vipType: activeId,
        code,
      };
      const res = await WechatPayControllerCreateWeChatJsApiPOST(param);

      console.log(11111, res);

      if (res) {
        uni.requestPayment({
          provider: "wxpay", //支付类型-固定值
          appId: res.data.appId,
          total_fee: param.total_fee,
          timeStamp: res.data.timeStamp, // 时间戳（单位：秒）
          nonceStr: res.data.nonceStr, // 随机字符串
          package: res.data.prepay_id, // 固定值
          signType: "MD5", //固定值
          paySign: res.data.sign, //签名
          success: function (res) {
            console.log("success:" + JSON.stringify(res));
            uni.showToast({
              title: "支付成功",
            });
            console.log("支付成功");
          },
          fail: function (err) {
            console.log("fail:" + JSON.stringify(err));
            console.log("支付失败");
            uni.showToast({
              title: "支付失败",
              icon: "error",
            });
          },
        });
      }
      // console.log("WechatPayControllerCreateWeChatJsApiPOST", data);
      // this.close();
      // this.tui.href("/pages/template/mall/success/success");
    },
    change(e) {
      console.log(e);
    },
  },
};
</script>

<style scoped>
.tui-pay-item__title {
  width: 100%;
  height: 90rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20rpx;
  box-sizing: border-box;
  font-size: 28rpx;
}

.tui-pay-amuont {
  color: #eb0909;
  font-weight: 500;
  font-size: 34rpx;
}

.tui-pay-item {
  width: 100%;
  height: 80rpx;
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  box-sizing: border-box;
  font-size: 28rpx;
}

.tui-pay-logo {
  width: 48rpx;
  height: 48rpx;
  margin-right: 15rpx;
}

.tui-radio {
  margin-left: auto;
  transform: scale(0.8);
  transform-origin: 100% center;
}

.tui-btn-pay {
  width: 100%;
  padding: 68rpx 60rpx 50rpx;
  box-sizing: border-box;
}
.tui-btn-danger.data-v-2af5f154 {
  background: -webkit-linear-gradient(
    135deg,
    #ffdead,
    #ffbd7f 21%,
    #fff9d7 53%,
    #ffebba
  );
  background: linear-gradient(
    315deg,
    #ffdead,
    #ffbd7f 21%,
    #fff9d7 53%,
    #ffebba
  );
}
.tui-recharge {
  color: #fc872d;
  margin-left: auto;
  padding: 12rpx 0;
}
</style>

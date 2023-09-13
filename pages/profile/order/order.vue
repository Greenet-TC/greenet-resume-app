<!--
 * @Author: maxueming maxueming@kuaishou.com
 * @Date: 2023-09-13 10:26:21
 * @LastEditors: maxueming maxueming@kuaishou.com
 * @LastEditTime: 2023-09-13 12:31:50
 * @FilePath: /greenet-resume-app/pages/profile/order/order.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE#
-->
<template>
  <view class="order" v-if="!!orderList.length">
    <view class="order-item">
      <view class="order-item-top">
        <view class="order-item-title">支付记录</view>
      </view>
      <view v-for="(item, index) in orderList" :key="index" class="pay-order">
        <view class="pay-order-text">
          {{ dayjs(item.startTime).format("YYYY/MM/DD") }}{{ " " + "成功" }}
        </view>
        <view class="pay-order-bill">
          {{ ` ${getOrderInfo(memberShipData, item.vipType).title} `
          }}{{
            "      " +
            ` ${getOrderInfo(memberShipData, item.vipType).fee}.00元 `
          }}
        </view>
      </view>
    </view>
  </view>
  <view v-else>
    <tui-no-data
      imgUrl="/static/images/toast/img_noorder_3x.png"
      btnText="去看看"
      @click="go"
    >
      <text class="tui-color__black">您还没有任何订单~</text>
      <!--如果需要自定义按钮，可在插槽中自定义，不使用默认按钮-->
    </tui-no-data></view
  >
</template>

<script>
import store from "@/store/index.ts";
import dayjs from "dayjs";
import { memberShipData } from "@/common/contant";

export default {
  onLoad() {
    console.log(1, JSON.parse(store.state.queryAccount.history));
  },
  data() {
    return { memberShipData, dayjs };
  },
  computed: {
    orderList() {
      return JSON.parse(store.state.queryAccount.history);
    },
  },
  methods: {
    getOrderInfo(arr, viptype) {
      return arr.filter((i) => {
        return i.id === viptype;
      })[0];
    },
  },
};
</script>

<style lang="less">
.order {
  background: #f6f7f8;
  width: 100%;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  &-item {
    background: #ffffff;
    // width: calc(100%-38px);
    border-radius: 8px;
    padding: 16px 16px 0 16px;
    margin: 16px 19px;
    &-top {
      display: flex;
      justify-content: space-between;
    }
    &-title {
      font-size: 17px;
      font-weight: 500;
      line-height: 24px;
      height: 24px;
    }
    .pay-order {
      height: 56px;
      line-height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &-text {
        font-family: PingFang SC;
        font-size: 15px;
        font-weight: 400;
        color: #222222;
      }
      &-bill {
        font-size: 15px;
        font-weight: 400;
        color: #9c9c9c;
        display: flex;
        align-items: center;
        justify-content: space-between;
        > img {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
}
</style>

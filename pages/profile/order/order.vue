<!--
 * @Author: maxueming maxueming@kuaishou.com
 * @Date: 2023-09-13 10:26:21
 * @LastEditors: maxueming maxueming@kuaishou.com
 * @LastEditTime: 2023-09-13 17:25:30
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
          {{ dayjs(item.createTime).format("YYYY/MM/DD")
          }}{{ " " + getOrderStatus(item.orderStatus) }}
        </view>
        <view class="pay-order-bill">
          {{ ` ${getOrderInfo(memberShipData, Number(item?.attach)).title} `
          }}{{
            "      " +
            ` ${getOrderInfo(memberShipData, Number(item?.attach)).fee}元 `
          }}
        </view>
      </view>
    </view>
    <!--加载loadding-->
    <tui-loadmore v-if="loadding" :index="3" type="red"></tui-loadmore>
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
import dayjs from "dayjs";
import { memberShipData, orderStatus } from "@/common/contant";
import { WechatPayControllerQueryAllOrdersGET } from "@/common/apis/wei-xin-pay-controller";

export default {
  async onLoad() {
    const data = await WechatPayControllerQueryAllOrdersGET({
      pageNum: this.pageIndex * this.pageSize,
      pageSize: this.pageSize,
    });
    if (data.data.list.length < this.pageSize) {
      this.pullUpOn = false;
    }
    this.pageIndex = this.pageIndex + 1;
    this.orderList = data.data.list;
  },
  data() {
    return {
      memberShipData,
      dayjs,
      orderList: [],
      pageIndex: 0,
      loadding: false,
      pageSize: 20,
      pullUpOn: true,
    };
  },

  methods: {
    getOrderInfo(arr, viptype) {
      return arr.filter((i) => {
        return i.id === viptype;
      })[0];
    },
    go() {
      uni.switchTab({
        url: "/pages/index/index",
      });
    },
    getOrderStatus(status) {
      switch (status) {
        case orderStatus.NOPAY:
          return "未支付";
        case orderStatus.SUCCESS:
          return "支付成功";
        case orderStatus.FAIL:
          return "支付失败";
      }
    },
  },
  onReachBottom: async function () {
    if (!this.pullUpOn) return;
    this.loadding = true;
    const data = await WechatPayControllerQueryAllOrdersGET({
      pageNum: this.pageIndex * this.pageSize,
      pageSize: this.pageSize,
    });
    if (data.data.list.length < this.pageSize) {
      this.loadding = false;
      this.pullUpOn = false;
    } else {
      let loadData = data.data.list;
      this.orderList = this.orderList.concat(loadData);
      this.pageIndex = this.pageIndex + 1;
      this.loadding = false;
    }
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

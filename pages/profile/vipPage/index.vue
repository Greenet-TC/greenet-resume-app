<template>
  <view>
    <tui-navigation-bar
      dropDownHide
      splitLine
      @init="initNavigation"
      @change="opacityChange"
      :scrollTop="scrollTop"
      title="个人中心"
      backgroundColor="#ffffff"
      color="#333"
    >
      <view class="tui-header-box" :style="{ marginTop: top + 'px' }">
        <!-- #ifndef MP -->
        <view class="tui-header-icon">
          <view class="tui-icon-box tui-icon-message" @tap="href(7)">
            <tui-icon
              name="message"
              :color="opacity > 0.8 ? '#333' : '#fff'"
              :size="26"
            ></tui-icon>
            <view
              v-if="getLoginStatus"
              class="tui-badge"
              :class="[opacity > 0.8 ? 'tui-badge-red' : 'tui-badge-white']"
              >1</view
            >
          </view>
          <view class="tui-icon-box tui-icon-setup" @tap="href(2)">
            <tui-icon
              name="setup"
              :color="opacity > 0.8 ? '#333' : '#fff'"
              :size="26"
            ></tui-icon>
          </view>
        </view>
        <!-- #endif -->
      </view>
    </tui-navigation-bar>
    <view class="vip-center">
      <image
        :src="webURLBase + `/profile/vip-card-bg.png`"
        class="vip-card-bg"
      ></image>
      <view class="vip-center-top">
        <view class="header-profile-top">
          <view class="self-info-name">
            <image
              :src="
                baseInfo?.avatar
                  ? baseInfo?.avatar
                  : baseInfo?.sex === 1
                  ? webURLBase + `/profile/man.png`
                  : webURLBase + `/profile/woman.png`
              "
              class="tui-avatar"
              @tap="href(3)"
            ></image>
            <view class="name-desc">
              <view class="name">
                <view class="name-link">
                  {{ baseInfo?.username ?? "优加DA-0000用户" }}
                </view>

                <image
                  alt="1"
                  :src="webURLBase + `/profile/icon-1.png`"
                  class="name-img"
                />
              </view>
              <view class="identify">
                <view class="hove-to-green"> 优加会员·轻松斩OFFER </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="vip-items">
      <view class="vip-card">
        <view class="vip-text-label">
          <view
            :class="!!queryAccount?.vipType ? 'yj-vip-text vip' : 'yj-vip-text'"
          >
            优加会员
          </view>
          <image
            :src="
              !!queryAccount?.vipType
                ? webURLBase + `/vip/vip-icon.png`
                : webURLBase + `/profile/pre-vip.png`
            "
            class="vip-label-pic"
            alt="1"
          ></image>
        </view>
        <view class="yj-vip-desc">
          <view class="yj-vip-desc">
            {{
              !!queryAccount?.vipType
                ? `会员到期时间：${queryAccount?.endTime}`
                : "实习路上优加为您保驾护航"
            }}
          </view>
        </view>
        <view class="open-vip-btn" @tap="openVipService">
          <view class="open-vip-btn-text">
            {{ !!queryAccount?.vipType ? "立即续费" : "立即开通" }}
          </view>
        </view>
      </view>
      <view class="vip-contant">
        <scroll-view scroll-x>
          <view class="vip-contant-top">
            <view
              :class="
                activeId === vip.id
                  ? 'vip-contant-top-item active'
                  : 'vip-contant-top-item '
              "
              v-for="vip in memberShipData"
              :key="vip.id"
              @tap="choiceVipType(vip.id)"
            >
              <view
                class="vip-contant-top-item-tip"
                v-if="vip.id === 1 || vip.id === 4"
                >{{ vip.id === 1 ? "超值推荐" : "" }}
                {{ vip.id === 4 ? "超高性价比" : "" }}
              </view>
              <view class="vip-contant-top-item-title">{{ vip.title }} </view>
              <view
                :class="
                  activeId === vip.id
                    ? 'vip-contant-top-item-fee active'
                    : 'vip-contant-top-item-fee'
                "
                ><span class="fee-sign">¥</span>{{ vip.fee }}
              </view>
              <view class="vip-contant-top-item-prefee"
                >¥ {{ vip.preFee }}
              </view>
              <view
                :class="
                  activeId === vip.id
                    ? 'vip-contant-top-item-bottom active'
                    : 'vip-contant-top-item-bottom'
                "
                >{{
                  vip.id === 1 || vip.id === 4
                    ? `立省${vip.preFee - vip.fee}元`
                    : `仅需${(vip.fee / (vip.id === 2 ? 30 : 365)).toFixed(
                        2
                      )}元/天`
                }}

                <!-- 立省{{ vip.preFee - vip.fee }}元 -->
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
      <view class="vip-coupon">
        <view class="vip-coupon-left"> 优惠券</view>
        <view class="vip-coupon-right"
          >兑换优惠券
          <tui-icon name="arrowright" :size="24" color="#9c9c9c"></tui-icon
        ></view>

        <!-- <swiper
          :indicator-dots="true"
          :autoplay="true"
          :interval="5000"
          :duration="150"
          class="vip-coupon-swiper"
          :circular="true"
          indicator-color="rgba(255, 255, 255, 0.8)"
          indicator-active-color="#fff"
        >
          <swiper-item
            v-for="(item, index) in [1, 2]"
            :key="index"
            @tap.stop="detail"
          >
            <image
              :src="webURLBase + `/vip/coupon-${item}.png`"
              class="vip-coupon-swiper-image"
              mode="scaleToFill"
            />
          </swiper-item>
        </swiper> -->
      </view>
      <tui-divider width="90%" height="50"></tui-divider>
      <view class="vip-price">
        <view class="vip-price-item">
          <view class="vip-price-item-left">会员原价</view>
          <view class="vip-price-item-right"
            >{{ getActiveItem(activeId).fee }}.00</view
          >
        </view>
        <view class="vip-price-item" :style="{ marginTop: '10px' }">
          <view class="vip-price-item-left">优惠券</view>
          <view class="vip-price-item-right">- ¥ {{ 0 }}.00</view>
        </view>
      </view>
      <tui-divider width="90%" height="50"></tui-divider>
      <view class="vip-paid">
        <view class="vip-paid-text">实付金额：</view>
        <view class="vip-paid-num">¥ {{ getActiveItem(activeId).fee }}.00</view>
      </view>
      <view class="vip-protocol">
        <tui-radio
          :checked="true"
          :value="1"
          color="#fa4e3e"
          borderColor="#ffffff"
        >
        </tui-radio>
        <text class="tui-text">同意《优加实习会员服务协议》及 </text>
        <text :style="{ color: '#fa4e3e' }" class="tui-text" @tap="privacyAgree"
          >《隐私协议》
        </text>
      </view>
      <view class="vip-rights">
        <view class="vip-rights-title">会员权益</view>
        <view class="vip-rights-list">
          <view
            class="vip-rights-list-item"
            v-for="item in getActiveItem(activeId).content"
            :key="item.index"
            :style="{
              opacity: item.index > setOpcityValue(activeId) ? 0.4 : 1,
            }"
          >
            <view class="vip-rights-list-item-icon">
              <image
                :src="webURLBase + `/vip/${item.index}.png`"
                class="img"
              ></image>
            </view>
            <view class="vip-rights-list-item-text">{{ item.text }} </view>
            <view class="vip-rights-list-item-sub">{{ item.icon }} </view>
          </view>
        </view>
      </view>
      <view class="vip-question">
        <view class="vip-question-title">常见问题</view>

        <block v-for="(item, index) in Vipquestions" :key="index">
          <tui-collapse :index="index" :current="current" @click="change">
            <template v-slot:title>
              <tui-list-cell>{{ item.name }}</tui-list-cell>
            </template>
            <template v-slot:content>
              <uParse :content="item.intro" />
            </template>
          </tui-collapse>
        </block>
      </view>
      <tui-footer
        :fixed="false"
        class="service-tui-footer"
        copyright="Copyright © 2022-2025 Greenet-TC."
      ></tui-footer>
    </view>
    <!-- 支付弹窗 -->
    <t-pay-way
      :show="show"
      @close="popupClose"
      :fee="getActiveItem(activeId).fee"
      :activeId="activeId"
    ></t-pay-way>
    <!--tabbar-->
    <view class="tui-tabbar">
      <view>
        <view class="vip-btn" @click="btnPay"
          >{{ getActiveItem(activeId).fee }}开通立享特权</view
        >
      </view>
    </view>
  </view>
</template>

<script>
// import { getlogin, wxLogin, getUserProfile } from "@/common/utils.js";
import store from "@/store/index.ts";
import tPayWay from "../payComforn/index.vue";
import uParse from "@/components/uni/uParse/src/wxParse";
import { login } from "@/common/login";
import { WEBURL } from "@/common/utils";
import { memberShipData, Vipquestions } from "@/common/contant";
import dayjs from "dayjs";

export default {
  components: { uParse, tPayWay },
  // onReachBottom: function () {
  //   if (!this.pullUpOn) return;
  //   this.loadding = true;
  //   if (this.pageIndex == 4) {
  //     this.loadding = false;
  //     this.pullUpOn = false;
  //   } else {
  //     let loadData = JSON.parse(JSON.stringify(this.productList));
  //     loadData = loadData.splice(0, 10);
  //     if (this.pageIndex == 1) {
  //       loadData = loadData.reverse();
  //     }
  //     this.productList = this.productList.concat(loadData);
  //     this.pageIndex = this.pageIndex + 1;
  //     this.loadding = false;
  //   }
  // },

  onPullDownRefresh() {
    setTimeout(() => {
      uni.stopPullDownRefresh();
    }, 200);
  },

  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },

  onShow() {
    this.localtoken = uni.getStorageSync("localtoken");
  },

  onHide() {},

  onLoad() {
    console.log(1, memberShipData);
  },

  data() {
    return {
      isLogin: false,
      webURL: "https://www.thorui.cn/wx",
      top: 0, //标题图标距离顶部距离
      opacity: 0,
      scrollTop: 0.5,
      memberShipData,
      current: 0,
      pageIndex: 1,
      loadding: false,
      pullUpOn: true,
      webURLBase: WEBURL,
      activeId: 1,
      show: false,
      Vipquestions,
    };
  },

  computed: {
    baseInfo() {
      return store.state.userBaseInfo;
    },
    getLoginStatus() {
      return store.state.loginStatus;
    },
    queryAccount() {
      return {
        ...store.state.queryAccount,
        endTime: dayjs(store.state.queryAccount?.endTime).format("YYYY-MM-DD"),
      };
    },
  },

  methods: {
    initNavigation(e) {
      this.opacity = e.opacity;
      this.top = e.top;
    },
    opacityChange(e) {
      this.opacity = e.opacity;
    },
    choiceVipType(e) {
      this.activeId = e;
    },
    getActiveItem(activeId) {
      return this.memberShipData.filter((i) => {
        return i.id === activeId;
      })[0];
    },
    setOpcityValue(value) {
      if (value === 1) {
        return 7;
      } else if (value === 2) {
        return 4;
      } else if (value === 3) {
        return 6;
      } else {
        return 11;
      }
    },
    change(e) {
      this.current = e.index;
    },
    btnPay() {
      this.show = true;
    },
    popupClose() {
      this.show = false;
    },
    privacyAgree() {
      console.log(111);
      uni.navigateTo({
        url: "/pages/profile/privacy/index",
      });
    },
    // change(e) {
    // 	let index = e.index;
    // 	let item = this.dataList[index];
    // 	item.current = item.current == index ? -1 : index
    // }
  },

  // onReachBottom: function () {
  //   if (!this.pullUpOn) return;
  //   this.loadding = true;
  //   if (this.pageIndex == 4) {
  //     this.loadding = false;
  //     this.pullUpOn = false;
  //   } else {
  //     let loadData = JSON.parse(JSON.stringify(this.productList));
  //     loadData = loadData.splice(0, 10);
  //     if (this.pageIndex == 1) {
  //       loadData = loadData.reverse();
  //     }
  //     this.productList = this.productList.concat(loadData);
  //     this.pageIndex = this.pageIndex + 1;
  //     this.loadding = false;
  //   }
  // },
};
</script>

<style lang="less">
.tui-header-box {
  width: 100%;
  padding: 0 30rpx 0 20rpx;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 32px;
  transform: translateZ(0);
  z-index: 9999;
}

/* #ifndef MP */
.tui-header-icon {
  min-width: 120rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* #endif */
/* #ifdef MP */
.tui-set-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* #endif */
.tui-icon-box {
  position: relative;
}

.tui-icon-setup {
  margin-left: 8rpx;
}

.tui-badge {
  position: absolute;
  font-size: 24rpx;
  height: 32rpx;
  min-width: 20rpx;
  padding: 0 6rpx;
  border-radius: 40rpx;
  right: 10rpx;
  top: -5rpx;
  transform: scale(0.8) translateX(60%);
  transform-origin: center center;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.tui-badge-red {
  background: #f74d54;
  color: #fff;
}

.tui-badge-white {
  background: #fff;
  color: #f74d54;
}

.tui-badge-dot {
  position: absolute;
  height: 12rpx;
  width: 12rpx;
  border-radius: 50%;
  right: -12rpx;
  top: 0;
  background: #f74d54;
}
.vip-center {
  width: 100%;
  // height: 464rpx;
  display: block;
  &-top {
    position: absolute;
    top: 0rpx;
    left: 0;
    // width: calc(100%-80rpx);
    padding: 130rpx 40rpx 40rpx 40rpx;
    .tui-avatar {
      flex-shrink: 0;
      width: 96rpx;
      height: 96rpx;
      display: block;
      border-radius: 50%;
    }
    .header-profile-top {
      overflow: hidden;

      .self-info-name {
        align-items: center;
        display: flex;
        .name-desc {
          height: 96rpx;
          margin-left: 16rpx;
          margin-top: 8rpx;
          .name {
            align-items: center;
            display: flex;
            height: 40rpx;
            .name-img {
              height: 28rpx;
              margin-left: 8rpx;
              width: 105rpx;
            }
            .name-link {
              color: #ffffff;
              font-weight: 500;
            }
          }
          .identify {
            color: #999 !important;
            cursor: pointer;
            font-size: 24rpx;
            line-height: 36rpx;
            margin-top: 8rpx;
            width: -moz-max-content;
            width: max-content;
            .hove-to-green {
              width: max-content;
              display: flex;
              align-items: center;
            }
            .nc-icon {
              vertical-align: -0.15em;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              display: inline-block;
              font-style: normal;
              line-height: 0;
              text-align: center;
              text-rendering: optimizeLegibility;
              text-transform: none;
            }
          }
        }
      }

      .self-page {
        box-sizing: border-box;
        color: #32ca99;
        display: block;
        font-size: 24rpx;
        font-weight: 500;
        height: 52rpx;
        line-height: 52rpx;
        position: absolute;
        right: 32rpx;
        text-align: center;
        top: 132rpx;
        width: 112rpx;
      }
    }
  }
  .vip-card-bg {
    width: 100%;
    // height: 464rpx;
    display: block;
    .title-line-1 {
      -webkit-text-fill-color: transparent;
      background: linear-gradient(
        315deg,
        #53f7e2,
        #bafca3 46%,
        #f2f07c 79%,
        #f9e555
      );
      -webkit-background-clip: text;
      color: #fff;
      font-size: 20px;
      font-weight: 500;
      height: 20px;
      line-height: 20px;
      margin-top: 30px;
    }
    .title-line-2 {
      color: #fff;
      font-size: 12px;
      line-height: 18px;
      margin-top: 8px;
      width: 144px;
    }
  }
}
.vip-items {
  width: 100%;
  margin-bottom: 91px;
  // background: #fff;
  margin-top: -30rpx;
  position: relative;
  .vip-card {
    background-size: cover;
    border-radius: 16rpx 16rpx 0 0;
    box-sizing: border-box;
    height: 147rpx;
    padding: 36rpx 39rpx 0 39rpx;
    /* padding-top: 36rpx; */
    left: 50%;
    transform: translate(-50%, 0);
    position: absolute;
    top: -130rpx;
    width: 90%;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(20rpx);
    &-bg {
      border-radius: 24rpx;
      height: 156rpx;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }
    .vip-text-label {
      align-items: center;
      color: #333;
      display: flex;
      font-weight: 500;
      height: 48rpx;
      width: 216rpx;
      .yj-vip-text {
        flex-shrink: 0;
        font-size: 32rpx;
        line-height: 48rpx;
        color: #fff;
        &.vip {
          -webkit-text-fill-color: transparent;
          background: linear-gradient(
            312deg,
            #53f7e2,
            #bafca3 46%,
            #f2f07c 79%,
            #ffe741
          );
          -webkit-background-clip: text;
          color: #fff;
          font-size: 32rpx;
          line-height: 48rpx;
        }
      }
      .vip-label-pic {
        flex-shrink: 0;
        height: 36rpx;
        margin-left: 8rpx;
        width: 80rpx;
      }
    }
    .yj-vip-desc {
      color: #999;
      font-size: 24rpx;
      line-height: 52rpx;
    }
    .open-vip-btn {
      -webkit-box-pack: center;
      -webkit-box-align: center;
      -webkit-align-items: center;
      align-items: center;
      background: -webkit-linear-gradient(
        135deg,
        #ffdead,
        #ffbd7f 21%,
        #fff9d7 53%,
        #ffebba
      );
      border-radius: 30rpx;
      cursor: pointer;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      height: 48rpx;
      -webkit-justify-content: center;
      justify-content: center;
      right: 45rpx;
      position: absolute;
      top: 54rpx;
      width: 128rpx;
      &-text {
        color: #4c260e;
        font-size: 24rpx;
        font-weight: 500;
        line-height: 24rpx;
      }
    }
  }
  .vip-contant {
    background: #ffffff;
    width: 100%;
    height: 185px;
    &-top {
      height: 340rpx;
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      padding-left: 32rpx;
      padding-top: 45rpx;
      padding-bottom: 32rpx;
      &-item {
        height: 210rpx;
        flex-shrink: 0;
        border-radius: 16rpx;
        width: 173rpx;
        background: #f5f6fa;
        border: 2rpx solid #9c9c9c30;
        margin-right: 20rpx;
        // linear-gradient(44deg,#fff6f4,#fff);
        padding: 30rpx 10rpx;
        align-items: center;
        display: flex;
        flex-direction: column;
        position: relative;
        &-tip {
          position: absolute;
          left: -1px;
          border-radius: 8px 0;
          top: -6px;
          height: 17px;
          padding: 1px 9px;
          background: radial-gradient(
            100% 100% at 100% 0,
            #fb623f 0,
            #ff813a 100%
          );
          color: #fff;
          font-size: 12px;
          text-align: center;
          line-height: 17px;
        }
        &.active {
          background: #fff6f4;
          border: 2rpx solid #f64;
        }
        &-title {
          height: 32rpx;
          line-height: 32rpx;
          margin-bottom: 28rpx;
          font-size: 28rpx;
          font-weight: 500;
          color: #404040;
        }
        &-fee {
          line-height: 48rpx;
          text-align: center;
          font-size: 48rpx;
          font-weight: 600;
          color: rgb(64, 64, 64);
          &.active {
            color: #ff3d3dd7;
          }
          .fee-sign {
            padding-top: 8rpx;
            padding-right: 8rpx;
            font-size: 28rpx;
            font-weight: 400;
          }
        }
        &-prefee {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          font-weight: 400;
          justify-content: center;
          align-items: center;
          position: relative;
          height: 50rpx;
          font-size: 24rpx;
          line-height: 50rpx;
          margin-bottom: 20rpx;
          color: #9c9c9c;
          text-decoration: line-through;
        }
        &-bottom {
          height: 28rpx;
          background: #e9e9e970;
          padding: 2rpx 18rpx;
          border-radius: 28rpx;
          line-height: 26rpx;
          font-size: 21rpx;
          font-weight: 400;
          color: #9b9b9b;
          &.active {
            color: #ff3d3dd7;
            background: rgba(253, 221, 213, 100);
          }
        }
      }
    }
  }
  .vip-coupon {
    // width: 100%;
    height: 48rpx;
    display: flex;
    justify-content: space-between;
    padding: 0 39rpx;

    &-left {
      font-family: PingFang SC;
      font-size: 35rpx;
      font-weight: 400;
      line-height: 48rpx;
      color: #222222;
    }
    &-right {
      font-family: PingFang SC;
      font-size: 30rpx;
      font-weight: 300;
      color: #9c9c9c;
      display: flex;
      align-items: center;
    }
  }
}
.vip-price {
  padding: 0 39rpx;
  &-item {
    height: 50rpx;
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    font-weight: 400;
    line-height: 21px;
    color: #222222;
  }
}
.vip-paid {
  padding: 0 39rpx;
  height: 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  &-text {
    //styleName: 六级15-列表、小标题、大按钮文本/常规|font_grade_6_regular;
    font-family: PingFang SC;
    font-size: 15px;
    font-weight: 400;
    line-height: 21px;
  }
  &-num {
    color: #fa4e3e;
    font-weight: 500;
    font-size: 23px;
  }
}
.vip-protocol {
  padding: 20rpx 39rpx;
  height: 24px;
  display: flex;
  align-items: center;
  .tui-text {
    color: #9c9c9c;
    font-size: 14px;
    margin-left: 5px;
    font-weight: 400;
  }
}
.vip-rights {
  padding: 10px 39rpx;
  &-title {
    //styleName: 四级17-卡片、二级页面标题/中粗|font_grade_4_medium;
    font-family: PingFang SC;
    font-size: 17px;
    font-weight: 500;
    line-height: 24px;
    color: "#222222";
  }
  &-list {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    &-item {
      width: 100px;
      display: flex;
      justify-items: center;
      flex-direction: column;
      align-items: center;
      &-icon {
        height: 50px;
        width: 50px;
        > .img {
          height: 100%;
          width: 100%;
        }
      }
      &-text {
        height: 14px;
        width: 100px !important;
        margin: 4px 0;
        font-weight: 400;
        color: #404040;
        font-size: 14px;
        text-align: center;
      }
      &-sub {
        font-size: 12px;
        font-weight: 400;
        color: #9c9c9c;
        margin: 4px 0;
      }
    }
  }
}
.vip-question {
  padding: 10px 39rpx;
  &-title {
    //styleName: 四级17-卡片、二级页面标题/中粗|font_grade_4_medium;
    font-family: PingFang SC;
    font-size: 17px;
    font-weight: 500;
    line-height: 24px;
    color: "#222222";
  }
}
.tui-tabbar {
  width: 100%;
  height: 150rpx;
  background: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  /* #ifdef H5 */
  /* bottom: 50px; */
  /* #endif */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30rpx;
  box-sizing: border-box;
  font-size: 24rpx;
  z-index: 996;
  .vip-btn {
    -webkit-box-pack: center;
    align-items: center;
    background: linear-gradient(
      315deg,
      #ffdead,
      #ffbd7f 21%,
      #fff9d7 53%,
      #ffebba
    );
    border-radius: 30rpx;
    cursor: pointer;
    display: flex;
    height: 70rpx;
    justify-content: center;
    width: 650rpx;
    color: #4c260e;
    font-size: 34rpx;
    font-weight: 500;
  }
}
.tui-tabbar::before {
  content: "";
  width: 100%;
  border-top: 1rpx solid #d9d9d9;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.service-tui-footer {
  margin-bottom: 50rpx;
}
</style>

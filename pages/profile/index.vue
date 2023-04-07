<template>
  <view>
    <!--header-->
    <tui-navigation-bar
      dropDownHide
      splitLine
      @init="initNavigation"
      @change="opacityChange"
      :scrollTop="scrollTop"
      title="我的"
      backgroundColor="#fff"
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
              v-if="isLogin"
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
    <!--header-->
    <view class="tui-mybg-box">
      <image
        :src="webURL + '/static/images/mall/my/img_bg_3x.png'"
        class="tui-my-bg"
        mode="widthFix"
      ></image>
      <view class="tui-header-center">
        <image
          src="/static/images/my/mine_def_touxiang_3x.png"
          class="tui-avatar"
          @tap="href(3)"
        ></image>
        <view class="tui-info" v-if="isLogin">
          <view class="tui-nickname">
            马学明
            <image
              src="/static/images/mall/my/icon_vip_3x.png"
              class="tui-img-vip"
            ></image>
          </view>
          <view class="tui-explain">这家伙很懒…</view>
        </view>
        <view class="tui-login" v-if="!isLogin" @tap="login">
          <text>登录/注册</text>
          <tui-icon
            name="arrowright"
            color="#fff"
            :size="36"
            unit="rpx"
          ></tui-icon>
        </view>
        <!-- #ifndef MP -->
        <view class="tui-btn-edit" v-if="isLogin">
          <tui-button
            type="white"
            :plain="true"
            shape="circle"
            width="92rpx"
            height="40rpx"
            :size="22"
            @click="href(3)"
            >编辑</tui-button
          >
        </view>
        <!-- #endif -->
        <!-- #ifdef MP -->
        <view class="tui-set-box">
          <view class="tui-icon-box tui-icon-message" @tap="href(7)">
            <tui-icon name="message" color="#fff" :size="26"></tui-icon>
            <view v-if="isLogin" class="tui-badge tui-badge-white">1</view>
          </view>
          <view class="tui-icon-box tui-icon-setup" @tap="href(2)">
            <tui-icon name="setup" color="#fff" :size="26"></tui-icon>
          </view>
        </view>
        <!-- #endif -->
      </view>
      <view class="tui-header-btm" @tap="href(5)">
        <view class="tui-btm-item">
          <view class="tui-btm-num">25</view>
          <view class="tui-btm-text">收藏职位</view>
        </view>
        <view class="tui-btm-item">
          <view class="tui-btm-num">22</view>
          <view class="tui-btm-text">关注公司</view>
        </view>
        <view class="tui-btm-item">
          <view class="tui-btm-num">3</view>
          <view class="tui-btm-text">喜欢的内容</view>
        </view>
        <view class="tui-btm-item">
          <view class="tui-btm-num">44</view>
          <view class="tui-btm-text">足迹</view>
        </view>
      </view>
    </view>
    <view class="tui-content-box">
      <view class="tui-box tui-order-box">
        <tui-list-cell
          :arrow="true"
          padding="0"
          :lineLeft="false"
          @click="href(4)"
        >
          <view class="tui-cell-header">
            <view class="tui-cell-title">我的订单</view>
            <view class="tui-cell-sub">查看全部订单</view>
          </view>
        </tui-list-cell>
        <view class="tui-order-list">
          <view class="tui-order-item" @tap="href(4)">
            <view class="tui-icon-box">
              <image
                src="/static/images/icon/profile/1.png"
                class="tui-order-icon"
              ></image>
              <view class="tui-badge tui-badge-red">1</view>
            </view>
            <view class="tui-order-text">简历修改</view>
          </view>
          <view class="tui-order-item" @tap="href(4)">
            <view class="tui-icon-box">
              <image
                src="/static/images/icon/profile/2.png"
                class="tui-order-icon"
              ></image>
              <view class="tui-badge tui-badge-red">1</view>
            </view>
            <view class="tui-order-text">模拟面试</view>
          </view>
          <view class="tui-order-item" @tap="href(4)">
            <view class="tui-icon-box">
              <image
                src="/static/images/icon/profile/3.png"
                class="tui-order-icon"
              ></image>
            </view>
            <view class="tui-order-text">实习内推</view>
          </view>
          <view class="tui-order-item" @tap="href(4)">
            <view class="tui-icon-box">
              <image
                src="/static/images/icon/profile/4.png"
                class="tui-order-icon"
              ></image>
              <view class="tui-badge tui-badge-red" v-if="false">12</view>
            </view>
            <view class="tui-order-text">实习租房</view>
          </view>
        </view>
      </view>

      <view class="tui-box tui-assets-box">
        <tui-list-cell padding="0" unlined :hover="false">
          <view class="tui-cell-header">
            <view class="tui-cell-title">我的资产</view>
          </view>
        </tui-list-cell>
        <view class="tui-order-list tui-assets-list">
          <view class="tui-order-item" @tap="href(11)">
            <view class="tui-assets-num"><text>20</text></view>
            <view class="tui-assets-text">余额</view>
          </view>
          <view class="tui-order-item" @tap="href(8)">
            <view class="tui-assets-num">
              <text>3</text>
              <view class="tui-badge-dot"></view>
            </view>
            <view class="tui-assets-text">优惠券</view>
          </view>
          <view class="tui-order-item">
            <view class="tui-assets-num">
              <text>7</text>
              <view class="tui-badge-dot"></view>
            </view>
            <view class="tui-assets-text">积分</view>
          </view>
          <view class="tui-order-item">
            <view class="tui-assets-num"><text>0</text></view>
            <view class="tui-assets-text">红包</view>
          </view>
          <view class="tui-order-item">
            <view class="tui-assets-num"><text>1</text></view>
            <view class="tui-assets-text">礼品卡</view>
          </view>
        </view>
      </view>

      <view class="tui-box tui-tool-box">
        <tui-list-cell :arrow="true" padding="0" :lineLeft="false">
          <view class="tui-cell-header">
            <view class="tui-cell-title">更多服务</view>
            <view class="tui-cell-sub">查看更多</view>
          </view>
        </tui-list-cell>
        <view class="tui-order-list tui-flex-wrap">
          <view class="tui-tool-item">
            <view class="tui-icon-box">
              <image
                src="/static/images/icon/profile/5.png"
                class="tui-tool-icon"
              ></image>
            </view>
            <view class="tui-tool-text">简历模版</view>
          </view>
          <view class="tui-tool-item" @tap="href(11)">
            <view class="tui-icon-box">
              <image
                src="/static/images/icon/profile/8.png"
                class="tui-tool-icon"
              ></image>
            </view>
            <view class="tui-tool-text">实习咨询</view>
          </view>
          <view class="tui-tool-item" @tap="href(6)">
            <view class="tui-icon-box">
              <image
                src="/static/images/icon/profile/6.png"
                class="tui-tool-icon"
              ></image>
            </view>
            <view class="tui-tool-text">简历修改</view>
          </view>
          <view class="tui-tool-item">
            <view class="tui-icon-box">
              <image
                src="/static/images/icon/profile/9.png"
                class="tui-tool-icon"
              ></image>
            </view>
            <view class="tui-tool-text">模拟面试</view>
          </view>
          <view class="tui-tool-item">
            <view class="tui-icon-box">
              <image
                src="/static/images/icon/profile/10.png"
                class="tui-tool-icon"
              ></image>
            </view>
            <view class="tui-tool-text">面试指导</view>
          </view>
          <view class="tui-tool-item" @tap="href(9)">
            <view class="tui-icon-box">
              <image
                src="/static/images/icon/profile/6.png"
                class="tui-tool-icon"
              ></image>
            </view>
            <view class="tui-tool-text">实习内推</view>
          </view>
          <view class="tui-tool-item">
            <view class="tui-icon-box">
              <image
                src="/static/images/icon/profile/11.png"
                class="tui-tool-icon"
              ></image>
            </view>
            <view class="tui-tool-text">实习租房</view>
          </view>
          <view class="tui-tool-item">
            <view class="tui-icon-box">
              <image
                src="/static/images/icon/profile/12.png"
                class="tui-tool-icon"
              ></image>
            </view>
            <view class="tui-tool-text">出国留学</view>
          </view>
        </view>
      </view>

      <!--加载loadding-->
      <tui-loadmore v-if="loadding" :index="3" type="red"></tui-loadmore>
    </view>
  </view>
</template>

<script>
import { getlogin, wxLogin, getUserProfile } from "@/common/utils.js";
export default {
  onLoad: function (options) {
    let obj = {};
    // #ifdef MP-WEIXIN
    obj = wx.getMenuButtonBoundingClientRect();
    // #endif
    // #ifdef MP-BAIDU
    obj = swan.getMenuButtonBoundingClientRect();
    // #endif
    // #ifdef MP-ALIPAY
    my.hideAddToDesktopMenu();
    // #endif

    uni.getSystemInfo({
      success: (res) => {
        this.width = obj.left || res.windowWidth;
        this.height = obj.top
          ? obj.top + obj.height + 8
          : res.statusBarHeight + 44;
        this.top = obj.top
          ? obj.top + (obj.height - 32) / 2
          : res.statusBarHeight + 6;
        this.scrollH = res.windowWidth * 0.6;
      },
    });
  },
  data() {
    return {
      isLogin: false,
      webURL: "https://www.thorui.cn/wx",
      top: 0, //标题图标距离顶部距离
      opacity: 0,
      scrollTop: 0.5,
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
      pullUpOn: true,
    };
  },
  onLoad() {},
  onHide() {},
  onShow() {
    this.localtoken = uni.getStorageSync("localtoken");
  },
  methods: {
    href(page) {
      //未登录状态下应跳转至登录页面，此处未作处理
      let url = "";
      switch (page) {
        case 2:
          url = "/pages/my/set/set";
          break;
        case 3:
          url = "/pages/my/userInfo/userInfo";
          break;
        case 4:
          url = "/pages/my/myOrder/myOrder";
          break;
        case 6:
          url = "/pages/index/coupon/coupon";
          break;
        case 7:
          url = "/pages/my/message/message";
          break;
        case 8:
          url = "/pages/my/myCoupon/myCoupon";
          break;
        case 9:
          url = "/pages/my/myGroup/myGroup";
          break;
        case 10:
          url = "/pages/my/refundList/refundList";
          break;
        case 11:
          url = "/pages/my/wallet/wallet";
          break;
        default:
          break;
      }
      if (url) {
        if (page == 3 && !this.isLogin) {
          this.isLogin = true;
          this.tui.toast("模拟登录成功~");
        } else {
          this.tui.href(url);
        }
      } else {
        this.tui.toast("功能尚未完善~");
      }
    },
    detail: function () {
      uni.navigateTo({
        url: "/pages/index/productDetail/productDetail",
      });
    },
    initNavigation(e) {
      this.opacity = e.opacity;
      this.top = e.top;
    },
    opacityChange(e) {
      this.opacity = e.opacity;
    },
    login() {
      this.isLogin = true;
      getlogin().then((res) => {
        // wxLogin(res);
      });
      getUserProfile().then((res) => {
        console.log(1111, res);
      });
    },
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  onPullDownRefresh() {
    setTimeout(() => {
      uni.stopPullDownRefresh();
    }, 200);
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
};
</script>

<style>
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

.tui-mybg-box {
  width: 100%;
  height: 464rpx;
  position: relative;
}

.tui-my-bg {
  width: 100%;
  height: 464rpx;
  display: block;
}

.tui-header-center {
  position: absolute;
  width: 100%;
  height: 128rpx;
  left: 0;
  top: 120rpx;
  padding: 0 30rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.tui-avatar {
  flex-shrink: 0;
  width: 128rpx;
  height: 128rpx;
  display: block;
}

.tui-info {
  width: 60%;
  padding-left: 30rpx;
}

.tui-login {
  width: 60%;
  padding-left: 30rpx;
  font-size: 32rpx;
  line-height: 32rpx;
  color: #fff;
  display: flex;
  align-items: center;
}

.tui-nickname {
  font-size: 30rpx;
  font-weight: 500;
  color: #fff;
  display: flex;
  align-items: center;
}

.tui-img-vip {
  width: 56rpx;
  height: 24rpx;
  margin-left: 18rpx;
}

.tui-explain {
  width: 80%;
  font-size: 24rpx;
  font-weight: 400;
  color: #fff;
  opacity: 0.75;
  padding-top: 8rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tui-btn-edit {
  flex-shrink: 0;
  padding-right: 22rpx;
}

.tui-header-btm {
  width: 100%;
  padding: 0 30rpx;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 280rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
}

.tui-btm-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tui-btm-num {
  font-size: 32rpx;
  font-weight: 600;
  position: relative;
}

.tui-btm-text {
  font-size: 24rpx;
  opacity: 0.85;
  padding-top: 4rpx;
}

.tui-content-box {
  width: 100%;
  padding: 0 30rpx;
  box-sizing: border-box;
  position: relative;
  top: -72rpx;
  z-index: 10;
}

.tui-box {
  width: 100%;
  background: #fff;
  /* box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1); */
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
  border-radius: 10rpx;
  overflow: hidden;
}

.tui-order-box {
  height: 208rpx;
}

.tui-cell-header {
  width: 100%;
  height: 74rpx;
  padding: 0 26rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tui-cell-title {
  font-size: 30rpx;
  line-height: 30rpx;
  font-weight: 600;
  color: #333;
}

.tui-cell-sub {
  font-size: 26rpx;
  font-weight: 400;
  color: #999;
  padding-right: 28rpx;
}

.tui-order-list {
  width: 100%;
  height: 134rpx;
  padding: 0 30rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tui-order-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tui-order-text,
.tui-tool-text {
  font-size: 26rpx;
  font-weight: 400;
  color: #666;
  padding-top: 4rpx;
}

.tui-tool-text {
  font-size: 24rpx;
}

.tui-order-icon {
  width: 56rpx;
  height: 56rpx;
  display: block;
}

.tui-assets-box {
  height: 178rpx;
  margin-top: 20rpx;
}

.tui-assets-list {
  height: 84rpx;
}

.tui-assets-num {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
  position: relative;
}

.tui-assets-text {
  font-size: 24rpx;
  font-weight: 400;
  color: #666;
  padding-top: 6rpx;
}

.tui-tool-box {
  margin-top: 20rpx;
}

.tui-flex-wrap {
  flex-wrap: wrap;
  height: auto;
  padding-bottom: 30rpx;
}

.tui-tool-item {
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 30rpx;
}

.tui-tool-icon {
  width: 64rpx;
  height: 64rpx;
  display: block;
}

.tui-badge-icon {
  width: 66rpx;
  height: 30rpx;
  position: absolute;
  right: 0;
  transform: translateX(88%);
  top: -15rpx;
}
</style>

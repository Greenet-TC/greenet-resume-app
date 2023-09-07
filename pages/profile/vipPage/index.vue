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


        <div className="header-profile-top">
        <div className="self-info-name">
          <image
          :src="
            baseInfo.avatar
              ? baseInfo.avatar
              : baseInfo.sex === 1
              ? webURLBase + `/profile/man.png`
              : webURLBase + `/profile/woman.png`
          "
          class="tui-avatar"
          @tap="href(3)"
        ></image>
          <div className="name-desc">
            <div className="name">
              <a className="name-link" href="./">
                {userBaseInfo?.username ?? '优加DA-0000用户'}
              </a>
              <img
                alt="1"
                src="https://mxm1923893223-ulteh-1302287111.tcloudbaseapp.com/profile/icon-1.png"
                className="name-img"
              />
            </div>
            <div className="identify">
              <div className="hove-to-green">
                暂未认证，去认证
                <span className="nc-icon">
                  <svg
                    focusable="false"
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    width="12"
                    height="12"
                    aria-hidden="true"
                    data-v-79ba69ea=""
                  >
                    <path
                      fill="currentColor"
                      fill-rule="nonzero"
                      d="M289.3514 187.8043c-19.8576-17.5625-21.7181-47.8974-4.1557-67.755 17.3869-19.659 47.292-21.679 67.1561-4.6767l.5989.521L723.848 443.9236c33.096 29.2708 36.1968 79.829 6.926 112.9249a80 80 0 0 1-6.115 6.1989l-.811.7271-370.8973 328.0299c-19.8576 17.5624-50.1925 15.7019-67.755-4.1557-17.3868-19.659-15.7371-49.5868 3.5654-67.2242l.5903-.5307L646.696 503.85 289.3514 187.8043z"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
        <a className="self-page" href="./">
          个人主页
        </a>
      </div>
        <view class="title-line-1">优加会员·轻松斩OFFER</view>
      <view class="title-line-2">实习路上优加为您保驾护航</view>
      </view>
      
    </view>
  </view>
</template>

<script>
// import { getlogin, wxLogin, getUserProfile } from "@/common/utils.js";
import store from "@/store/index.ts";
import { login } from "@/common/login";
import { WEBURL } from "@/common/utils";
import * as A from "@/components/common/tui-utils/tui-utils.js";

export default {
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

  onLoad() {},

  data() {
    return {
      isLogin: false,

      webURL: "https://www.thorui.cn/wx",
      top: 0, //标题图标距离顶部距离
      opacity: 0,
      scrollTop: 0.5,

      pageIndex: 1,
      loadding: false,
      pullUpOn: true,
      webURLBase: WEBURL,
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
      console.log(e);
      this.top = e.top;
    },
    opacityChange(e) {
      this.opacity = e.opacity;
    },
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
  position: relative;
  // height: 464rpx;
  display: block;
  &-top{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
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
</style>

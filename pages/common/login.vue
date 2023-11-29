<template>
  <view class="container">
    <view class="tui-bg"></view>
    <view class="tui-content">
      <view class="tui-form">
        <image
          :src="
            baseInfo?.avatar
              ? baseInfo?.avatar
              : baseInfo?.sex === 1
              ? webURLBase + `/profile/man.png`
              : webURLBase + `/profile/woman.png`
          "
          class="tui-avatar"
        ></image
        ><view class="tui-title">{{
          baseInfo?.username ?? "请登录后查看"
        }}</view>
        <view class="tui-sub-title">恭喜解锁登陆福利，赶快登陆吧！</view>

        <button
          class="login-btn"
          open-type="getUserProfile"
          @tap="getUserProfile()"
        >
          授权登录
        </button>

        <button class="login-cancel" @click="go(1)">返回首页</button>
      </view>
    </view>
    <view class="tui-tips">
      <!-- <view class="tui-grey">温馨提示:</view> -->
      <!-- <view class="tui-light-grey">
        登陆即代表同意《服务协议》《用户隐私条款》
      </view> -->
    </view>
  </view>
</template>

<script>
import { WEBURL } from "@/common/utils";
import store from "@/store/index.ts";
import { login, getBaseInfo } from "@/common/login";
import { saveBaseInfoUsingPOST } from "@/common/apis/user-controller.ts";
export default {
  data() {
    return {
      webURLBase: WEBURL,
    };
  },
  computed: {
    baseInfo() {
      return store.state.userBaseInfo;
    },
  },
  methods: {
    go(page) {
      if (page == 1) {
        uni.switchTab({
          url: "/pages/index/index",
          success: function (e) {
            var page = getCurrentPages().pop(); //当前页面
            console.log(111, page);
            if (page == undefined || page == null) return;
            page.onLoad(); //或者其它操作
          },
        });
      } else {
        uni.navigateTo({
          url: "/pages/profile/order/order",
        });
      }
    },
    async getUserProfile() {
      setTimeout(() => {
        login();
        uni.switchTab({
          url: "/pages/index/index",
          success: function (e) {
            var page = getCurrentPages().pop(); //当前页面
            if (page == undefined || page == null) return;
            page.onLoad(); //或者其它操作
          },
        });
      }, 1000);

      //
      // 获取用户信息
      // 注意 getUserProfile 不支持在事件中使用异步操作
      // 否则会触发错误：{errMsg: "getUserProfile:fail can only be invoked by user TAP gesture."}
      uni.getUserProfile({
        lang: "zh_CN",
        desc: "获取用户信息",
        success: async (userInfo) => {
          await saveBaseInfoUsingPOST({
            ...store.state.userBaseInfo,
            avatar: userInfo.userInfo.avatarUrl,
            username: userInfo.userInfo.nickName,
          });
          await getBaseInfo();
          console.log("12121", userInfo);
        },
        fail: (err) => {
          
          console.log(err, "err");
        },
      });
    },
  },
};
</script>

<style>
.tui-bg {
  width: 100%;
  height: 360rpx;

  border-bottom-left-radius: 30rpx;
}

.tui-content {
  padding: 0 35rpx;
  box-sizing: border-box;
  margin-top: 200px;
  background: linear-gradient(180deg, #ecfafa, #f8f8f8);
}
.tui-form {
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
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
.tui-Qr-code {
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
  margin-bottom: 20rpx;
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
.login-btn {
  width: 300px;
  height: 50px;
  background: linear-gradient(90deg, #ff813a, #ff3d3d);
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-family: MicrosoftYaHei;
  text-align: left;
  color: #fff;
  line-height: 22px;
  letter-spacing: 1px;
}
.login-cancel {
  width: 300px;
  height: 50px;
  border: 1px solid #ff3d3d;
  background: #fff;
  border-radius: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-family: MicrosoftYaHei;
  text-align: left;
  color: #ff3d3d;
  line-height: 22px;
  letter-spacing: 1px;
  margin-top: 10px;
}
.tui-avatar {
  flex-shrink: 0;
  width: 128rpx;
  height: 128rpx;
  display: block;
  border-radius: 50%;
  margin: 20px 0 10px 0;
}
</style>
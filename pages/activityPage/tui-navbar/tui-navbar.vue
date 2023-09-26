<template>
  <view>
    <view class="wx-head-mod" :style="{ height: navHeight + 'rpx' }">
      <view
        class="wx-head-mod-nav"
        :style="{
          height: navigationBarHeight + 'rpx',
          top: statusBarHeight + 'rpx',
        }"
      >
        <view
          class="wx-head-mod-nav-content"
          :style="{ height: customHeight + 'rpx', justifyContent: 'center' }"
        >
          <!-- 文本区 -->
          <view
            class="wx-head-mod-nav-content-mian"
            :style="{ lineHeight: customHeight + 'rpx' }"
          >
            {{ title }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { systemInfo } from "@/common/system-info.js";
export default {
  name: "HeadView",
  props: {
    // 文本区内容
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      statusBarHeight: 0, //状态栏高度
      navHeight: 0, //头部导航栏总体高度
      navigationBarHeight: 0, //导航栏高度
      customHeight: 0, //胶囊高度
      scaleFactor: 0, //比例系数
      menubarLeft: 0, //胶囊定位的左边left
      windowWidth: 0,
    };
  },
  methods: {},
  created() {
    /* 获取设备信息 */
    const SystemInfomations = systemInfo();
    /* 通用平台 */
    this.statusBarHeight = SystemInfomations.statusBarHeight; //状态栏高度
    this.scaleFactor = SystemInfomations.scaleFactor; //比例系数
    this.windowWidth = SystemInfomations.windowWidth; //当前设备的屏幕宽度
    /* 微信小程序平台 */
    // #ifdef MP-WEIXIN
    this.navHeight =
      SystemInfomations.navHeight + SystemInfomations.statusBarHeight; //头部导航栏总高度
    this.navigationBarHeight = SystemInfomations.navHeight; //头部导航栏高度
    this.customHeight = SystemInfomations.menuButtonHeight; //胶囊高度
    this.menubarLeft = SystemInfomations.menuButtonLeft; //胶囊左边界距离左上角的距离
    // #endif
  },
};
</script>

<style>
.wx-head-mod {
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  /* background: linear-gradient(-35deg, #613A19 0%, #6F4E2B 100%); */
}

.wx-head-mod-nav {
  box-sizing: border-box;
  width: 100%;
  position: absolute;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wx-head-mod-nav-content {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  position: relative;
}

/* 文本区 */
.wx-head-mod-nav-content-mian {
  box-sizing: border-box;
  height: 100%;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #fff;
  font-size: 36rpx;
}

/* 返回按钮 */
.wx-head-mod-nav-content-back {
  box-sizing: border-box;
  width: 60rpx;
  height: 100%;
  /* background-color: aqua; */
  position: absolute;
  top: 0;
  left: 32rpx;
  display: flex;
  align-items: center;
  justify-content: left;
}

.wx-head-mod-nav-content-back-img {
  box-sizing: border-box;
}
</style>

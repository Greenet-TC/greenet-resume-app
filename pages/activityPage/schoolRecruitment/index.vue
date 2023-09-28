<!--
 * @Author: maxueming maxueming@kuaishou.com
 * @Date: 2023-09-12 11:26:53
 * @LastEditors: maxueming maxueming@kuaishou.com
 * @LastEditTime: 2023-09-27 10:05:32
 * @FilePath: /greenet-resume-app/pages/activityPage/schoolRecruitment/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="school-active">
    <tui-navigation-bar
      dropDownHide
      splitLine
      @init="initNavigation"
      @change="opacityChange"
      :scrollTop="scrollTop"
      title="校招特训营"
      backgroundColor="#ffffff80"
      color="#333"
    >
      <view class="tui-header-icon" :style="{ marginTop: top + 'px' }">
        <tui-icon
          name="arrowleft"
          :color="opacity > 0.85 ? 'rgb(96,98,102)' : '#ffffff0'"
          @click="back"
          size="19"
        ></tui-icon>
        <view class="tui-header-icon-divider"></view>
        <tui-icon
          name="home"
          :color="opacity > 0.85 ? 'rgb(96,98,102)' : '#ffffff0'"
          @click="home"
          size="19"
        ></tui-icon>
      </view>
    </tui-navigation-bar>
    <!-- <img
      src=""
      alt=""
     
    /> -->
    <image
      src="https://mxm1923893223-ulteh-1302287111.tcloudbaseapp.com/activity/school-resume.png"
      mode=""
      class="school-active-img"
      @click="previewImage(url)"
    ></image>

    <view class="tui-tabbar">
      <view class="tui-btn-mr">
        <cell
          iconUrl="https://wwcdn.weixin.qq.com/node/wwmng/wwmng/style/images/independent/csPlugin/chatGroup_avatar_rect_2x$fc6f857c.png"
          contactText="加入群聊"
          :startmessage="startmessage"
          :completemessage="completemessage"
          paddingStyle="10 0 10 0"
          :contactTextBlod="false"
          url="https://work.weixin.qq.com/gm/722d7ee22748f08893e0852878c6c43c"
      /></view>
      <view>
        <button open-type="share" class="tui-share-btn">
          <image
            src="../../../static/images/icon/icon_popup_share.png"
            mode="widthFix"
            :style="{
              height: 80 + 'rpx',
              width: 80 + 'rpx',
            }"
          ></image>
        </button>
      </view>
    </view>
    <tui-footer
      :fixed="false"
      class="service-tui-footer"
      copyright="Copyright © 2022-2025 Greenet-TC."
    ></tui-footer>
  </view>
</template>
<script>
export default {
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  data() {
    return {
      top: 0, //标题图标距离顶部距离
      opacity: 0,
      scrollTop: 0.5,
    };
  },

  methods: {
    initNavigation(e) {
      this.opacity = e.opacity;
      this.top = e.top;
    },
    home() {
      uni.switchTab({
        url: "/pages/index/index",
      });
    },

    previewImage(url) {
      let photoList = [];
      photoList.push(url);
      uni.previewImage({
        current: 0,
        urls: photoList, // 图片路径必须是一个数组
      });
    },
    opacityChange(e) {
      this.opacity = e.opacity;
    },
    choiceVipType(e) {
      this.activeId = e;
    },
    startmessage(e) {},
    completemessage(e) {},
    back() {
      uni.navigateBack();
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
  },
  onShareTimeline(res) {
    console.log(res);
    return {
      title: `优加实习｜24届校招特训营`, // 我是分享后显示的标题,可不填
      query: "", // id=123, 可不填 传递的参数，只能是这种格式
      imageUrl:
        "https://mmbiz.qpic.cn/mmbiz_jpg/DLjQMNwUKcBAwxGJHmf01HoWOhOfO8LMmRcmc0VUKIibgt0lzRxIaUg3smkq6XMYBFfeEJXsHGDGolkMNvkziaBQ/0?wx_fmt=jpeg", // 可不填,可以是网络路径也可以是本地路径，分享到朋友圈显示的图标
      success(res) {
        uni.showToast({
          title: "分享成功",
        });
      },
      fail(res) {
        uni.showToast({
          title: "分享失败",
          icon: "none",
        });
      },
    };
  },
};
</script>
<style lang="less">
.tui-header-icon {
  margin-left: 10px;
  width: 80px;
  position: fixed;
  top: 0;
  padding: 0 16rpx;
  border-radius: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 0.5px solid #dadbde;
  padding: 0 16rpx;
  align-items: center;
  height: 32px;
  transform: translateZ(0);
  z-index: 99999;
  box-sizing: border-box;
  &-divider {
    border-left: 1px solid rgb(214, 215, 217);
    height: 16px;
    border-top-color: rgb(214, 215, 217);
    border-right-color: rgb(214, 215, 217);
    border-bottom-color: rgb(214, 215, 217);
    margin: 0px 8px;
  }
}

.school-active {
  height: 100vh;
  width: 100%;
  &-img {
    width: 100%;
    height: 120%;
  }
  .back-icon {
    position: absolute;
    width: 24rpx;
    height: 24rpx;
    top: 90rpx;
    left: 20rpx;
  }
}

.tui-tabbar {
  width: 100%;
  height: 185rpx;
  background: rgba(255, 255, 255, 0.9);

  position: fixed;
  left: 0;
  bottom: 0;
  /* #ifdef H5 */
  /* bottom: 50px; */
  /* #endif */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30rpx;
  box-sizing: border-box;
  font-size: 24rpx;
  z-index: 1;
}
.tui-btn-mr {
  margin-right: 30rpx;
  width: 165px;
  background: #ffffff;
  height: 48px;
  padding: 9px 10px 0 10px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #6496c8;
}
.tui-share-btn {
  flex: 1;
  display: block;
  background: transparent;
  margin: 0;
  padding: 0;
  border-radius: 50%;
  border: 0;
  line-height: 1;
}
</style>

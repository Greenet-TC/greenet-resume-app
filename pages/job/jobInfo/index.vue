<template>
  <view
    ><tui-loading v-if="loading" text="加载中..."></tui-loading>
    <view class="job-tui-card">
      <tui-card
        :title="{
          text: positionInfo?.positionName,
          size: 45,
          color: 'black',
        }"
        :isHot="positionInfo?.urgent"
        :tag="{
          text: `${dayjs(positionInfo?.createTime).format('YYYY-MM-DD')}`,
          size: 26,
          color: '#f64',
        }"
      >
        <template v-slot:body>
          <view class="position-card-body">
            <view class="job-tui-text">
              <tui-text
                padding="0rpx 0"
                block
                :text="
                  !!positionInfo?.salary && !!positionInfo?.salaryType
                    ? `${positionInfo?.salary}元/${
                        getTargetElement(
                          salaryType,
                          positionInfo?.salaryType.value
                        )?.label
                      }`
                    : '薪资面议'
                "
                size="35"
                color="#f64"
                fontWeight="600"
              ></tui-text> </view
            ><tui-tag type="light-orange" padding="20rpx 30rpx">
              {{ positionInfo?.property?.label }}</tui-tag
            >
          </view>
        </template>
        <template v-slot:footer>
          <view class="job-footer-box">
            <view class="job-footer-box-item">
              <tui-icon name="gps" :size="18"></tui-icon>
              <tui-text
                padding="0rpx 6rpx"
                block
                :text="
                  Array.isArray(positionInfo.location)
                    ? positionInfo.location.join('/')
                    : positionInfo.location
                "
                size="30x"
                color="gray"
              ></tui-text
            ></view>
            <view class="job-footer-box-item">
              <tui-icon name="send" :size="18"></tui-icon>
              <tui-text
                padding="0rpx 6rpx"
                block
                :text="positionInfo?.degree?.label"
                size="30x"
                color="gray"
              ></tui-text
            ></view>
            <view class="job-footer-box-item">
              <tui-icon name="clock" :size="18"></tui-icon>
              <tui-text
                padding="0rpx 6rpx"
                block
                :text="positionInfo?.experience?.label"
                size="30x"
                color="gray"
              ></tui-text
            ></view>
          </view>
        </template>
      </tui-card>
    </view>
    <view class="job-detail">
      <view class="job-detail-box">
        <view class="job-detail-box-tag">
          <tui-tag
            v-if="companyInfo?.sectorNumber?.label"
            type="light-brownish"
            margin="0 14rpx 0 0"
            padding="10rpx"
            size="24rpx"
            >{{ companyInfo?.sectorNumber?.label }}</tui-tag
          >
          <view
            v-for="(item, index) in positionInfo?.positionTags"
            :key="index"
          >
            <tui-tag
              type="light-green"
              margin="0 14rpx 0 0"
              padding="10rpx"
              size="24rpx"
              >{{ item }}</tui-tag
            ></view
          >
        </view>
      </view>
      <tui-overflow-hidden
        :type="2"
        height="1000rpx"
        :removeGradient="removeGradient"
      >
        <view class="job-detail-box">
          <view class="job-footer-box-gra">
            <tui-text
              padding="0rpx 0"
              color="gray"
              block
              :text="`毕业要求 : ${positionInfo?.degree?.label} `"
              size="30"
            ></tui-text>
          </view>
          <view class="job-footer-box-gra">
            <tui-text
              padding="0rpx 0"
              color="gray"
              block
              :text="`工作地点 : ${positionInfo?.location} `"
              size="30"
            ></tui-text>
          </view>
        </view>
        <view class="job-detail-box">
          <tui-section
            title="岗位职责"
            is-line
            background="#fff"
            lineCap="circle"
            lineColor="#8E44AD"
            size="38"
            padding="10rpx 20rpx"
            :lineRight="20"
            :lineWidth="10"
          ></tui-section>
          <tui-text
            padding="16rpx 0"
            block
            :text="positionInfo?.positionDuty"
            size="28"
            color="#213547"
          ></tui-text>
        </view>
        <view class="job-detail-box">
          <tui-section
            title="岗位要求"
            is-line
            background="#fff"
            lineCap="circle"
            lineColor="#8E44AD"
            size="38"
            padding="10rpx 20rpx"
            :lineRight="20"
            :lineWidth="10"
          ></tui-section>

          <tui-text
            padding="16rpx 0"
            block
            :text="positionInfo?.positionRequired"
            size="28"
            color="#213547"
          ></tui-text>
        </view>
        <view class="job-detail-box" v-if="positionInfo?.positionAdvan">
          <tui-section
            title="岗位优势"
            is-line
            background="#fff"
            lineCap="circle"
            lineColor="#8E44AD"
            size="38"
            padding="10rpx 20rpx"
            :lineRight="20"
            :lineWidth="10"
          ></tui-section>
          <tui-text
            padding="16rpx 0"
            block
            :text="positionInfo?.positionAdvan"
            size="28"
            color="#213547"
          ></tui-text>
        </view>
      </tui-overflow-hidden>
      <view v-if="!removeGradient" class="job-footer-box-more-btn"
        ><tui-text
          padding="0rpx 0"
          color="#f64"
          block
          text="查看更多"
          size="28"
          @tap="setRemoveGradient"
        ></tui-text
      ></view>
    </view>
    <view class="job-detail">
      <view class="tui-new-job-info-box">
        <view class="tui-new-job-info">
          <tui-image-group
            :imageList="[
              {
                src: companyInfo?.logo,
              },
            ]"
            isGroup
            width="80rpx"
            height="80rpx"
          ></tui-image-group>
          <view class="tui-recru-info-text">
            <tui-text
              block
              :text="companyInfo?.companyName"
              size="30"
            ></tui-text>
            <tui-text
              block
              :text="`${companyInfo?.market?.label} | ${companyInfo?.scale?.label} | ${companyInfo?.sectorNumber?.label}`"
              size="22"
              type="gray"
            ></tui-text
          ></view>
        </view>
        <tui-notice-bar
          single
          :padding="['0', '20rpx']"
          :content="companyInfo?.introduction"
        ></tui-notice-bar>
      </view>
    </view>
    <view class="job-detail flooter-box">
      <tui-icon name="about" color="red" :size="14"></tui-icon>
      <tui-text
        block
        text="如发现虚假招聘、广告，或以任何名义索要证件、费用，或诱导异地入职、参与培训等均属违法，发现请提高警惕"
        size="25"
        padding="0rpx 12rpx"
      ></tui-text>
    </view>
    <tui-footer
      :fixed="false"
      copyright="Copyright © 2022-2025 Greenet-TC."
    ></tui-footer>
    <view class="tui-bottom"> </view>
    <!--tabbar-->
    <view class="tui-tabbar">
      <view class="tui-btn-mr">
        <tui-button
          type="warning"
          width="350rpx"
          height="70rpx"
          :size="30"
          shape="circle"
          @click="openDrawer"
          >立即投递</tui-button
        >
      </view>
      <view @click="showSharePopup">
        <image
          src="../../../static/images/icon/share.svg"
          mode="widthFix"
          class="share-icon"
        ></image>
      </view>
    </view>
    <tui-drawer
      mode="bottom"
      :visible="visible"
      @close="closeDrawer"
      backgroundColor="rgba(1,1,1,0)"
    >
      <view class="d-container">
        <tui-copy-text
          v-if="companyInfo?.email"
          :value="`投递邮箱: ${positionInfo?.email}`"
          :copyValue="positionInfo?.email"
          color="#586c94"
          :copy="copy"
        ></tui-copy-text>

        <tui-copy-text
          value="投递链接: 复制"
          v-if="companyInfo?.url"
          :copyValue="positionInfo?.url"
          color="#586c94"
          @copy="copy"
        ></tui-copy-text>

        <tui-copy-text
          v-if="companyInfo?.recommendCode?.[0]"
          :value="`内推码: ${companyInfo?.recommendCode?.[0]}`"
          :copyValue="companyInfo?.recommendCode?.[0]"
          color="#586c94"
          @copy="copy"
        ></tui-copy-text>
        <view class="job-detail flooter-box">
          <tui-icon name="about" color="red" :size="14"></tui-icon>

          <tui-text
            block
            :text="`【使用说明】：长按复制
            【邮箱】： 投递邮箱为用人部门leader链接，简历筛选快，通过率高 可以接邮箱发送
            【内推链接】：部门公司使用内推链接方式投递，简历筛选速度快
            【内推码】：内推码是简历筛选通过率高的重要影响因素，填写内推码，可以提该通过率
            `"
            size="22"
            color="gray"
            padding="0rpx 12rpx"
          ></tui-text>
        </view>
        <tui-button
          type="warning"
          :plain="true"
          width="152rpx"
          height="56rpx"
          :size="26"
          shape="circle"
          @click="closeDrawer"
          >关闭</tui-button
        >
      </view>
    </tui-drawer>
    <!--底部分享弹层-->
    <tui-bottom-popup :mask="false" :show="sharePopup" @close="hideSharePopup">
      <view class="tui-share__box">
        <view class="tui-share__header">
          <text>分享</text>
          <view class="tui-close__box" @tap="hideSharePopup">
            <tui-icon name="shut" :size="20" color="#C9C9C9"></tui-icon>
          </view>
        </view>
        <view class="tui-share__list">
          <button open-type="share" class="tui-share-btn" @tap="onShare">
            <view class="tui-share__item">
              <image
                src="../../../static/images/icon/icon_popup_share.png"
              ></image>
              <view class="tui-share__text">分享给好友</view>
            </view>
          </button>

          <!-- #ifdef H5 -->
          <view class="tui-share__item" @tap="onShareTimeline">
            <image src="../../../static/images/icon/time-line.svg"></image>
            <view class="tui-share__text">朋友圈</view>
          </view>
          <!-- #endif -->
          <view class="tui-share__item" @tap="createPoster">
            <image
              src="../../../static/images/icon/icon_popup_poster.png"
            ></image>
            <view class="tui-share__text">生成分享海报</view>
          </view>
        </view>
      </view>
    </tui-bottom-popup>
    <!--底部分享弹层-->
    <!--底部分享弹层-->
    <canvas
      :style="{ width: winWidth + 'px', height: winHeight + 'px' }"
      canvas-id="posterId"
      id="posterId"
      class="tui-poster__canvas"
    ></canvas>
    <tui-modal
      custom
      :show="modalShow"
      backgroundColor="transparent"
      padding="0"
      @cancel="hideModal"
    >
      <view class="tui-poster__box" :style="{ marginTop: height + 'px' }">
        <image
          src="/static/images/icon/icon_popup_closed.png"
          class="tui-close__img"
          @tap.stop="hideModal"
        ></image>
        <image
          :src="posterImg"
          v-if="posterImg"
          class="tui-poster__img"
        ></image>
        <tui-button
          type="danger"
          width="460rpx"
          height="80rpx"
          shape="circle"
          @click="savePic"
          >保存图片</tui-button
        >
        <view class="tui-share__tips"
          >保存图片到手机相册后，将图片分享到您的圈子</view
        >
      </view>
    </tui-modal>
  </view>
</template>

<script>
import thorui from "@/components/common/tui-clipboard/tui-clipboard.js";
import { salaryType } from "@/common/contant";
import poster from "@/components/common/tui-poster/tui-poster.js";
import { getTargetElement } from "@/common/utils";
import dayjs from "dayjs";
import { getPageListPost } from "@/common/apis/CompanyInfoController";
import { internshipPositionGetPageListPOST } from "@/common/apis/intership-search-list";
export default {
  async onLoad(option) {
    try {
      this.loading = true;
      const data = await internshipPositionGetPageListPOST({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        id: option.id,
      });
      this.positionInfo = data.data?.[0];
      const company_data = await getPageListPost({
        pageNum: 1,
        pageSize: 50,
        id: this.positionInfo?.companyId,
      });
      this.companyInfo = company_data.data?.[0];
      this.pageInfo = data.pageInfo;
    } catch (e) {
      this.loading = false;
    } finally {
      this.loading = false;
    }
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

    setTimeout(() => {
      uni.getSystemInfo({
        success: (res) => {
          this.width = obj.left || res.windowWidth;
          this.height = obj.top
            ? obj.top + obj.height + 8
            : res.statusBarHeight + 44;
          this.top = obj.top
            ? obj.top + (obj.height - 32) / 2
            : res.statusBarHeight + 6;
          this.scrollH = res.windowWidth;
        },
      });
    }, 0);
  },
  //uniapp微信小程序分享页面到微信朋友圈
  onShareTimeline(res) {
    return {
      title: `优加实习｜招聘信息｜${this.jobInfo.name}`, // 我是分享后显示的标题,可不填
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

  data() {
    return {
      positionInfo: null,
      getTargetElement,
      companyInfo: null,
      removeGradient: false,
      visible: false,
      dayjs,
      sharePopup: false,
      winWidth: uni.upx2px(560 * 2),
      winHeight: uni.upx2px(890 * 2),
      modalShow: false,
      posterImg: "",
      salaryType,
    };
  },
  methods: {
    setRemoveGradient() {
      this.removeGradient = true;
    },
    closeDrawer() {
      this.visible = false;
    },
    openDrawer() {
      this.visible = true;
    },
    go() {
      uni.switchTab({
        url: "/pages/index/index",
      });
    },
    copy() {
      uni.showToast({
        icon: "none",
        title: "复制成功",
        duration: 3000,
        position: "center",
      });
    },
    hideSharePopup() {
      this.sharePopup = false;
    },
    showSharePopup() {
      this.sharePopup = true;
    },
    onShare() {
      this.hideSharePopup();
      //#ifdef APP-PLUS
      plus.share.sendWithSystem(
        {
          content: "ThorUI商城模板",
          href: "https://www.thorui.cn/",
        },
        function () {
          console.log("分享成功");
        },
        function (e) {
          console.log("分享失败：" + JSON.stringify(e));
        }
      );
      //#endif
      // #ifdef H5
      thorui.getClipboardData("https://thorui.cn/doc", (res) => {
        if (res) {
          this.tui.toast("链接复制成功，赶快去分享吧~");
        } else {
          this.tui.toast("链接复制失败");
        }
      });
      // #endif
    },
    async createPoster() {
      this.hideSharePopup();
      if (this.posterImg) {
        this.modalShow = true;
        return;
      }
      uni.showLoading({
        mask: true,
        title: "图片生成中...",
      });
      let mainPic = "../../../static/0.jpeg";
      let qrcode = "../../../static/qrcode.png";
      // #ifdef MP-WEIXIN
      await poster.removeSavedFile();
      // #endif
      if (mainPic && qrcode) {
        const imgs = {
          mainPic: mainPic,
          qrcode: qrcode,
        };
        let text = `${this.positionInfo?.positionDuty
          .replace(/\+/g, "")
          .replace(/[\r\n]/g, "")}`;
        let text2 = `${this.positionInfo?.positionRequired
          .replace(/\+/g, "")
          .replace(/[\r\n]/g, "")}`;
        poster.drawShipInfoPoster(
          "posterId",
          this.winWidth,
          this.winHeight,
          imgs,
          text,
          text2,
          this.positionInfo?.property.label ?? "",
          `${
            !!this.positionInfo?.salary && !!this.positionInfo?.salaryType
              ? `${this.positionInfo?.salary}元/${
                  getTargetElement(
                    salaryType,
                    this.positionInfo?.salaryType.value
                  )?.label
                }`
              : "薪资面议"
          }`,
          `${
            this.positionInfo?.location +
            "·" +
            this.positionInfo?.experience.label
          }`,
          `岗位名称：${this.positionInfo?.positionName}`,
          `公司名称：${this.companyInfo?.companyName}`,
          (res) => {
            uni.hideLoading();
            if (res) {
              this.posterImg = res;
              setTimeout(() => {
                this.modalShow = true;
              }, 60);
            } else {
              this.tui.toast("生成海报失败,请稍后再试");
            }
          }
        );
      } else {
        uni.hideLoading();
        this.tui.toast("生成海报图片下载失败,请稍后再试");
      }
    },
    hideModal() {
      this.modalShow = false;
    },
    savePic() {
      if (this.posterImg) {
        // #ifdef H5
        uni.previewImage({
          urls: [this.posterImg],
        });
        // #endif

        // #ifndef H5
        poster.saveImage(this.posterImg);
        // #endif

        this.hideModal();
      }
    },
  },
};
</script>
<style>
page {
  background-color: rgb(245, 246, 248);
}
.job-detail {
  padding: 24rpx;
  background: #fff;
  border-radius: 12rpx;
  margin: 0rpx 30rpx 24rpx;
}
.job-tui-card {
  margin-bottom: 20rpx;
}
.job-detail-box {
  margin-bottom: 16rpx;
  font-family: cursive;
}
.job-tui-text {
}
.position-card-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rpx 24rpx;
}
.job-footer-box {
  padding: 16rpx 24rpx 24rpx;
  display: flex;
  flex-direction: row;
}
.job-footer-box-item {
  display: flex;
  flex-direction: row;
  margin-right: 24rpx;
}
.job-footer-box-gra {
  display: flex;
  flex-direction: row;
}
.job-footer-box-more-btn {
  display: flex;
  justify-content: center;
}
.tui-new-job-info {
  height: 80rpx;
  display: flex;
  justify-content: left;
  padding: 20rpx 0;
  border-radius: 10rpx;
}
.tui-new-job-info-box {
  width: 100%;
}
.tui-recru-info-item {
  display: flex;
  justify-content: space-around;
}
.tui-recru-info-text {
  margin-left: 20rpx;
}
.flooter-box {
  display: flex;
} /*秒杀商品*/
.tui-goods__list {
  display: flex;
  align-items: center;
}

.tui-goods__item {
  background-color: #fff;
  width: 150rpx;
  height: 230rpx;
  border-radius: 6rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-shrink: 0;
  margin-right: 18rpx;
}

.tui-goods__imgbox {
  width: 150rpx;
  height: 150rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.tui-goods__img {
  max-width: 150rpx;
  max-height: 150rpx;
  display: block;
}
.tui-pri__box {
  max-width: 150rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tui-sale-pri {
  display: flex;
  align-items: flex-end;
  padding: 10rpx 0 8rpx;
  box-sizing: border-box;
  font-size: 28rpx;
  line-height: 28rpx;
  color: #eb0909;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.tui-size-sm {
  font-size: 24rpx;
  line-height: 24rpx;
  transform: scale(0.8);
  transform-origin: 0 50%;
}

.tui-original__pri {
  font-size: 24rpx;
  line-height: 24rpx;
  color: #999999;
  transform-origin: center 10%;
  transform: scale(0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: line-through;
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
  z-index: 1;
}
.tui-bottom {
  height: 150rpx;
}
.tui-btn-mr {
  margin-right: 30rpx;
}
.d-container {
  height: 500rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 12rpx 12rpx 0 0;
  background: #fff;
  padding: 60rpx 0;
}
.job-detail-box-tag {
  display: flex;
  margin: 16rpx 0;
}
/*分享弹层*/
.tui-share__box {
  width: 100%;
  height: 380rpx;
  background-color: #fff;
}

.tui-share__header {
  padding: 40rpx 0;
  text-align: center;
  font-size: 32rpx;
  font-weight: 500;
  color: #333333;
  text-align: center;
  position: relative;
}

.tui-close__box {
  position: absolute;
  right: 25rpx;
  top: 25rpx;
}
.tui-share__list {
  width: 100%;
  padding-top: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tui-share__item {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.tui-share__item image {
  width: 120rpx;
  height: 120rpx;
}
.tui-share__text {
  font-size: 28rpx;
  font-weight: 400;
  color: #333333;
  padding-top: 18rpx;
}
.tui-share-btn {
  flex: 1;
  display: block;
  background: transparent;
  margin: 0;
  padding: 0;
  border-radius: 0;
  border: 0;
  line-height: 1;
}

.tui-share-btn::after {
  border: 0;
}
/*海报modal弹层*/
.tui-poster__canvas {
  background-color: #fff;
  position: absolute;
  left: -9999px;
}

.tui-poster__box {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.tui-close__img {
  width: 48rpx;
  height: 48rpx;
  position: absolute;
  right: 0;
  top: -60rpx;
}

.tui-poster__img {
  width: 560rpx;
  height: 890rpx;
  border-radius: 20rpx;
  margin-bottom: 40rpx;
}

.tui-share__tips {
  font-size: 24rpx;
  transform: scale(0.8);
  transform-origin: center center;
  color: #ffffff;
  padding-top: 12rpx;
}
.share-icon {
  width: 80rpx;
  height: 80rpx;
}
</style>

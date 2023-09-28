<template>
  <view class="container">
    <view class="tui-header-icon" :style="{ marginTop: 48 + 'px' }">
      <tui-icon
        name="arrowleft"
        :color="'rgb(96,98,102)'"
        @click="back"
        size="19"
      ></tui-icon>
      <view class="tui-header-icon-divider"></view>
      <tui-icon
        name="home"
        :color="'rgb(96,98,102)'"
        @click="home"
        size="19"
      ></tui-icon>
    </view>

    <view class="container-header">
      <view class="tui-new-job-info-box">
        <view class="tui-new-job-top-info">
          <tui-image-group
            :imageList="[
              {
                src: companyInfo?.logo,
              },
            ]"
            isGroup
            width="120rpx"
            height="120rpx"
          ></tui-image-group>
          <view class="tui-recru-info-text">
            <tui-text
              block
              :text="companyInfo?.companyName"
              size="40"
              color="#fff"
            ></tui-text>
            <tui-text
              block
              :text="`${companyInfo?.sectorNumber?.label} | ${companyInfo?.scale?.label} | ${companyInfo?.market?.label}`"
              size="28"
              color="#fff"
            ></tui-text
          ></view>
        </view>
        <view class="tui-company-intro">
          <tui-text
            block
            text="公司简介"
            color="#fff"
            size="38"
            margin
          ></tui-text>
        </view>
        <tui-text
          block
          class="companyInfo-introduction"
          :text="companyInfo?.introduction"
          color="#FFFAFA"
        ></tui-text>
      </view>
    </view>
    <scroll-view
      class="tui-draw-bottom-box"
      :scroll-y="isScrollBottom"
      @scrolltoupper="upper"
      @scrolltolower="lower"
    >
      <view class="tui-draw-bottom">
        <view class="tui-draw-bottom-header">
          <view class="tui-draw-bottom-header-bar"></view>
        </view>
        <scroll-view
          :scroll-y="isScrollContant"
          class="tui-draw-bottom-contant"
          @scrolltoupper="bottomUpper"
          @scrolltolower="bottomLower"
        >
          <tui-loading text="'加载中...'" v-if="loading"></tui-loading>
          <view v-if="!positionInfo.length">
            <tui-no-data
              imgUrl="/static/images/toast/img_noorder_3x.png"
              btnText="去看看"
              @click="go"
            >
              <text class="tui-color__black">您还没有任何订单~</text>
              <!--如果需要自定义按钮，可在插槽中自定义，不使用默认按钮-->
            </tui-no-data></view
          >
          <view
            class="job-card"
            v-for="(item, index) in positionInfo"
            :key="index"
            v-else
          >
            <tui-card
              :title="{
                text: item.positionName,
                size: 32,
                color: 'black',
              }"
              :isHot="item.isHot"
              :tag="{
                text:
                  !!item.salary && !!item.salaryType
                    ? `${item.salary}元/${
                        getTargetElement(salaryType, item.salaryType.value)
                          ?.label
                      } `
                    : '薪资面议',
                size: 26,
                color: '#f64',
              }"
              @tap="toJobDetail(item)"
            >
              <template v-slot:body>
                <view class="intership-body">
                  <view class="course-list-item-tag">
                    <tui-tag
                      type="light-orange"
                      v-if="item.location"
                      margin="0 14rpx 0 0"
                      padding="10rpx"
                      size="24rpx"
                      >{{
                        Array.isArray(item.location)
                          ? item.location.join("/")
                          : item.location
                      }}</tui-tag
                    >
                    <tui-tag
                      v-if="item.property?.label"
                      type="light-orange"
                      margin="0 14rpx 0 0"
                      padding="10rpx"
                      size="24rpx"
                      >{{ item.property?.label }}</tui-tag
                    >
                    <tui-tag
                      v-if="item.experience?.label"
                      type="light-orange"
                      margin="0 14rpx 0 0"
                      padding="10rpx"
                      size="24rpx"
                      >{{ item.experience?.label }}</tui-tag
                    >
                    <tui-tag
                      v-if="item.degree?.label"
                      type="light-orange"
                      margin="0 14rpx 0 0"
                      padding="10rpx"
                      size="24rpx"
                      >{{ item.degree?.label }}</tui-tag
                    >
                  </view>
                  <view class="intership-body-date">{{
                    dayjs(item.createTime).format("YYYY-MM-DD")
                  }}</view></view
                >
              </template>
              <template v-slot:footer>
                <view class="tui-footer-job-info">
                  <view class="tui-new-job-info">
                    <tui-image-group
                      :imageList="[
                        {
                          src: companyInfo.logo,
                        },
                      ]"
                      isGroup
                      width="80rpx"
                      height="80rpx"
                    ></tui-image-group>
                    <view class="tui-recru-info-text">
                      <tui-text
                        block
                        :text="companyInfo.companyName"
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
                  <view class="tui-right-job-info">
                    <tui-tag
                      v-if="item.isFree"
                      type="light-blue"
                      padding="8rpx"
                      size="20rpx"
                      >免费</tui-tag
                    >
                    <image
                      v-else
                      src="../../../static/images/icon/vip.svg"
                      mode="widthFix"
                      :style="{
                        height: 50 + 'rpx',
                        width: 50 + 'rpx',
                      }"
                    ></image>
                  </view>
                </view>
              </template>
            </tui-card>
          </view>
        </scroll-view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { salaryType } from "@/common/contant";
import { getTargetElement } from "@/common/utils";
import dayjs from "dayjs";
import { getPageListPost } from "@/common/apis/CompanyInfoController";
import { internshipPositionGetPageListPOST } from "@/common/apis/intership-search-list";
import tNavbar from "../../activityPage/tui-navbar/tui-navbar.vue";

export default {
  components: { tNavbar },
  onLoad: async function (option) {
    this.loading = true;
    try {
      this.compant_id = option.id; //打印出上个页面传递的参数。

      const company_data = await getPageListPost({
        pageNum: 1,
        pageSize: 50,
        id: option.id,
      });
      this.companyInfo = company_data.data[0];
      const data = await internshipPositionGetPageListPOST({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        companyId: option.id,
      });
      this.positionInfo = data.data;
    } catch (e) {
      this.loading = false;
    } finally {
      this.loading = false;
    }
  },

  data() {
    return {
      compant_id: "",
      dayjs,
      loading: false,
      positionInfo: null,
      companyInfo: null,
      isScrollContant: false,
      isScrollBottom: true, //
      pageNum: 1,
      pageSize: 40,
      getTargetElement,
      salaryType,
      pageInfo: {
        page: 0,
        pageSize: 0,
        totalCount: 0,
      },
    };
  },

  methods: {
    upper: function () {
      this.isScrollContant = false;
      //   this.isScrollBottom = true;
    },
    lower: function () {
      this.isScrollContant = true;
      //   this.isScrollBottom = false;
    },
    bottomUpper: function () {
      this.isScrollContant = false;
      //   this.isScrollBottom = true;
    },
    toJobDetail(item) {
      uni.navigateTo({
        url: `/pages/job/jobInfo/index?id=${item.id}`,
      });
    },
    home() {
      uni.switchTab({
        url: "/pages/index/index",
      });
    },
    back() {
      uni.navigateBack();
    },
    // bottomLower: function () {
    //   this.isScrollContant = true;
    //   this.isScrollBottom = false;
    // },
  },
};
</script>

<style lang="less">
page {
  /* background-color: #f7f7f7; */
  background-image: linear-gradient(
    to top,
    #a18cd1 0%,
    rgba(17, 24, 39, 1) 100%
  );
  overflow: hidden;
  /* background-image: linear-gradient(to top, #a3bded 0%, #6991c7 100%); */
}

.container {
  padding-bottom: 100%;
  margin-top: 180rpx;
  height: 100%;
  /* color: #333; */
  padding: 0 34rpx;
}
.container-header {
}
.tui-new-job-info-box {
  margin-bottom: 50rpx;
  width: 100%;
}
.tui-recru-info-text {
  margin-left: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.tui-new-job-top-info {
  height: 120rpx;
  display: flex;
  justify-content: left;
  padding: 20rpx 0;
  border-radius: 10rpx;
}
.tui-new-job-info-box {
  margin-bottom: 50rpx;
  width: 100%;
}
.tui-company-intro {
  margin: 40rpx 0 20rpx 0;
}
.tui-draw-bottom-box {
  position: absolute;
  left: 0;
  bottom: -20rpx;
  width: 100%;
  height: 90%;
}
.tui-draw-bottom {
  height: 95%;
  background: #fff;
  border-radius: 30rpx 30rpx 0rpx 0;
  padding: 24rpx 0;
  margin-top: 520rpx;
}
.tui-draw-bottom-header {
  height: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tui-draw-bottom-header-bar {
  height: 10rpx;
  width: 100rpx;
  background: #c2c2c2;
  border-radius: 10rpx;
}
.job-card {
  margin-bottom: 20rpx;
}
.course-list-item-tag {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 10rpx 0;
  padding: 0 24rpx;
  color: rgb(185, 186, 188);
}
.tui-new-job-info {
  height: 80rpx;
  width: 80%;
  display: flex;
  justify-content: left;
  padding: 20rpx 24rpx;
  border-radius: 10rpx;
}
.tui-new-job-info {
  height: 80rpx;
  width: 80%;
  display: flex;
  justify-content: left;
  padding: 20rpx 24rpx;
  border-radius: 10rpx;
}
.tui-new-comp-info {
  height: 80rpx;
  width: 280rpx;
  display: flex;
  justify-content: left;
  padding: 20rpx 10rpx;
  border-radius: 10rpx;
}
.tui-recru-info-item {
  display: flex;
  justify-content: space-around;
}
.tui-recru-info-text {
  margin-left: 20rpx;
}
.tui-footer-job-info {
  display: flex;
  justify-content: space-between;
}
.tui-right-job-info {
  padding: 40rpx 24rpx 20rpx 0;
}
.tui-draw-bottom-contant {
  margin-top: 40rpx;
  overflow-y: hidden;
  height: 89%;
}
.companyInfo-introduction {
  font-family: "cursive";
}
.intership-body {
  display: flex;
  justify-content: space-between;
  padding: 0 24rpx;
  align-items: center;
  &-date {
    color: #9c9c9c;
    font-size: 28rpx;
  }
}
.tui-header-icon {
  margin-left: 0px;
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
</style>

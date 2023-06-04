<template>
  <view class="container">
    <view class="container-header">
      <view class="tui-new-job-info-box">
        <view class="tui-new-job-info">
          <tui-image-group
            :imageList="[
              {
                src: companyInfoValue.logo,
              },
            ]"
            isGroup
            width="120rpx"
            height="120rpx"
          ></tui-image-group>
          <view class="tui-recru-info-text">
            <tui-text
              block
              :text="companyInfoValue.name"
              size="40"
              color="#fff"
            ></tui-text>
            <tui-text
              block
              :text="`${companyInfoValue.industry} | ${companyInfoValue.financing} | ${companyInfoValue.scale}`"
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
          :text="companyInfoValue.introduce"
          color="#FFFAFA"
        ></tui-text>
        <!-- <tui-notice-bar
          single
          :padding="['0', '20rpx']"
          content="阿里巴巴集团的业务包括核心商业、云计算、本地生活服务、数字媒体及娱乐以及创新业务。围绕着阿里巴巴的平台与业务，一个涵盖了消费者、商家、品牌"
        ></tui-notice-bar> -->
      </view>
    </view>
    <scroll-view
      class="tui-draw-bottom-box"
      scroll-y="true"
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
          <view class="job-card" v-for="(item, index) in JobInfo" :key="index">
            <tui-card
              :title="{
                text: item.name,
                size: 32,
                color: 'black',
              }"
              :isHot="item.isHot"
              :tag="{
                text: item.salary + '·' + item.countMonths,
                size: 26,
                color: '#f64',
              }"
              @tap="toJobDetail(item)"
            >
              <template v-slot:body>
                <view class="course-list-item-tag">
                  <tui-tag
                    type="gray"
                    v-if="item.jobLocation"
                    margin="0 14rpx 0 0"
                    padding="10rpx"
                    size="24rpx"
                    >{{ item.jobLocation }}</tui-tag
                  >
                  <tui-tag
                    v-if="item.jobAttributes"
                    type="gray"
                    margin="0 14rpx 0 0"
                    padding="10rpx"
                    size="24rpx"
                    >{{ item.jobAttributes }}</tui-tag
                  >
                  <tui-tag
                    v-if="item.jobTime"
                    type="gray"
                    margin="0 14rpx 0 0"
                    padding="10rpx"
                    size="24rpx"
                    >{{ item.jobTime }}</tui-tag
                  >
                  <tui-tag
                    v-if="item.academicRequirements"
                    type="gray"
                    margin="0 14rpx 0 0"
                    padding="10rpx"
                    size="24rpx"
                    >{{ item.academicRequirements }}</tui-tag
                  >
                </view>
              </template>
              <template v-slot:footer>
                <view class="tui-footer-job-info">
                  <view class="tui-new-job-info">
                    <tui-image-group
                      :imageList="[
                        {
                          src: companyInfoValue.logo,
                        },
                      ]"
                      isGroup
                      width="80rpx"
                      height="80rpx"
                    ></tui-image-group>
                    <view class="tui-recru-info-text">
                      <tui-text
                        block
                        :text="companyInfoValue.name"
                        size="30"
                      ></tui-text>
                      <tui-text
                        block
                        :text="`${companyInfoValue.industry} | ${companyInfoValue.financing} | ${companyInfoValue.scale}`"
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
                      src="../../static/images/icon/vip.svg"
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
import { companyInfo, JobInfo } from "@/common/contant";
export default {
  onLoad: function (option) {
    this.compant_id = option.id; //打印出上个页面传递的参数。
    console.log(this.compant_id);
    this.companyInfoValue = companyInfo.filter((i, index) => {
      return i.id === this.compant_id;
    })[0];
  },

  data() {
    return {
      compant_id: "",
      companyInfoValue: "",
      JobInfo,
      isScrollContant: false,
    };
  },

  methods: {
    upper: function () {
      this.isScrollContant=false;
    },
    lower: function () {
      this.isScrollContant = true;
    },
  },
};
</script>

<style>
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
.tui-new-job-info {
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
  height: 76%;
}
.tui-draw-bottom {
  height: 95%;
  background: #fff;
  border-radius: 20rpx 20rpx 20rpx;
  padding: 24rpx 0;
  margin-top: 280rpx;
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
</style>

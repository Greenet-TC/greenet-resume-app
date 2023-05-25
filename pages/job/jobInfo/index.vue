<template>
  <view>
    <view class="job-tui-card">
      <tui-card
        :title="{
          text: jobInfo.name,
          size: 40,
          color: 'black',
        }"
        :isHot="jobInfo.isHot"
      >
        <template v-slot:body>
          <view class="job-tui-text">
            <tui-text
              padding="0rpx 0"
              block
              :text="jobInfo.salary + '·' + jobInfo.countMonths"
              size="43"
              color="#f64"
              fontWeight="600"
            ></tui-text>
          </view>
        </template>
        <template v-slot:footer>
          <view class="job-footer-box">
            <view class="job-footer-box-item">
              <tui-icon name="gps" :size="18"></tui-icon>
              <tui-text
                padding="0rpx 6rpx"
                block
                :text="jobInfo.jobLocation"
                size="30x"
                color="gray"
              ></tui-text
            ></view>
            <view class="job-footer-box-item">
              <tui-icon name="send" :size="18"></tui-icon>
              <tui-text
                padding="0rpx 6rpx"
                block
                :text="jobInfo.academicRequirements"
                size="30x"
                color="gray"
              ></tui-text
            ></view>
            <view class="job-footer-box-item">
              <tui-icon name="gps" :size="18"></tui-icon>
              <tui-text
                padding="0rpx 6rpx"
                block
                :text="jobInfo.jobTime"
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
        <view>
          <tui-tag
            v-if="getkey(companyInfo, jobInfo.companyId).industry"
            type="gray"
            margin="0 14rpx 0 0"
            padding="10rpx"
            size="24rpx"
            >{{ getkey(companyInfo, jobInfo.companyId).industry }}</tui-tag
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
              text="毕业要求 :  "
              size="30"
            ></tui-text>
            <tui-text
              padding="0rpx 12rpx"
              block
              :text="jobInfo.academicRequirements"
              size="30"
              color="gray"
            ></tui-text>
          </view>
          <view class="job-footer-box-gra">
            <tui-text
              padding="0rpx 0"
              color="gray"
              block
              text="工作地点 :  "
              size="30"
            ></tui-text>
            <tui-text
              padding="15rpx 12rpx"
              block
              :text="jobInfo.jobLocation"
              size="30"
              color="gray"
            ></tui-text>
          </view>
        </view>
        <view class="job-detail-box">
          <tui-text
            padding="0rpx 0"
            block
            text="岗位职责:"
            size="34"
          ></tui-text>
          <tui-text
            padding="16rpx 0"
            block
            :text="jobInfo.jobDesc"
            size="28"
            color="#213547"
          ></tui-text>
        </view>
        <view class="job-detail-box">
          <tui-text
            padding="0rpx 0"
            block
            text="岗位要求:"
            size="34"
          ></tui-text>
          <tui-text
            padding="16rpx 0"
            block
            :text="jobInfo.jobRequire"
            size="28"
            color="#213547"
          ></tui-text> </view
      ></tui-overflow-hidden>
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
                src: getkey(companyInfo, jobInfo.companyId).logo,
              },
            ]"
            isGroup
            width="80rpx"
            height="80rpx"
          ></tui-image-group>
          <view class="tui-recru-info-text">
            <tui-text
              block
              :text="getkey(companyInfo, jobInfo.companyId).name"
              size="30"
            ></tui-text>
            <tui-text
              block
              :text="`${getkey(companyInfo, jobInfo.companyId).industry} | ${
                getkey(companyInfo, jobInfo.companyId).financing
              } | ${getkey(companyInfo, jobInfo.companyId).scale}`"
              size="22"
              type="gray"
            ></tui-text
          ></view>
        </view>
        <tui-notice-bar
          single
          :padding="['0', '20rpx']"
          :content="getkey(companyInfo, jobInfo.companyId).introduce"
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
    ></tui-footer
  ></view>
</template>

<script>
import { companyInfo } from "@/common/contant";
export default {
  onLoad() {
    this.jobInfo = uni.getStorageSync("jobInfo");
  },
  data() {
    return {
      jobInfo: [],
      companyInfo,
      removeGradient: false,
    };
  },
  methods: {
    getkey(companyInfo, id) {
      return companyInfo.filter((item) => {
        return item.id === id;
      })[0];
    },
    setRemoveGradient() {
      this.removeGradient = true;
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
}
.job-tui-text {
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
}
</style>

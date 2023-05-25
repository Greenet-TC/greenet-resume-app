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
      <view class="job-detail-box"> 1 </view>
      <view class="job-detail-box">2</view>
      <view class="job-detail-box">2</view>
      <view class="job-detail-box">2</view>
    </view>
    <view class="job-detail">
      <view class="job-detail-box"> 1 </view>
      <view class="job-detail-box">2</view>
      <view class="job-detail-box">2</view>
      <view class="job-detail-box">2</view>
    </view>
    <view class="job-detail">
      <view class="job-detail-box"> 1 </view>
      <view class="job-detail-box">2</view>
      <view class="job-detail-box">2</view>
      <view class="job-detail-box">2</view>
    </view></view
  >
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
    };
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
</style>

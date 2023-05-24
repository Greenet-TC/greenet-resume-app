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
              padding="24rpx 0"
              block
              :text="jobInfo.salary + '·' + jobInfo.countMonths"
              size="36"
              fontWeight="600"
            ></tui-text>
          </view>
        </template>
        <template v-slot:footer> </template>
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
    console.log(11111, this.jobInfo);
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
  padding: 24rpx;
}
</style>

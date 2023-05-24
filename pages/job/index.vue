<template>
  <view>
    <view class="job-card" v-for="(item, index) in JobInfo" :key="index">
      <tui-card
        :title="{
          text: item.name,
          size: 32,
          color: 'black',
        }"
        :tag="{
          text: item.salary + '·' + item.countMonths,
          size: 26,
          color: '#f64',
        }"
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
          <view class="tui-default"> 默认卡片底部 slot=>footer </view>
        </template>
      </tui-card>
    </view>
  </view>
</template>

<script>
import { companyInfo, JobInfo } from "@/common/contant";
export default {
  data() {
    return { companyInfo, JobInfo };
  },
};
</script>
<style>
page {
  background-color: rgb(245, 246, 248);
}
.job-card {
  margin-bottom: 20rpx;
}
.tui-header-right {
  font-family: monospace !important;
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
</style>

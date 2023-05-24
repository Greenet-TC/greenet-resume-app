<template>
  <view>
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
          <view class="tui-new-job-info">
            <tui-image-group
              :imageList="[
                {
                  src: getkey(companyInfo, item.companyId).logo,
                },
              ]"
              isGroup
              width="80rpx"
              height="80rpx"
            ></tui-image-group>
            <view class="tui-recru-info-text">
              <tui-text
                block
                :text="getkey(companyInfo, item.companyId).name"
                size="30"
              ></tui-text>
              <tui-text
                block
                :text="`${getkey(companyInfo, item.companyId).industry} | ${
                  getkey(companyInfo, item.companyId).financing
                } | ${getkey(companyInfo, item.companyId).scale}`"
                size="22"
                type="gray"
              ></tui-text
            ></view>
          </view>
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
  methods: {
    getkey(companyInfo, id) {
      return companyInfo.filter((item) => {
        return item.id === id;
      })[0];
    },
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
.tui-new-job-info {
  height: 80rpx;
  display: flex;
  justify-content: left;
  padding: 20rpx 24rpx;
  border-radius: 10rpx;
}
</style>

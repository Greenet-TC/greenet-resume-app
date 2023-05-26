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
        :tag="{
          text: jobInfo.jobAttributes,
          size: 26,
          color: '#f64',
        }"
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
        <view class="job-detail-box-tag">
          <tui-tag
            v-if="getkey(companyInfo, jobInfo.companyId).industry"
            type="gray"
            margin="0 14rpx 0 0"
            padding="10rpx"
            size="24rpx"
            >{{ getkey(companyInfo, jobInfo.companyId).industry }}</tui-tag
          >
          <view v-for="(item, index) in jobInfo.jobTag" :key="index">
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
              :text="`毕业要求 : ${jobInfo.academicRequirements} `"
              size="30"
            ></tui-text>
          </view>
          <view class="job-footer-box-gra">
            <tui-text
              padding="0rpx 0"
              color="gray"
              block
              :text="`工作地点 : ${jobInfo.jobLocation} `"
              size="30"
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
      </view> </view
    ><tui-drawer
      mode="bottom"
      :visible="visible"
      @close="closeDrawer"
      backgroundColor="rgba(1,1,1,0)"
    >
      <view class="d-container">
        <tui-copy-text
          :value="`投递邮箱: ${jobInfo.email}`"
          :copyValue="jobInfo.email"
          color="#586c94"
          :copy="copy"
        ></tui-copy-text>

        <tui-copy-text
          value="投递链接: 复制"
          :copyValue="getkey(companyInfo, jobInfo.companyId).webSite"
          color="#586c94"
          @copy="copy"
        ></tui-copy-text>

        <tui-copy-text
          :value="`内推码: ${getkey(companyInfo, jobInfo.companyId).pushCode}`"
          :copyValue="getkey(companyInfo, jobInfo.companyId).pushCode"
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
  </view>
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
      visible: false,
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
    closeDrawer() {
      this.visible = false;
    },
    openDrawer() {
      this.visible = true;
    },
    copy() {
      console.log(11);
      uni.showToast({
        icon: "none",
        title: "复制成功",
        duration: 3000,
        position: "center",
      });
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
</style>

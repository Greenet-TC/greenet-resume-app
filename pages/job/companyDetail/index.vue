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
            <tui-text block :text="companyInfoValue.name" size="40" color="#fff"></tui-text>
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
    <view> </view>
    <view> </view>
    <view> </view>
    <view> </view>
  </view>
</template>

<script>
import { companyInfo } from "@/common/contant";
export default {
  onLoad: function (option) {
    this.compant_id = option.id; //打印出上个页面传递的参数。
    console.log(this.compant_id);
    this.companyInfoValue = companyInfo.filter((i, index) => {
      return i.id === this.compant_id;
    })[0];
    console.log(this.companyInfoValue);
  },
  data() {
    return {
      compant_id: "",
      companyInfoValue: "",
    };
  },
  methods: {},
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
  /* background-image: linear-gradient(to top, #a3bded 0%, #6991c7 100%); */
}

.container {
  padding-bottom: 100%;
  margin-top: 180rpx;
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
</style>
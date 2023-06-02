<template>
  <view class="container">
    <view class="container-header">
      <view class="tui-new-job-info-box">
        <view class="tui-new-job-info">
          <tui-image-group
            :imageList="[
              {
                src: `https://uploadfiles.nowcoder.com/files/20181102/4575098_1541147538969_826546_1499420128657_7.png?x-oss-process=image%2Fresize%2Cw_120%2Ch_120%2Cm_fill`,
              },
            ]"
            isGroup
            width="80rpx"
            height="80rpx"
          ></tui-image-group>
          <view class="tui-recru-info-text">
            <tui-text block text="阿里巴巴" size="30" color="fff"></tui-text>
            <tui-text
              block
              text="互联网 | 已上市 | 10000 + 人"
              size="22"
              type="#fff"
            ></tui-text
          ></view>
        </view>
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
  data() {
    return {};
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
  margin-top: 100px;
  /* color: #333; */
  padding: 24rpx;
}
.tui-new-job-info-box {
  margin-bottom: 50rpx;
  width: 100%;
}
.tui-recru-info-text {
  margin-left: 20rpx;
}
.tui-new-job-info {
  height: 80rpx;
  display: flex;
  justify-content: left;
  padding: 20rpx 0;
  border-radius: 10rpx;
}
.tui-new-job-info-box {
  margin-bottom: 50rpx;
  width: 100%;
}
</style>

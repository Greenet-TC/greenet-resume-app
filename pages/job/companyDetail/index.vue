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
  
    <view class="tui-draw-bottom">
      <view class="tui-draw-bottom-header">
        <view class="tui-draw-bottom-header-bar"></view>
      </view>
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


      </view>
    </view>
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
.tui-draw-bottom {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60%;
  background: #f7f7f7;
  border-radius: 20rpx 20rpx 20rpx;
  padding: 24rpx;
  
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


</style>
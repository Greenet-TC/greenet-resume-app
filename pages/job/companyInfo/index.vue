<template>
  <view class="container">
    <!-- 头部 -->
    <view class="tui-title-contant">
      <tui-text size="35" fontWeight="500" block text="实习内推"></tui-text>
    </view>
    <view class="tui-product-box">
      <!--简历模板-->
      <view class="tui-block__box">
        <view class="tui-group-name" @tap="more">
          <view>
            <text>热招岗位</text>
            <text class="tui-sub__desc">大家都在投递</text>
          </view>
          <view class="tui-more__box">
            <text>100+ 岗位</text>
            <tui-icon
              name="arrowright"
              :size="30"
              unit="rpx"
              color="#999"
            ></tui-icon>
          </view>
        </view>
        <!-- <view v-for="(item, index) in recruitInfo" :key="index"> -->
        <view class="tui-new-box">
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
                <tui-text block text="阿里巴巴" size="30"></tui-text>
                <tui-text
                  block
                  text="`互联网 | 已上市 | 10000 + 人`"
                  size="22"
                  type="gray"
                ></tui-text
              ></view>
            </view>
            <tui-notice-bar
              single
              :padding="['0', '20rpx']"
              content="阿里巴巴集团的业务包括核心商业、云计算、本地生活服务、数字媒体及娱乐以及创新业务。围绕着阿里巴巴的平台与业务，一个涵盖了消费者、商家、品牌"
            ></tui-notice-bar>
          </view>
          <view
            class="tui-new-item"
            :class="[index != 0 && index != 1 ? 'tui-new-mtop' : '']"
            v-for="(item, index) in companyInfoList"
            :key="index"
            @tap="moreDetail(item)"
          >
            <view class="tui-recru-info-item">
              <tui-image-group
                :imageList="[{ src: item.logo }]"
                isGroup
                width="70rpx"
                height="70rpx"
              ></tui-image-group>
              <view class="tui-recru-info-text">
                <tui-text block :text="item.companyName" size="30"></tui-text>
                <tui-text
                  block
                  :text="`${100}+ 个内推岗位`"
                  size="22"
                  type="gray"
                ></tui-text>
              </view>
            </view>
            <view class="job-company-detail">
              <text>详情</text>
              <tui-icon
                name="arrowright"
                :size="30"
                unit="rpx"
                color="#999"
              ></tui-icon>
            </view>
          </view>
        </view>
        <!-- </view> -->
      </view>
    </view>
  </view>
</template>

<script>
import { companyInfo } from "@/common/contant";
import { getPageListPost } from "@/common/apis/CompanyInfoController";
export default {
  async onLoad() {
    const company_data = await getPageListPost({
      pageNum: 1,
      pageSize: 50,
    });
    this.companyInfoList = company_data.data;
  },
  data() {
    return {
      recruitInfo: companyInfo,
      companyInfoList: [],
    };
  },
  methods: {
    more: function () {
      uni.switchTab({
        url: "/pages/job/index",
      });
    },
    moreDetail: function (e) {
      uni.navigateTo({
        url: `/pages/job/companyDetail/index?id=${e.id}`,
      });
    },
  },
};
</script>

<style>
page {
  background-color: #f7f7f7;
}

.container {
  padding-bottom: 100rpx;
  color: #333;
}
.tui-title-contant {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  margin-top: 20rpx;
}
.tui-product-box {
  box-sizing: border-box;
  border-radius: 5px 5px 0 0;
}
.tui-block__box {
  width: 100%;
  padding: 0 25rpx 25rpx;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 20rpx;
  overflow: hidden;
}

.tui-product-box {
  box-sizing: border-box;
  border-radius: 5px 5px 0 0;
}

.tui-img__coupon {
  width: 100%;
  height: 200rpx;
  display: block;
}

.tui-bg-white {
  background-color: #fff;
}

.tui-group-name {
  width: 100%;
  font-size: 34rpx;
  line-height: 34rpx;
  font-weight: bold;
  text-align: center;
  padding: 30rpx 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #333;
}

.tui-sub__desc {
  color: #ff4906;
  font-size: 28rpx;
  font-weight: 400;
  padding-left: 25rpx;
}

.tui-color__pink {
  color: #ef1346;
}

.tui-seckill__box {
  display: flex;
  align-items: center;
}

.tui-seckill__img {
  width: 160rpx;
  height: 34rpx;
}

.tui-countdown__box {
  width: 228rpx;
  display: flex;
  align-items: center;

  color: #fff;
  background-color: #fff;
  font-weight: 400;
  border: 1rpx solid #eb0909;
  height: 40rpx;
  border-radius: 30px;
  overflow: hidden;
  margin-left: 25rpx;
}
.tui-more__box {
  display: flex;
  align-items: center;
  font-weight: 400;
  color: #999;
}
.job-company-detail {
  display: flex;
  align-items: center;
  font-weight: 400;
  color: #999;
  position: absolute;
  right: 6rpx;
  font-size: 24rpx;
  top: 16rpx;
}

.tui-more__box text {
  font-size: 24rpx;
  line-height: 24rpx;
}

.tui-new-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.tui-new-item {
  width: 49%;
  height: 130rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background: #f5f2f9;
  position: relative;
  border-radius: 12rpx;
}

.tui-new-mtop {
  margin-top: 2%;
}

.tui-title-box {
  font-size: 24rpx;
}

.tui-title-contant {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  margin-top: 20rpx;
}
.tui-recru-info-item {
  display: flex;
  justify-content: space-around;
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

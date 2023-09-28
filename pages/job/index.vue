<template>
  <view>
    <view class="tui-header-banner">
      <view class="tui-banner-bg">
        <!--banner-->
        <view class="tui-banner-box">
          <swiper
            :indicator-dots="true"
            :autoplay="true"
            :interval="5000"
            :duration="150"
            class="tui-banner-swiper"
            :circular="true"
            indicator-color="rgba(255, 255, 255, 0.8)"
            indicator-active-color="#fff"
          >
            <swiper-item
              v-for="(item, index) in banner"
              :key="index"
              @tap.stop="detail"
            >
              <image
                :src="'/static/images/banner/' + item"
                class="tui-slide-image"
                mode="scaleToFill"
              />
            </swiper-item>
          </swiper>
        </view>
      </view>
    </view>
    <view class="tui-block__box">
      <view class="tui-group-name">
        <view class="tui-seckill__box">
          <tui-text
            padding="0rpx 0"
            block
            text="更多招聘信息"
            size="34"
            fontWeight="600"
          ></tui-text>
          <view class="tui-countdown__box">
            <view class="tui-countdown__title">距结束</view>
            <view class="tui-flex__center">
              <tui-countdown
                :time="3800"
                backgroundColor="transparent"
                borderColor="transparent"
                color="#EB0909"
                colonColor="#EB0909"
              ></tui-countdown>
            </view>
          </view>
        </view>
        <view class="tui-more__box" @tap="moreCompany">
          <text>更多</text>
          <tui-icon
            name="arrowright"
            :size="36"
            unit="rpx"
            color="#999"
          ></tui-icon>
        </view>
      </view>
      <scroll-view scroll-x>
        <view class="tui-goods__list">
          <view
            v-for="(item, index) in companyInfoList"
            :key="index"
            class="tui-company-item"
            @tap="moreDetail(item)"
          >
            <view class="tui-new-comp-info">
              <tui-image-group
                :imageList="[
                  {
                    src: item.logo,
                  },
                ]"
                isGroup
                width="80rpx"
                height="80rpx"
              ></tui-image-group>
              <view class="tui-recru-info-text">
                <tui-text block :text="item.companyName" size="30"></tui-text>
                <tui-text
                  block
                  :text="`${100}+ 内推岗位`"
                  size="22"
                  type="gray"
                ></tui-text
              ></view>
            </view>
            <view class="job-company-detail">
              <!-- <text>详情</text> -->
              <tui-icon
                name="arrowright"
                :size="30"
                unit="rpx"
                color="#999"
              ></tui-icon>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="job-card" v-for="item in intershipList" :key="item.id">
      <tui-card
        :title="{
          text: item.positionName,
          size: 32,
          color: 'black',
        }"
        :isHot="true"
        :tag="{
          text:
            !!item.salary && !!item.salaryType
              ? `${item.salary}元/${
                  getTargetElement(salaryType, item.salaryType.value)?.label
                } `
              : '薪资面议',
          size: 26,
          color: '#f64',
        }"
        @tap="toJobDetail(item)"
      >
        <template v-slot:body>
          <view class="intership-body">
            <view class="course-list-item-tag">
              <tui-tag
                type="light-green"
                v-if="item.location"
                margin="0 14rpx 0 0"
                padding="10rpx"
                size="24rpx"
                >{{
                  Array.isArray(item.location)
                    ? item.location.join("/")
                    : item.location
                }}</tui-tag
              >
              <tui-tag
                v-if="item.property"
                type="light-green"
                margin="0 14rpx 0 0"
                padding="10rpx"
                size="24rpx"
                >{{ item.property?.label }}</tui-tag
              >
              <tui-tag
                v-if="item.experience"
                type="light-green"
                margin="0 14rpx 0 0"
                padding="10rpx"
                size="24rpx"
                >{{ item.experience?.label }}</tui-tag
              >
              <tui-tag
                v-if="item.degree"
                type="light-green"
                margin="0 14rpx 0 0"
                padding="10rpx"
                size="24rpx"
                >{{ item.degree?.label }}</tui-tag
              >
            </view>
            <view class="intership-body-date">{{
              dayjs(item.createTime).format("YYYY-MM-DD")
            }}</view></view
          >
        </template>
        <template v-slot:footer>
          <view class="tui-footer-job-info">
            <view class="tui-new-job-info">
              <tui-image-group
                :imageList="[
                  {
                    src: item.companyInfo.logo,
                  },
                ]"
                isGroup
                width="80rpx"
                height="80rpx"
              ></tui-image-group>
              <view class="tui-recru-info-text">
                <tui-text block :text="item.company" size="30"></tui-text>
                <tui-text
                  block
                  :text="`${item.companyInfo.market.label} | ${item.companyInfo.scale.label} | ${item.companyInfo.sectorNumber.label}`"
                  size="22"
                  type="gray"
                ></tui-text
              ></view>
            </view>
            <view class="tui-right-job-info">
              <tui-tag
                type="danger"
                padding="8rpx"
                shape="circle"
                size="20rpx"
                :v-if="
                  dayjs(item.createTime).format('YYYY-MM-DD') ===
                  dayjs(new Date()).format('YYYY-MM-DD')
                "
                >最新</tui-tag
              >
              <tui-tag
                v-if="item.isFree ?? true"
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
      <tui-loading v-if="loading" text="加载中..."></tui-loading>
    </view>
    <tui-loadmore v-if="loadding" :index="3" type="red"></tui-loadmore>
  </view>
</template>

<script>
import { salaryType } from "@/common/contant";
import { getTargetElement } from "@/common/utils";
import { getPageListPost } from "@/common/apis/CompanyInfoController";
import { internshipPositionGetPageListPOST } from "@/common/apis/intership-search-list";
import dayjs from "dayjs";
export default {
  async onLoad() {
    this.loading = true;
    try {
      const company_data = await getPageListPost({
        pageNum: 1,
        pageSize: 50,
      });
      this.companyInfoList = company_data.data;
      const data = await internshipPositionGetPageListPOST({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      });
      this.intershipList = data.data;
      this.intershipList = this.intershipList.map((i) => {
        return {
          ...i,
          companyInfo: getTargetElement(
            this.companyInfoList,
            i.companyId,
            "id"
          ),
        };
      });
      if (data.data.length < this.pageSize) {
        this.pullUpOn = false;
      }
      this.pageNum = this.pageNum + 1;
      this.pageInfo = data.pageInfo;
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  },
  data() {
    return {
      loading: false,
      loadding: false,
      dayjs,
      companyInfoList: [],
      intershipList: [],
      pageNum: 0,
      pageSize: 10,
      getTargetElement,
      salaryType,
      pageInfo: {
        page: 0,
        pageSize: 0,
        totalCount: 0,
      },
      pullUpOn: true,
      banner: ["a.png", "b.png", "c.png", "d.png"],
    };
  },
  methods: {
    moreCompany: function () {
      uni.navigateTo({
        url: "/pages/job/companyInfo/index",
      });
    },
    moreDetail: function (e) {
      uni.navigateTo({
        url: `/pages/job/companyDetail/index?id=${e.id}`,
      });
    },
    toJobDetail(item) {
      uni.navigateTo({
        url: `/pages/job/jobInfo/index?id=${item.id}`,
      });
    },
  },
  onPullDownRefresh: async function () {
    if (!this.pullUpOn) {
      uni.showToast({
        title: "无更多内容",
        duration: 1000,
      });
      uni.stopPullDownRefresh();
    }
    this.loadding = true;
    const data = await internshipPositionGetPageListPOST({
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    });
    if (data.data.length < this.pageSize) {
      this.loadding = false;
      this.pullUpOn = false;
      uni.stopPullDownRefresh();
    } else {
      let loadData = data.data;
      loadData = loadData.map((i) => {
        return {
          ...i,
          companyInfo: getTargetElement(
            this.companyInfoList,
            i.companyId,
            "id"
          ),
        };
      });
      this.intershipList = loadData;

      this.loadding = false;
      uni.stopPullDownRefresh();
    }
  },

  onReachBottom: async function () {
    if (!this.pullUpOn) {
      uni.showToast({
        title: "到底了",
        duration: 1000,
      });
    }
    this.loadding = true;
    const data = await internshipPositionGetPageListPOST({
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    });
    if (data.data.length < this.pageSize) {
      this.loadding = false;
      this.pullUpOn = false;
    } else {
      let loadData = data.data;
      loadData = loadData.map((i) => {
        return {
          ...i,
          companyInfo: getTargetElement(
            this.companyInfoList,
            i.companyId,
            "id"
          ),
        };
      });
      this.intershipList = this.intershipList.concat(loadData);
      this.pageNum = this.pageNum + 1;
      this.loadding = false;
    }
  },
};
</script>

<style lang="less">
page {
  background-color: rgb(245, 246, 248);
}
.job-card {
  margin-bottom: 20rpx;
}
.tui-header-right {
  font-family: monospace !important;
}
.intership-body {
  display: flex;
  justify-content: space-between;
  padding: 0 24rpx;
  align-items: center;
  &-date {
    color: #9c9c9c;
    font-size: 28rpx;
  }
}
.course-list-item-tag {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 10rpx 0;
  color: rgb(185, 186, 188);
}
.tui-new-job-info {
  height: 80rpx;
  width: 70%;
  display: flex;
  justify-content: left;
  padding: 20rpx 24rpx;
  border-radius: 10rpx;
}
.tui-new-comp-info {
  height: 80rpx;
  width: 280rpx;
  display: flex;
  justify-content: left;
  padding: 20rpx 10rpx;
  border-radius: 10rpx;
} /*秒杀商品*/
.tui-block__box {
  padding: 0 25rpx 25rpx;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 20rpx;
  overflow: hidden;
  margin: 100rpx 20rpx 20rpx 20rpx;
}
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
.tui-countdown__title {
  width: 100rpx;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eb0909;
  flex-shrink: 0;
  font-size: 24rpx;
  line-height: 24rpx;
}

.tui-flex__center {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
} /*秒杀商品*/

.tui-more__box {
  display: flex;
  align-items: center;
  font-weight: 400;
  color: #999;
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
  width: 500rpx;
  height: 130rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
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
.tui-company-item {
  margin: 0 4rpx;
  position: relative;
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
.tui-header-banner {
  padding-top: 100rpx;
  box-sizing: border-box;
  /* background: #e41f19; */
}

.tui-banner-bg {
  display: flex;
  height: 120rpx;
  /* background-color: #e41f19; */
  position: relative;
}

.tui-banner-box {
  width: 100%;
  padding: 0 10rpx;
  box-sizing: border-box;
  position: absolute;
  /* overflow: hidden; */
  z-index: 99;
  bottom: -80rpx;
  left: 0;
}

.tui-banner-swiper {
  width: 100%;
  height: 300rpx;
  border-radius: 10rpx;
  overflow: hidden;
  transform: translateY(0);
  background-color: #f8f8f8;
}

.tui-slide-image {
  width: 100%;
  height: 300rpx;
  display: block;
}
.tui-footer-job-info {
  display: flex;
  justify-content: space-between;
}
.tui-right-job-info {
  padding: 40rpx 20rpx 20rpx 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

<template>
  <view>
    <tui-sticky :scrollTop="scrollTop" stickyHeight="530rpx">
      <template v-slot:header>
        <view class="top-sticky-after"></view>
        <view class="top-sticky-container">
          <view class="top-sticky-container-search">
            <!-- <view class="tui-search__bar">
              <view class="tui-searchbox" @tap="search">
                <icon type="search" :size="13" color="#999"></icon>
                <text class="tui-search-text">搜索岗位/公司/行业名称等</text>
              </view>
            </view> -->
            <tui-searchbar
              radius="40rpx"
              placeholder="搜索岗位/公司/行业名称等"
              backgroundColor="rgb(245, 246, 248,0)"
              @search="search"
              @clear="clear"
            ></tui-searchbar>
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
                  :key="`${item.id}-${index}`"
                  class="tui-company-item"
                  @tap="moreDetail(item)"
                >
                  <view class="tui-new-comp-info">
                    <tui-image-group
                      :imageList="[
                        {
                          src: item?.logo,
                        },
                      ]"
                      isGroup
                      width="80rpx"
                      height="80rpx"
                    ></tui-image-group>
                    <view class="tui-recru-info-text">
                      <tui-text
                        block
                        :text="item.companyName.slice(0, 5)"
                        size="30"
                      ></tui-text>
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
       
          <tui-tab
            :tabs="tabLists"
            scroll
            :size="30"
            bold
            color="rgb(31 41 55)"
            selectedColor="rgb(31 41 55)"
            sliderBgColor="#f64"
            sliderRadius="4px"
            @change="change"
            sliderHeight="4px"
            backgroundColor="rgb(245, 246, 248,0)"
            :scale="1.1"
          ></tui-tab>
        </view>
      </template>
    </tui-sticky>

    <view class="job-card" v-for="(item,index) in intershipList" :key="`${item.id}-${index}`">
      <tui-card
        :title="{
          text: item.positionName,
          size: 32,
          color: 'rgb(31 41 55)',
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
                padding="8rpx"
                size="20rpx"
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
                padding="8rpx"
                size="20rpx"
                >{{ item.property?.label }}</tui-tag
              >
              <tui-tag
                v-if="item.experience"
                type="light-green"
                margin="0 14rpx 0 0"
                padding="8rpx"
                size="20rpx"
                >{{ item.experience?.label }}</tui-tag
              >
              <tui-tag
                v-if="item.degree"
                type="light-green"
                margin="0 14rpx 0 0"
                padding="8rpx"
                size="20rpx"
                >{{ item.degree?.label }}</tui-tag
              >

              <tui-tag
                v-if="item.jobType"
                type="light-green"
                margin="0 14rpx 0 0"
                padding="8rpx"
                size="20rpx"
                >{{ item.jobType?.label }}</tui-tag
              >
            </view>
            <view class="intership-body-date">{{
              getFormateDateTime(item.createTime)
            }}</view></view
          >
        </template>
        <template v-slot:footer>
          <view class="tui-footer-job-info">
            <view class="tui-new-job-info">
              <tui-image-group
                :imageList="[
                  {
                    src: item.companyInfo?.logo,
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
                  :text="`${item.companyInfo?.market.label} | ${item.companyInfo?.scale.label} | ${item.companyInfo?.sectorNumber.label}`"
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
                v-if="
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
import { getTargetElement, getFormateDateTime } from "@/common/utils";
import { getPageListPost } from "@/common/apis/CompanyInfoController";
import { internshipPositionGetPageListPOST } from "@/common/apis/intership-search-list";
import dayjs from "dayjs";


const proprtyList=['全部', '实习', '校招']
const searchTabList=['职位','公司']
export default {
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
      property: this.property,
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
      property: this.property,
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
        property: this.property,
      });
      this.intershipList = data.data.map((i) => {
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

  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },

  data() {
    return {
      loading: false,
      loadding: false,
      dayjs,
      getFormateDateTime,
      scrollTop: 0,
      companyInfoList: [],
      intershipList: [],
      pageNum: 1,
      pageSize: 10,
      property: undefined,
      positionName:undefined,
      getTargetElement,
      salaryType,
      pageInfo: {
        page: 1,
        pageSize: 0,
        totalCount: 0,
      },
      pullUpOn: true,
      banner: ["a.png", "b.png", "c.png", "d.png"],
      selectH: 0,
      tabLists:proprtyList,
      dropdownList: [
        {
          name: "价格升序",
          selected: false,
        },
        {
          name: "价格降序",
          selected: false,
        },
      ],tabIndex: 0, //顶部筛选索引
    };
  },

  methods: {
    moreCompany: function () {
      uni.navigateTo({
        url: "/pages/job/companyInfo/index",
      });
    },
    search: function (value) {
      this.getSearchInterShipInfo(value);
    },
    clear:function(){
      this.getSearchInterShipInfo(undefined);
    },
    getSearchInterShipInfo:async function(value){
      this.positionName = value ? value.value : undefined;
      this.loading = true;
      try {
        const data = await internshipPositionGetPageListPOST({
          pageNum: 1,
          pageSize: this.pageSize,
          property: this.property,
          positionName:this.positionName 
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
        this.pageNum = 1;
        this.pageInfo = data.pageInfo;
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
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
    screen: function (e) {
      this.hideDropdownList();
      let index = e.currentTarget.dataset.index;
      if (index == -1 || index == 1) {
        this.tabIndex = index;
      } else if (index == 0) {
        this.showDropdownList();
      } else if (index == 2) {
        this.isList = !this.isList;
      } else if (index == 3) {
        this.drawer = true;
      }
    },
    showDropdownList: function () {
      this.selectH = 176;
    },
    hideDropdownList: function () {
      this.selectH = 0;
    },
    async change(value) {
      this.property = value.index ? value.index : undefined;
      this.loading = true;
      try {
        const data = await internshipPositionGetPageListPOST({
          pageNum: 1,
          pageSize: this.pageSize,
          property: this.property,
          positionName:this.positionName 
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
        this.pageNum = 1;
        this.pageInfo = data.pageInfo;
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  }
};
</script>

<style lang="less">
page {
  background-color: rgb(245, 246, 248);
}

// 吸顶容器
.top-sticky-container {
  height: 444rpx;
  width: 100%;
  padding-top: 76rpx;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  &-search {
    width: 480rpx;
  }
}
//search
// .tui-search__bar {
//   width: 100%;
//   background: rgba(245, 246, 248, 0);
//   padding: 15rpx 20rpx 25rpx 20rpx;
//   box-sizing: border-box;
// }

// .tui-searchbox {
//   width: 100%;
//   height: 64rpx;
//   margin-right: 30rpx;
//   border-radius: 15px;
//   font-size: 24rpx;
//   background: #fff;
//   padding: 6rpx 20rpx;
//   box-sizing: border-box;
//   color: #999;
//   display: flex;
//   align-items: center;
//   overflow: hidden;
// }

// .tui-search-text {
//   padding-left: 16rpx;
// }

/**screen start */
.tui-screen__box {
  width: 100%;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 28rpx;
  color: #333;
  position: relative;
  background: #ffffff00;
}
.tui-screen-item {
  height: 28rpx;
  line-height: 28rpx;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tui-btmItem-active {
  background-color: #fcedea !important;
  color: #e41f19;
  font-weight: bold;
  position: relative;
}

.tui-btmItem-active::after {
  content: "";
  position: absolute;
  border: 1rpx solid #e41f19;
  width: 100%;
  height: 100%;
  border-radius: 40rpx;
  left: 0;
  top: 0;
}

.tui-addr-left {
  padding-left: 6rpx;
}

.tui-bold {
  font-weight: bold;
}

.tui-active {
  color: #e41f19;
}
/**screen end */

.top-sticky-after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 222px;
  border-radius: 50%;
  background: rgba(0, 249, 203, 0.2);
  filter: blur(30px);
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
  margin: 0 25rpx;
  box-sizing: border-box;
  background-color: #ffffff60;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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
.tab-stick-box {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(80rpx);
}
</style>
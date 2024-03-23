<template>
  <view class="container">
    <!--header-->
    <!--加载loadding-->
    <tui-loadmore v-if="pullUpOn" :index="1"></tui-loadmore>
    <view
      class="home-header"
      :style="{
        background: 'url(' + webURLBase + '/home/index-bg.svg)',
      }"
    >
      <view class="home-header-title">优加 实习</view>
      <view class="home-header-desc">找实习，进大厂，修改简历，找我就对了</view>
      <view class="home-header-service">
        <view
          v-for="item in serviceItem"
          :key="item.activeKey"
          :class="[
            'home-header-service-item',
            {
              active: activeKey === item.activeKey,
            },
          ]"
          @tap="handleClickService(item.activeKey)"
          >{{ item.title }}</view
        >
      </view>
      <view class="home-header-search">
        <view class="home-header-search-icon"
          ><tui-icon name="search" color="#368CEF" size="24"></tui-icon>
        </view>
        <view>请输入公司名称，支持岗位+城市名称组合查询</view>
      </view>
    </view>
    <view class="home-content">
      <!-- 公告 -->
      <view class="home-content-news">
        <tui-roll-news
          :list="list"
          background="#eef5ff50"
          radius="15rpx 15rpx 0 0"
        >
          <view class="tui-icon__box">
            <tui-icon
              name="news"
              :size="40"
              unit="rpx"
              color="#ff4906"
            ></tui-icon>
          </view>
        </tui-roll-news>
      </view>
      <!-- 滑动内容 -->
      <view class="home-content-swiper">
        <swiper
          @change="bannerChange"
          circular
          :current="activeKey"
          :indicator-dots="false"
          :interval="4000"
          :duration="150"
          :style="{ height: '300px' }"
        >
          <block v-for="(item, index) in serviceItem" :key="index">
            <swiper-item>
              <view class="home-content-item">
                <view
                  v-for="ele in item.content"
                  :key="ele.url"
                  :data-key="item.activeKey"
                  @tap="resumeEdit"
                  class="home-content-item-container"
                >
                  <img :src="webURLBase + '/home/' + ele.url" alt="" />
                  <view class="home-content-item-container-title">{{
                    ele.desc
                  }}</view>
                </view>
              </view>
            </swiper-item>
          </block>
        </swiper>
        <tui-swiper-dot
          :type="2"
          :count="count"
          :current="current"
        ></tui-swiper-dot>
      </view>
    </view>

    <view class="tui-container-a">
      <view class="category-active" @tap="activePage">
        <image
          src="https://mxm1923893223-ulteh-1302287111.tcloudbaseapp.com/activity/banner.png"
          class="tui-img__coupon"
        ></image>
        <view class="coupon-contant">
          <view class="coupon-contant-text">
            <view class="coupon-contant-text-title"> 24校招/实习特训营群 </view>
            <view class="coupon-contant-text-sub">
              300+名企岗位内推offer轻松拿！
            </view>
          </view>
          <view class="coupon-contant-btn">加入+</view>
        </view>
      </view>
      <view class="tui-title-contant">
        <tui-text size="35" fontWeight="500" block text="实习内推"></tui-text>
        <tui-button
          width="140rpx"
          size="24"
          shape="circle"
          type="gray-primary"
          height="50rpx"
          disabledGray
          @tap="moreCompany"
          >更多公司</tui-button
        >
      </view>
      <view class="tui-block__box">
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
                      src: item.logo,
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
      <!-- 头部 -->

      <view class="tui-product-box">
        <!--简历模板-->
        <view class="tui-block__box">
          <view class="tui-group-name" @tap="more">
            <view>
              <text>热招岗位</text>
              <text class="tui-sub__desc">大家都在投递</text>
            </view>
            <view class="tui-more__box">
              <tui-button
                width="140rpx"
                size="24"
                shape="circle"
                type="gray-warning"
                height="50rpx"
                disabledGray
                @tap="more"
                >更多岗位
                <tui-icon
                  name="arrowright"
                  :size="30"
                  unit="rpx"
                  color="#999"
                ></tui-icon
              ></tui-button>
            </view>
          </view>
        </view>
      </view>
      <view
        class="job-card"
        v-for="(item, index) in intershipList"
        :key="`${item.id}-${index}`"
      >
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
                ><tui-tag
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
      </view>
    </view>

    <tui-footer
      :fixed="false"
      copyright="Copyright © 2022-2025 Greenet-TC."
    ></tui-footer>

    <!-- </view> -->
  </view>
</template>

<script>
import { getPageListPost } from "@/common/apis/CompanyInfoController";
import { internshipPositionGetPageListPOST } from "@/common/apis/intership-search-list";
import { getBaseInfo, setLoginStatus } from "../../common/login";
import { SERVICERTYPE, serviceType } from "../../common/contant";
import indexImg from "../../static/images/banner/index-bg.svg";
import { salaryType } from "@/common/contant";
import dayjs from "dayjs";
import {
  WEBURL,
  getTargetElement,
  getFormateDateTime,
  isPreLogin,
  getToken,
} from "@/common/utils";

export default {
  // async onShow() {
  //   if (!getToken()) {
  //     setTimeout(() => {
  //       if (!getToken()) {
  //         this.toLogin();
  //       }
  //     }, 1000);
  //     c;
  //   }
  // },

  async onLoad() {
    this.share.title = "你距离实习更近";
    setTimeout(async () => {
      if (getToken()) {
        getBaseInfo();
        setLoginStatus(true);
        const _data = await getPageListPost({
          pageNum: 1,
          pageSize: 50,
        });
        this.companyInfoList = _data.data;
        const data = await internshipPositionGetPageListPOST({
          pageNum: 1,
          pageSize: 5,
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
      }
    }, 1000);
  },

  onPullDownRefresh: function () {
    return;
    // let loadData = JSON.parse(JSON.stringify(this.productList));
    // loadData = loadData.splice(0, 10);
    // this.productList = loadData;
    // this.pageIndex = 1;
    // this.pullUpOn = true;
    // this.loadding = false;
    // uni.stopPullDownRefresh();
  },

  onReachBottom: function () {
    if (!this.pullUpOn) return;
    this.loadding = true;
    if (this.pageIndex == 4) {
      this.loadding = false;
      this.pullUpOn = false;
    } else {
      let loadData = JSON.parse(JSON.stringify(this.productList));
      loadData = loadData.splice(0, 10);
      if (this.pageIndex == 1) {
        loadData = loadData.reverse();
      }
      this.productList = this.productList.concat(loadData);
      this.pageIndex = this.pageIndex + 1;
      this.loadding = false;
    }
  },

  // 调用wx.getUserProfile接口

  data() {
    return {
      banner: ["0.png", "1.png", "2.png", "3.png"],
      //list 数据
      list: [
        {
          id: 1,
          title: "24年春招开始啦，100+企业热招中",
        },
        {
          id: 2,
          title: "优加实习简历修改特训营，正在热招中....",
        },
        {
          id: 3,
          title: "实习不知道找哪里？哪里找？简历怎么修改，找我们",
        },
      ],
      webURLBase: WEBURL,
      companyInfoList: [],
      intershipList: [],
      pageIndex: 1,
      loadding: false,
      pullUpOn: false,
      opacity: 1,
      SERVICERTYPE,
      activeKey: SERVICERTYPE.MODIFY,
      dayjs,
      salaryType,
      showActionSheet: false,
      getFormateDateTime,
      getTargetElement,
      indexImg,
      itemList: [
        {
          text: "登录",
          color: "#ff4906",
        },
      ],
      current: 0,
      count: 0,
      serviceItem: [
        {
          title: "简历优化",
          activeKey: SERVICERTYPE.MODIFY,
          content: [
            {
              url: "m-1.png",
              title: "大厂学姐教你写简历",
              desc: "【优秀学姐】冯学姐毕业于华中科技大学，曾在华为、腾讯、京东实习，简历修改经验丰富",
            },
            {
              url: "m-2.png",
              title: "专业导师，经验丰富，修改简历1500+简历",
              desc: "【专业导师】经验丰富，修改简历1500+简历",
            },
            {
              url: "m-3.png",
              title: "简历没有内容?学姐教你写简历方法论",
              desc: "【方法论】简历没有内容?学姐教你写简历方法论",
            },
            {
              url: "m-4.png",
              title: "大厂学姐教你写简历",
              desc: "【超强优化】简历内容空白，如何将校园尽力包装？",
            },
          ],
        },
        {
          title: "实习规划",
          activeKey: SERVICERTYPE.REFERRAL,
          content: [
            {
              url: "r-1.png",
              title: "大厂学姐教你写简历",
              desc: "【获取资源】认识不同的人，不同的资源",
            },
            {
              url: "r-2.png",
              title: "大厂学姐教你写简历",
              desc: "【丰富活动】担心实习生活枯燥？每周联谊活动丰富有趣",
            },
            {
              url: "r-3.png",
              title: "大厂学姐教你写简历",
              desc: "【交流学习】不同公司/学校/城市学生一起交流实习内容，互相学习",
            },
            {
              url: "r-4.png",
              title: "大厂学姐教你写简历",
              desc: "【实习租房】担心实习租房被坑？优加租房靠谱",
            },
          ],
        },
        {
          title: "模拟面试",
          activeKey: SERVICERTYPE.INTERVIEW,
          content: [
            {
              url: "i-1.png",
              title: "大厂学姐教你写简历",
              desc: "【优秀导师】曾在华为、腾讯、京东实习，简历修改经验丰富",
            },
            {
              url: "i-2.png",
              title: "大厂学姐教你写简历",
              desc: "【总结复盘】模拟面试，常见问题总结，自我介绍联系，复盘总结",
            },
            {
              url: "i-3.png",
              title: "大厂学姐教你写简历",
              desc: "【范围广】大佬学姐亲自模拟面试，三节课全方位覆盖",
            },
            {
              url: "i-4.png",
              title: "大厂学姐教你写简历",
              desc: "【冲刺班】校招/实习冲刺班，迅速总结、定位、介绍实信息。",
            },
          ],
        },
        {
          title: "实习内推",
          activeKey: SERVICERTYPE.RENT,
          content: [
            {
              url: "p-1.png",
              title: "大厂学姐教你写简历",
              desc: "【在职内推】，学长学姐直推业务团队，offer率高",
            },
            {
              url: "p-2.png",
              title: "大厂学姐教你写简历",
              desc: "【训练营】实习项目训练，涵盖多个岗位",
            },
            {
              url: "p-3.png",
              title: "大厂学姐教你写简历",
              desc: "【方法论】企业级项目，接触最新企业方法论",
            },
            {
              url: "p-4.png",
              title: "大厂学姐教你写简历",
              desc: "【保offer】保offer班，3周保证获得offer",
            },
          ],
        },
      ],
    };
  },
  methods: {
    resumeEdit: function (e) {
      uni.navigateTo({
        url: `/pages/index/servier-select/servier-select?type=${
          e.currentTarget.dataset.key + 1
        }`,
      });
    },
    getUserProfile() {
      wx.login({
        success(res) {
          let code = res.code;
          wx.getUserProfile({
            lang: "en",
            desc: "获取授权",
            success: function (res) {
              console.log(res);
            },
            fail: function (res) {
              console.log("fail-get-userinfo", res);
            },
            complete: function () {
              console.log("complete-get-userinfo");
            },
          });
        },
      });
    },
    moreDetail: function (e) {
      uni.navigateTo({
        url: `/pages/job/companyDetail/index?id=${e.id}`,
      });
    },
    toLogin: function (e) {
      uni.navigateTo({
        url: `/pages/common/login`,
      });
    },
    bannerChange: function (e) {
      this.activeKey = e.detail.current;
      this.current = e.detail.current;
    },
    more: function () {
      uni.switchTab({
        url: "/pages/job/index",
      });
    },
    moreCompany: function () {
      uni.navigateTo({
        url: "/pages/job/companyInfo/index",
      });
    },
    activePage: function () {
      uni.navigateTo({
        url: "/pages/activityPage/schoolRecruitment/index",
      });
    },
    toJobDetail(item) {
      uni.navigateTo({
        url: `/pages/job/jobInfo/index?id=${item.id}`,
      });
    },
    handleClickService(key) {
      this.activeKey = key;
    },
    //隐藏组件
    closeActionSheet: function () {
      this.showActionSheet = false;
    },
  },
};
</script>

<style lang="less">
/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: "阿里妈妈数黑体 Bold";
  font-weight: 700;
  src: url("../../static/font/p8bYj5x5FN0P.woff2") format("woff2"),
    url("../../static/font/p8bYj5x5FN0P.woff") format("woff");
  font-display: swap;
}
page {
  background-color: #f8f8f8;
}

.container {
  padding-bottom: 100rpx;
  color: #333;
}

.home-header {
  box-sizing: border-box;
  height: 700rpx;
  width: 100%;
  padding: 170rpx 28rpx 10rpx 28rpx;
  background-repeat: no-repeat;
  background-size: contain;
  &-title {
    color: #ffffff;
    font-family: "阿里妈妈数黑体 Bold";
    text-align: center;
    font-size: 35px;
  }
  &-desc {
    color: #ffffff;
    text-align: center;
    font-size: 30rpx;
    margin-top: 14rpx;
  }
  &-service {
    display: flex;
    justify-content: space-around;
    color: #ffffff80;
    font-size: 32rpx;
    margin-top: 50rpx;
    &-item {
      &.active {
        position: relative;
        color: #ffffff;
        transition: 0.2s;
        &::after {
          .setBottomLine(#EAEAEA);
          transition: 0.2s;
        }
      }
    }
  }
  &-search {
    display: flex;
    background: #ffffff;
    height: 94rpx;
    border-radius: 15rpx;
    color: #00000050;
    font-size: 28rpx;
    line-height: 100rpx;
    margin-top: 44rpx;
    &-icon {
      padding: 0 11rpx 0 21rpx;
    }
  }
}
.home-content {
  height: 800rpx;
  width: 100%;
  margin-top: -36px;
  border-radius: 17rpx 17rpx 0 0;
  &-news {
    background: #ffffff;
    border-radius: 17rpx 17rpx 0 0;
  }
  &-swiper {
    width: 100%;
    height: 400px;
    padding: 0 20rpx 16rpx 20rpx;
    box-sizing: border-box;
  }
  &-item {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
    &-container {
      width: 340rpx;
      height: 240rpx;
      background: #ffffff;
      margin-bottom: 20rpx;
      border-radius: 17rpx;
      > image {
        width: 340rpx;
        height: 185rpx;
        border-radius: 17rpx 17rpx 0 0;
      }
      &-title {
        display: inline-block;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 24rpx;
        text-align: center;
        margin: 0 10rpx;
      }
    }
  }
}
.setBottomLine(@c: #C7C7C7) {
  content: " ";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -15rpx;
  right: 0;
  height: 5rpx;
  border-radius: 5rpx;
  width: 95rpx;
  background: @c;
  transform-origin: 0 100%;
}
/* #ifdef MP-WEIXIN */

/* #endif */

.tui-container-a {
  background: #ffffff;
}
.tui-block__box {
  width: 100%;
  padding: 0 25rpx 10rpx 25rpx;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 20rpx;
  overflow: hidden;
}

.tui-product-box {
  box-sizing: border-box;
  border-radius: 5px 5px 0 0;
}
.category-active {
  height: 156rpx;
  position: relative;
  margin-top: 20rpx;
  padding: 20px 32rpx 0 32rpx;

  .tui-img__coupon {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 20rpx;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  }
  .coupon-contant {
    position: absolute;
    height: 100%;
    top: 20rpx;
    right: 32rpx;
    width: 545rpx;
    display: flex;
    align-items: center;

    &-text {
      padding: 32rpx 0rpx 32rpx 0;
      flex-shrink: 1;
      &-title {
        font-size: 35rpx;
        font-weight: 600;
        color: #434a79;
        line-height: 1.5;
      }
      &-sub {
        font-size: 28rpx;
        font-weight: 400;
        color: #434a79;
        line-height: 1.5;
      }
    }
    &-btn {
      width: 116rpx;
      height: 56rpx;
      background: #eaeaea;
      border-radius: 26rpx;
      text-align: center;
      align-items: center;
      line-height: 56rpx;
      box-shadow: 0 15px 25px -4px rgba(0, 0, 0, 0.5),
        inset 0 -3px 4px -1px rgba(0, 0, 0, 0.2),
        0 -10px 15px -1px rgba(255, 255, 255, 0.6),
        inset 0 3px 4px -1px rgba(255, 255, 255, 0.2),
        inset 0 0 5px 1px rgba(255, 255, 255, 0.8),
        inset 0 20px 30px 0 rgba(255, 255, 255, 0.2);
      font-weight: 500;
    }
  }
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
}

/*秒杀商品*/

.tui-goods__img {
  max-width: 150rpx;
  max-height: 150rpx;
  display: block;
}

/*秒杀商品*/

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

.tui-title-box {
  font-size: 24rpx;
}

.tui-title-contant {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  margin-top: 20rpx;
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
.tui-footer-box {
  display: block;
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
}
.tui-company-item {
  margin: 0 4rpx;
  position: relative;
}
.tui-new-comp-info {
  height: 80rpx;
  width: 280rpx;
  display: flex;
  justify-content: left;
  padding: 20rpx 10rpx;
  border-radius: 10rpx;
}
.job-card {
  margin-bottom: 20rpx;
  width: 100%;
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
.tui-recru-info-text {
  margin-left: 20rpx;
}
</style>

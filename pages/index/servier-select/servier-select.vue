<template>
  <view class="servier-contant">
    <view class="servier-contant-info">
      <view class="servier-contant-title">
        <view class="num">1</view>
        <view>选择服务内容</view>
      </view>
      <view class="service-info-contant">
        <view
          v-for="(item, index) in serviceType[0].serviceContent"
          :key="item.orderType"
          class="service-info-contant-item"
        >
          <view class="service-item-header">
            <h6>
              {{ item.h6 }}
              <img
                v-if="index === 0 || index === 1"
                src="/static/images/icon/hot.png"
                alt="1"
                class="img"
              />
            </h6>
            <view
              class="service-item-header-detail"
              @tap="setDetailShow(item.orderType)"
              >{{ item.detail.btn }}
              <tui-bubble-popup
                :show="item.detail.show"
                :mask="false"
                position="absolute"
                direction="right"
                @close="topBubble"
                width="400rpx"
                left="-400rpx"
                top="64rpx"
                translateY="-100%"
                triangleRight="-22rpx"
                triangleBottom="32rpx"
                maskBgColor="rgba(0, 0, 0, 0)"
              >
                {{ item.detail.tooltip }}
              </tui-bubble-popup>
            </view>
          </view>
          <tui-overflow-hidden :lineClamp="1" size="24" color="#606060">
            {{ item.desc }}
          </tui-overflow-hidden>
          <view class="service-item-flooter">
            <view class="service-item-flooter-left">
              <view class="course-list-item-intro">
                <view class="course-list-item-intro-price">
                  <span class="span"> ¥{{ item.num }}.00</span>
                  <span class="line-thro">{{ item.preNum }}</span>
                </view>
              </view>
              <view
                ><tui-image-group
                  :imageList="forMate(item.avatar)"
                  isGroup
                  width="26rpx"
                  height="26rpx"
                  distance="-17"
                ></tui-image-group
              ></view>
              <span class="span">{{ item.userNum }}</span>
            </view>
            <view
              class="service-item-flooter-btn"
              :class="{
                'active-btn': orderTyppe.includes(item.orderType),
              }"
              @tap="choseService(item)"
            >
              <p class="p" v-if="orderTyppe.includes(item.orderType)">已</p>
              <i class="i" v-else></i>
              选择
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="servier-contant-info">
      <view class="servier-contant-title">
        <view class="num">2</view>
        <view>基础信息</view>
      </view>
      <view class="service-info-contant">
        <tui-form ref="form">
          <tui-input
            label="姓名"
            radius="20rpx"
            placeholder="请输入姓名"
            v-model="name"
          ></tui-input>
          <tui-input
            label="电话"
            :lineLeft="false"
            placeholder="请输入电话"
            v-model="mobile"
          ></tui-input>
          <tui-input
            label="性别"
            placeholder="请输入性别"
            v-model="name"
          ></tui-input>
          <tui-input
            label="学校"
            :lineLeft="false"
            placeholder="请输入学校"
            v-model="mobile"
          ></tui-input>
          <tui-input
            label="年级"
            :lineLeft="false"
            placeholder="请输入年级"
            v-model="mobile"
          ></tui-input>
          <tui-input
            label="专业"
            :lineLeft="false"
            placeholder="请输入专业"
            v-model="mobile"
          ></tui-input>
        </tui-form>
      </view>
    </view>
    <view class="servier-contant-info">
      <view class="servier-contant-title">
        <view class="num">3</view>
        <view>其他信息</view>
      </view>
      <view class="service-info-contant">
        <tui-form ref="form">
          <tui-input
            label="最高学历"
            radius="20rpx"
            placeholder="请选择最高学历"
            v-model="name"
          ></tui-input>
          <tui-input
            label="目标行业"
            :lineLeft="false"
            placeholder="请选择目标行业"
            v-model="mobile"
          ></tui-input>
          <tui-input
            label="是否留学"
            placeholder="请选择是否留学"
            v-model="name"
          ></tui-input>
          <tui-input
            label="是否加急"
            :lineLeft="false"
            placeholder="请选择是否加急"
            v-model="mobile"
          ></tui-input>
          <tui-input
            label="简历语言"
            :lineLeft="false"
            placeholder="请选择简历语言"
            v-model="mobile"
          ></tui-input>
          <tui-input
            label="求职经验"
            :lineLeft="false"
            placeholder="请选择求职经验"
            v-model="mobile"
          ></tui-input> </tui-form
      ></view>
    </view>
    <view class="servier-contant-info">
      <view class="servier-contant-title">
        <view class="num">4</view>
        <view>服务流程</view>
      </view>
      <view class="service-info-contant">
        <tui-steps
          :type="1"
          :items="items"
          spacing="290rpx"
          :activeSteps="4"
          activeColor="#ff813a"
          :titleSize="24"
          :descSize="20"
        ></tui-steps>
      </view>
    </view>
    <view class="servier-contant-info">
      <view class="servier-contant-title">
        <view class="num">5</view>
        <view>如果你有以下疑问</view>
      </view>
      <view class="service-info-contant">
        <block v-for="(item, index) in dataList" :key="index">
          <tui-collapse :index="index" :current="current" @click="change">
            <template v-slot:title>
              <tui-list-cell>{{ item.name }}</tui-list-cell>
            </template>
            <template v-slot:content>
              <uParse :content="item.intro" />
            </template>
          </tui-collapse>
        </block>
      </view>
    </view>
    <tui-footer
      :fixed="false"
      class="service-tui-footer"
      copyright="Copyright © 2022-2025 Greenet-TC."
    ></tui-footer>
    <!--tabbar-->
    <view class="tui-tabbar">
      <view class="tui-checkAll">
        <tui-radio-group>
          <view class="tui-checkbox" @tap="radioChange()">
            <tui-radio
              :checked="checked"
              color="#ff4f4c"
              checkMarkColor="#fff"
            />

            <text class="tui-checkbox-pl">全选</text>
          </view>
        </tui-radio-group>
        <view class="tui-total-price"
          >合计:<text class="tui-bold">￥{{ count }}</text>
        </view>
      </view>
      <view>
        <tui-button
          width="200rpx"
          height="70rpx"
          :size="30"
          type="danger"
          shape="circle"
          @click="btnPay"
          >去结算({{ orderTyppe.length }})</tui-button
        >
      </view>
    </view>
    <!-- <tui-toast ref="toast"></tui-toast> -->
  </view>
</template>
<script>
import uParse from "@/components/uni/uParse/src/wxParse";
import { serviceType, items, dataList, show } from "@/common/contant";
export default {
  components: { uParse },
  onLoad: function (option) {
    this.orderTyppe = [option.type]; //打印出上个页面传递的参数。
    this.serviceType[0].serviceContent.forEach((i) => {
      if (i.orderType === String(option.type)) {
        this.count = this.count + i.num;
      }
    });
  },
  data() {
    return {
      pageIndex: 1,
      type: "1",
      count: 0,
      loadding: false,
      pullUpOn: false,
      opacity: 1,
      orderTyppe: ["1"],
      checked: false,
      current: 0,
      items,
      show,
      dataList,
      serviceType: serviceType,
    };
  },
  methods: {
    btnPay: function () {
      if (!this.orderTyppe.length) {
        // let params = {
        //   title: "至少选择一个服务",
        // };
        // this.$refs.toast.show(params);
        uni.showToast({
          icon: "none",
          title: "至少选择一个服务",
          duration: 3000,
          position: "center",
        });
        return;
      }
      uni.setStorageSync("orderTyppe", this.orderTyppe);
      uni.setStorageSync("orderCount", this.count);
      uni.navigateTo({
        url: "/pages/index/confirm-order/confirm-order",
      });
    },
    setDetailShow(orderType) {
      this.serviceType[0].serviceContent.map((i) => {
        if (i.detail.show) {
          i.detail.show = false;
          return;
        }
        if (orderType === i.orderType) {
          i.detail.show = true;
        } else {
          i.detail.show = false;
        }
      });
    },
    topBubble() {
      this.serviceType[0].serviceContent.map((i) => {
        i.detail.show = false;
      });
    },
    forMate(imageList) {
      return imageList.map((i, index) => {
        return {
          src: i,
          id: index + 1,
        };
      });
    },
    choseService(e) {
      let a = this.orderTyppe;
      if (a.includes(e.orderType)) {
        a = a.filter((item) => {
          if (e.orderType === item) {
            this.count = this.count - e.num;
          }
          return item !== e.orderType;
        });
      } else {
        this.count = this.count + e.num;
        a = [...a, String(e.orderType)];
      }
      this.orderTyppe = a;
      if (
        this.orderTyppe.length === this.serviceType[0].serviceContent.length
      ) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
    radioChange(e) {
      if (this.checked) {
        this.checked = !this.checked;
        this.count = 0;
        this.orderTyppe = [];
      } else {
        this.checked = !this.checked;
        this.count = 0;
        this.serviceType[0].serviceContent.forEach((i) => {
          this.count = this.count + i.num;
          if (!this.orderTyppe.includes(i.orderType)) {
            this.orderTyppe.push(i.orderType);
          }
        });
      }
    },
    change(e) {
      this.current = e.index;
    },
  },
};
</script>
<style>
page {
  background-color: #f7f7f7;
}
.servier-contant {
  margin: 0 auto;
  height: auto;
  width: 95%;
}
.servier-contant-info {
  background: #fff;
  border-radius: 10rpx;
  box-shadow: rgba(0, 0, 0, 0.04) 0rpx 3rpx 5rpx;
  padding: 20rpx 30rpx 20rpx 100rpx;
  margin-top: 5rpx;
  margin-bottom: 30rpx;
}
.servier-contant-title {
  font-size: 36rpx;
  color: #404040;
  font-weight: 600;
  position: relative;
}
.num {
  width: 32px;
  position: absolute;
  height: 19px;
  line-height: 19px;
  top: 3px;
  font-size: 18px;
  left: -40px;
  border-radius: 10px 6px 0 10px;
  background: #ff4f4f;
  background-image: linear-gradient(90deg, #ff813a, #ff3d3d);
  color: #fff;
  text-align: center;
}
.service-info-contant {
  margin-top: 32rpx;
  margin-bottom: 12rpx;
  margin-left: -60rpx;
}
.service-info-contant-item {
  padding: 16rpx 20rpx 20rpx;
  border-radius: 6rpx;
  border: 1rpx solid #ececec;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: #fff;
  cursor: pointer;
  margin-bottom: 20rpx;
}
.service-item-header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-bottom: 10rpx;
}
h6 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 30rpx;
  font-weight: 500;
  color: #404040;
  line-height: 44rpx;
}
.img {
  width: 100rpx;
  height: 40rpx;
  margin-left: 20rpx;
}

.service-item-header-detail {
  position: relative;
  width: 96rpx;
  height: 44rpx;
  line-height: 44rpx;
  background: #f9f9f9;
  border-radius: 22rpx;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 26rpx;
  font-weight: 400;
  color: #bcbcbc;
  text-align: center;
}
.service-item-header-detail:active {
  background: #505667;
}
.service-item-flooter {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.service-item-flooter-left {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
span {
  font-size: 22rpx;
  font-weight: 400;
  color: #9c9c9c;
  line-height: 22rpx;
  width: 180rpx;
  margin-left: 10rpx;
}
.span {
  font-size: 22rpx;
  font-weight: 400;
  color: #9c9c9c;
  line-height: 22rpx;
  width: 180rpx;
  margin-left: 10rpx;
}
.service-item-flooter-btn {
  width: 152rpx;
  height: 56rpx;
  line-height: 52rpx;
  font-size: 26rpx;
  border-radius: 28rpx;
  text-align: center;
  cursor: pointer;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #ff4f4c;
  border: 1rpx solid #ff4f4c;
  background: #fff;
  position: relative;
  padding-left: 28rpx;
}
.service-item-flooter-btn.active-btn {
  background: #ff4f4c;
  border: 1rpx solid #ff4f4c;
  color: #fff;
}
.service-item-flooter-btn .i {
  font-size: 20rpx;
  color: #ff4f4c;
  font-family: "iconfont" !important;
  font-size: 30rpx;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.service-item-flooter-btn .i::before {
  content: "+";
  position: absolute;
  left: 30rpx;
  top: -2rpx;
}
.service-item-flooter-btn .p {
  position: absolute;
  left: 39rpx;
  top: 0rpx;
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
  justify-content: space-between;
  padding: 0 30rpx;
  box-sizing: border-box;
  font-size: 24rpx;
  z-index: 9999;
}
.tui-tabbar::before {
  content: "";
  width: 100%;
  border-top: 1rpx solid #d9d9d9;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.tui-checkAll {
  display: flex;
  align-items: center;
}

.tui-checkbox-pl {
  padding-left: 15rpx;
  font-size: 28rpx;
}

.tui-total-price {
  padding-left: 30rpx;
  font-size: 30rpx !important;
}
.tui-bold {
  font-weight: bold;
}
.service-other-process {
  width: 100%;
  height: 120px;
  margin-top: 40px;
}
.service-tui-footer {
  margin-bottom: 50rpx;
}
.service-question-desc {
  color: #9c9c9c;
  font-size: 20rpx;
  margin-top: -10rpx;
  line-height: 20rpx;
}
.red-text {
  color: #ff4f4c;
}

.course-list-item-intro {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  margin-right: 28rpx;
}
.course-list-item-intro .span {
  font-size: 32rpx;
  color: #ff4f4c;
  position: relative;
  /* margin-right: 8rpx; */
}
.course-list-item-intro .line-thro {
  font-size: 24rpx;
  position: relative;
  font-weight: 400;
  color: #9c9c9c;
  text-decoration: line-through;
}
</style>

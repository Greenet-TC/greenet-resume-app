<template>
  <view class="container">
    <!--list-->
    <view class="tui-product-list" :style="{ marginTop: px(dropScreenH + 18) }">
      <view class="tui-product-container">
        <template v-for="(item, index) in productList">
          <!--商品列表-->
          <view
            :key="index"
            v-if="(index + 1) % 2 != 0 || isList"
            class="tui-pro-item"
            :class="[isList ? 'tui-flex-list' : '']"
            hover-class="tui-hover"
            :hover-start-time="150"
            @tap="detail"
          >
            <image
              :src="'/static/images/mall/product/' + item.img + '.jpg'"
              class="tui-pro-img"
              :class="[isList ? 'tui-proimg-list' : '']"
              mode="widthFix"
            />
            <view class="tui-pro-content">
              <view class="tui-pro-tit">{{ item.name }}</view>
              <view>
                <view class="tui-pro-price">
                  <text class="tui-sale-price">￥{{ item.sale }}</text>
                  <text class="tui-factory-price">￥{{ item.factory }}</text>
                </view>
                <view class="tui-pro-pay">{{ item.payNum }}人付款</view>
              </view>
            </view>
          </view>
          <!--商品列表-->
        </template>
      </view>
      <view
        class="tui-product-container"
        :class="{ 'tui-pro--hidden': isList }"
      >
        <template v-for="(item, index) in productList">
          <!--商品列表-->
          <view
            :key="index"
            v-if="(index + 1) % 2 == 0"
            class="tui-pro-item"
            :class="[isList ? 'tui-flex-list' : '']"
            hover-class="tui-hover"
            :hover-start-time="150"
            @tap="detail"
          >
            <image
              :src="'/static/images/mall/product/' + item.img + '.jpg'"
              class="tui-pro-img"
              :class="[isList ? 'tui-proimg-list' : '']"
              mode="widthFix"
            />
            <view class="tui-pro-content">
              <view class="tui-pro-tit">{{ item.name }}</view>
              <view>
                <view class="tui-pro-price">
                  <text class="tui-sale-price">￥{{ item.sale }}</text>
                  <text class="tui-factory-price">￥{{ item.factory }}</text>
                </view>
                <view class="tui-pro-pay">{{ item.payNum }}人付款</view>
              </view>
            </view>
          </view>
          <!--商品列表-->
        </template>
      </view>
    </view>

    <!--list-->

    <!--加载loadding-->
    <tui-loadmore v-if="loadding" :index="3" type="red"></tui-loadmore>
    <tui-nomore
      v-if="!pullUpOn && isList"
      backgroundColor="#f7f7f7"
    ></tui-nomore>
    <!--加载loadding-->
  </view>
</template>

<script>
export default {
  data() {
    return {
      searchKey: "", //搜索关键词
      width: 200, //header宽度
      height: 64, //header高度
      inputTop: 0, //搜索框距离顶部距离
      arrowTop: 0, //箭头距离顶部距离
      dropScreenH: 0, //下拉筛选框距顶部距离
      attrData: [],
      attrIndex: -1,
      dropScreenShow: false,
      scrollTop: 0,
      tabIndex: 0, //顶部筛选索引
      isList: false, //是否以列表展示  | 列表或大图
      drawer: false,
      drawerH: 0, //抽屉内部scrollview高度
      selectedName: "综合",
      selectH: 0,
      dropdownList: [
        {
          name: "综合",
          selected: true,
        },
        {
          name: "价格升序",
          selected: false,
        },
        {
          name: "价格降序",
          selected: false,
        },
      ],
      attrArr: [
        {
          name: "新品",
          selectedName: "新品",
          isActive: false,
          list: [],
        },
        {
          name: "品牌",
          selectedName: "品牌",
          isActive: false,
          list: [
            {
              name: "trendsetter",
              selected: false,
            },
            {
              name: "维肯（Viken）",
              selected: false,
            },
            {
              name: "AORO",
              selected: false,
            },
            {
              name: "苏发",
              selected: false,
            },
            {
              name: "飞花令（FHL）",
              selected: false,
            },
            {
              name: "叶梦丝",
              selected: false,
            },
            {
              name: "ITZOOM",
              selected: false,
            },
            {
              name: "亿魅",
              selected: false,
            },
            {
              name: "LEIKS",
              selected: false,
            },
            {
              name: "雷克士",
              selected: false,
            },
            {
              name: "蕊芬妮",
              selected: false,
            },
            {
              name: "辉宏达",
              selected: false,
            },
            {
              name: "英西达",
              selected: false,
            },
            {
              name: "戴为",
              selected: false,
            },
            {
              name: "魔风者",
              selected: false,
            },
            {
              name: "即满",
              selected: false,
            },
            {
              name: "北比",
              selected: false,
            },
            {
              name: "娱浪",
              selected: false,
            },
            {
              name: "搞怪猪",
              selected: false,
            },
          ],
        },
        {
          name: "类型",
          selectedName: "类型",
          isActive: false,
          list: [
            {
              name: "线充套装",
              selected: false,
            },
            {
              name: "单条装",
              selected: false,
            },
            {
              name: "车载充电器",
              selected: false,
            },
            {
              name: "PD快充",
              selected: false,
            },
            {
              name: "数据线转换器",
              selected: false,
            },
            {
              name: "多条装",
              selected: false,
            },
            {
              name: "充电插头",
              selected: false,
            },
            {
              name: "无线充电器",
              selected: false,
            },
            {
              name: "座式充电器",
              selected: false,
            },
            {
              name: "万能充",
              selected: false,
            },
            {
              name: "转换器/转接线",
              selected: false,
            },
            {
              name: "MFI苹果认证",
              selected: false,
            },
            {
              name: "转换器",
              selected: false,
            },
            {
              name: "苹果认证",
              selected: false,
            },
          ],
        },
        {
          name: "适用手机",
          selectedName: "适用手机",
          isActive: false,
          list: [
            {
              name: "通用",
              selected: false,
            },
            {
              name: "vivo",
              selected: false,
            },
            {
              name: "OPPO",
              selected: false,
            },
            {
              name: "魅族",
              selected: false,
            },
            {
              name: "苹果",
              selected: false,
            },
            {
              name: "华为",
              selected: false,
            },
            {
              name: "三星",
              selected: false,
            },
            {
              name: "荣耀",
              selected: false,
            },
            {
              name: "诺基亚5",
              selected: false,
            },
            {
              name: "荣耀4",
              selected: false,
            },
            {
              name: "诺基",
              selected: false,
            },
            {
              name: "荣耀",
              selected: false,
            },
            {
              name: "诺基亚2",
              selected: false,
            },
            {
              name: "荣耀2",
              selected: false,
            },
            {
              name: "诺基",
              selected: false,
            },
          ],
        },
      ],
      productList: [
        {
          img: 1,
          name: "欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜 30ml（欧莱雅彩妆 BB霜 粉BB 遮瑕疵 隔离）",
          sale: 599,
          factory: 899,
          payNum: 2342,
        },
        {
          img: 2,
          name: "德国DMK进口牛奶  欧德堡（Oldenburger）超高温处理全脂纯牛奶1L*12盒",
          sale: 29,
          factory: 69,
          payNum: 999,
        },
        {
          img: 3,
          name: "【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红",
          sale: 299,
          factory: 699,
          payNum: 666,
        },
        {
          img: 4,
          name: "百雀羚套装女补水保湿护肤品",
          sale: 1599,
          factory: 2899,
          payNum: 236,
        },
        {
          img: 5,
          name: "百草味 肉干肉脯 休闲零食 靖江精制猪肉脯200g/袋",
          sale: 599,
          factory: 899,
          payNum: 2399,
        },
        {
          img: 6,
          name: "短袖睡衣女夏季薄款休闲家居服短裤套装女可爱韩版清新学生两件套 短袖粉色长颈鹿 M码75-95斤",
          sale: 599,
          factory: 899,
          payNum: 2399,
        },
        {
          img: 1,
          name: "欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜",
          sale: 599,
          factory: 899,
          payNum: 2342,
        },
        {
          img: 2,
          name: "德国DMK进口牛奶",
          sale: 29,
          factory: 69,
          payNum: 999,
        },
        {
          img: 3,
          name: "【第2支1元】柔色尽情丝柔口红唇膏女士不易掉色保湿滋润防水 珊瑚红",
          sale: 299,
          factory: 699,
          payNum: 666,
        },
        {
          img: 4,
          name: "百雀羚套装女补水保湿护肤品",
          sale: 1599,
          factory: 2899,
          payNum: 236,
        },
      ],
      pageIndex: 1,
      loadding: false,
      pullUpOn: true,
    };
  },
  onLoad: function (options) {
    let obj = {};
    // #ifdef MP-WEIXIN
    obj = wx.getMenuButtonBoundingClientRect();
    // #endif
    // #ifdef MP-BAIDU
    obj = swan.getMenuButtonBoundingClientRect();
    // #endif
    // #ifdef MP-ALIPAY
    my.hideAddToDesktopMenu();
    // #endif
    uni.getSystemInfo({
      success: (res) => {
        this.width = obj.left || res.windowWidth;
        this.height = obj.top
          ? obj.top + obj.height + 8
          : res.statusBarHeight + 44;
        this.inputTop = obj.top
          ? obj.top + (obj.height - 30) / 2
          : res.statusBarHeight + 7;
        this.arrowTop = obj.top
          ? obj.top + (obj.height - 32) / 2
          : res.statusBarHeight + 6;
        this.searchKey = options.searchKey || "";
        //略小，避免误差带来的影响
        this.dropScreenH = (this.height * 750) / res.windowWidth + 186;
        this.drawerH = res.windowHeight - uni.upx2px(100) - this.height;
      },
    });
  },
  methods: {
    px(num) {
      return uni.upx2px(num) + "px";
    },
    btnDropChange: function (e) {
      let index = Number(e.currentTarget.dataset.index);
      let arr = JSON.parse(JSON.stringify(this.attrArr[index].list));
      if (arr.length === 0) {
        this.btnCloseDrop();
        this.$set(
          this.attrArr[index],
          "isActive",
          !this.attrArr[index].isActive
        );
      } else {
        this.attrData = arr;
        this.attrIndex = index;
        this.dropScreenShow = true;
        this.$set(this.attrArr[index], "isActive", false);
        this.scrollTop = 1;
        this.$nextTick(() => {
          this.scrollTop = 0;
        });
      }
    },
    btnSelected: function (e) {
      let index = e.currentTarget.dataset.index;
      this.$set(
        this.attrData[index],
        "selected",
        !this.attrData[index].selected
      );
    },
    reset() {
      let arr = this.attrData;
      for (let item of arr) {
        item.selected = false;
      }
      this.attrData = arr;
    },
    btnCloseDrop() {
      this.scrollTop = 1;
      this.$nextTick(() => {
        this.scrollTop = 0;
      });
      this.dropScreenShow = false;
      this.attrIndex = -1;
    },
    btnSure: function () {
      let index = this.attrIndex;
      let arr = this.attrData;
      let active = false;
      let attrName = "";
      //这里只是为了展示选中效果,并非实际场景
      for (let item of arr) {
        if (item.selected) {
          active = true;
          attrName += attrName ? ";" + item.name : item.name;
        }
      }
      let obj = this.attrArr[index];
      this.btnCloseDrop();
      this.$set(obj, "isActive", active);
      this.$set(obj, "selectedName", attrName);
    },
    showDropdownList: function () {
      this.selectH = 246;
      this.tabIndex = 0;
    },
    hideDropdownList: function () {
      this.selectH = 0;
    },
    dropdownItem: function (e) {
      let index = Number(e.currentTarget.dataset.index);
      let arr = this.dropdownList;
      for (let i = 0; i < arr.length; i++) {
        if (i === index) {
          arr[i].selected = true;
        } else {
          arr[i].selected = false;
        }
      }
      this.dropdownList = arr;
      this.selectedName = index == 0 ? "综合" : "价格";
      this.selectH = 0;
    },
    screen: function (e) {
      let index = e.currentTarget.dataset.index;
      this.hideDropdownList();
      this.btnCloseDrop();
      if (index == 0) {
        this.showDropdownList();
      } else if (index == 1) {
        this.tabIndex = 1;
      } else if (index == 2) {
        this.isList = !this.isList;
      } else if (index == 3) {
        this.drawer = true;
      }
    },
    closeDrawer: function () {
      this.drawer = false;
    },
    back: function () {
      if (this.drawer) {
        this.closeDrawer();
      } else {
        uni.navigateBack();
      }
    },
    search: function () {
      uni.navigateTo({
        url: "/pages/common/search/search",
      });
    },
    detail: function () {
      uni.navigateTo({
        url: "/pages/index/productDetail/productDetail",
      });
    },
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
};
</script>

<style>
page {
  background-color: #f7f7f7;
}

.container {
  padding-bottom: env(safe-area-inset-bottom);
}

/* 商品列表*/

.tui-product-list {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
}

.tui-product-container {
  flex: 1;
  margin-right: 10rpx;
}

.tui-product-container:last-child {
  margin-right: 0;
}

.tui-pro-item {
  width: 100%;
  margin-bottom: 10rpx;
  background: #fff;
  box-sizing: border-box;
  border-radius: 12rpx;
  overflow: hidden;
  transition: all 0.15s ease-in-out;
}

.tui-flex-list {
  display: flex;
  margin-bottom: 1rpx !important;
}

.tui-pro-img {
  width: 100%;
  display: block;
}

.tui-proimg-list {
  width: 260rpx;
  height: 260rpx !important;
  flex-shrink: 0;
  border-radius: 12rpx;
}

.tui-pro-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 20rpx;
}

.tui-pro-tit {
  color: #2e2e2e;
  font-size: 26rpx;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.tui-pro-price {
  padding-top: 18rpx;
}

.tui-sale-price {
  font-size: 34rpx;
  font-weight: 500;
  color: #e41f19;
}

.tui-factory-price {
  font-size: 24rpx;
  color: #a0a0a0;
  text-decoration: line-through;
  padding-left: 12rpx;
}

.tui-pro-pay {
  padding-top: 10rpx;
  font-size: 24rpx;
  color: #656565;
}

.tui-pro--hidden {
  visibility: hidden;
  opacity: 0;
  display: none;
}

/* 商品列表*/
</style>

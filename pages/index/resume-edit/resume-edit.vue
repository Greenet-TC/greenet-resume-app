<template>
  <!--uni-app-->
  <view >
  <tui-text padding="24rpx 25rpx" type="gray" block text="基础信息"></tui-text>
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
  <tui-text padding="24rpx 25rpx" type="gray" block text="其他信息"></tui-text>
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
    ></tui-input>
  </tui-form>
  <tui-footer
    :fixed="false"
    copyright="Copyright © 2022-2025 Greenet-TC."
  ></tui-footer>
  </view>
</template>
<script>
import tuiButton from "../../../components/thorui/tui-button/tui-button.vue";
export default {
  components: { tuiButton },
  data() {
    return {
      pageIndex: 1,
      loadding: false,
      pullUpOn: false,
      opacity: 1,
    };
  },
  methods: {
    detail: function () {
      uni.navigateTo({
        url: "/pages/index/productDetail/productDetail",
      });
    },
    coupon() {
      uni.navigateTo({
        url: "/pages/index/coupon/coupon",
      });
    },

    classify: function () {
      uni.switchTab({
        url: "../classify/classify",
      });
    },
    more: function (e) {
      let key = e.currentTarget.dataset.key || "";
      uni.navigateTo({
        url: "/pages/index/productList/productList?searchKey=" + key,
      });
    },
    search: function () {
      uni.navigateTo({
        url: "/pages/common/search/search",
      });
    },
    seckill(type) {
      let url =
        type == 1
          ? "/pages/index/seckillList/seckillList"
          : "/pages/index/seckillDetail/seckillDetail";
      this.tui.href(url);
    },
    group(type) {
      let url =
        type == 1
          ? "/pages/index/groupList/groupList"
          : "/pages/index/groupDetail/groupDetail";
      this.tui.href(url);
    },
  },
};
</script>
<style>
page {
	 background-color: #f7f7f7;
}

</style>

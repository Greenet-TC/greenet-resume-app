<template>
  <!--uni-app-->
  <tui-form ref="form">
    <tui-input
      label="姓名"
      borderTop
      placeholder="请输入姓名"
      v-model="name"
    ></tui-input>
    <tui-input
      label="手机号"
      :lineLeft="false"
      placeholder="请输入手机号"
      v-model="mobile"
    ></tui-input>
  </tui-form>
</template>
<script>
export default {
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
}
</style>

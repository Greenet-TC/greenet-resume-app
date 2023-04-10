<template>
  <view class="content">
    <tui-tabs
      :tabs="tabs"
      :currentTab="currentTab"
      unlined="true"
      isSlider
      itemWidth="50%"
      @change="change"
      sliderWidth="154"
      sliderHeight="54"
      sliderRadius="50rpx"
      sliderBgColor="#fff"
      color="rgb(255,255,255)"
      bottom="50%"
      selectedColor="rgb(235, 9, 9)"
      backgroundColor="linear-gradient(90deg, rgb(255, 118, 38), rgb(252, 30, 82));"
    ></tui-tabs>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          name: "今日特拼",
        },
        {
          name: "全部",
        },
        {
          name: "新品",
        },
        {
          name: "禁用状态",
          disabled: true,
        },
      ],
    };
  },
  onLoad() {},
  methods: {},
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>

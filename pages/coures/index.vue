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
      currentTab: 0,
      tabs: [
        {
          name: "全部",
        },
        {
          name: "简历制作",
        },
        {
          name: "模拟面试",
        },
        {
          name: "铲平",
        },
      ],
    };
  },
  onLoad() {},
  methods: {
    change(preValue) {
      this.currentTab = preValue.index;
    },
  },
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

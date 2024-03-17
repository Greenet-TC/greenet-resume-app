<template>
  <view class="tui-product-category">
    <view
      class="tui-category-item"
      v-for="(item, index) in category"
      :key="index"
      :data-key="item.id"
      @tap="resumeEdit"
    >
      <image
        :src="'/static/images/icon/' + item.img"
        class="tui-category-img"
        mode="scaleToFill"
      ></image>
      <view class="tui-category-name">{{ item.name }}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: "yjServiceList",
  data() {
    return {
      category: [
        {
          img: "cv.png",
          name: "简历修改",
          id: "1",
        },
        {
          img: "interview.png",
          name: "模拟面试",
          id: "2",
        },
        {
          img: "qa.png",
          name: "实习内推",
          id: "3",
        },
        {
          img: "house.png",
          name: "实习租房",
          id: "4",
        },
      ],
    };
  },
  methods: {
    resumeEdit: function (e) {
      uni.navigateTo({
        url: `/pages/index/servier-select/servier-select?type=${e.currentTarget.dataset.key}`,
      });
    },
  },
};
</script>

<style scoped lang="less">
.tui-product-category {
  padding: 0rpx 10rpx 30rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 24rpx;
  width: 362px;
  color: #555;
  margin-top: 20rpx;
  position: absolute;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: -1 0 10px rgba(0, 0, 0, 0.35);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(80rpx);
  top: 274px;
  left: 50%;
  transform: translate(-50%);
  border-radius: 10px 10px 15px 15px;
}

.tui-category-item {
  width: 20%;
  height: 118rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding-top: 22rpx;
}

.tui-category-img {
  height: 80rpx;
  width: 80rpx;
  display: block;
}

.tui-category-name {
  line-height: 24rpx;
}
</style>

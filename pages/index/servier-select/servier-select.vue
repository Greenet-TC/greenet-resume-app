<template>
  <view class="servier-contant">
    <view class="servier-contant-info">
      <view class="servier-contant-title">
        <view class="num">1</view>
        <view>选择服务内容</view>
      </view>
    </view>
    <view class="servier-contant-"> </view>
    <view class="servier-contant"> </view>
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
      serviceType: [
        {
          type: "1",
          title: "【实习版】",
          serviceContent: [
            {
              orderType: "1",
              h6: "简历优化",
              num: 159,
              preNum: 169,
              detail: {
                btn: "详情",
                tooltip:
                  "专业实习 HR 执笔，最大程度满足凸显用户特点和高度匹配岗位；往期平均投递后2-3天内收到面试邀请",
              },
              desc: "从用人方角度出发，逐字逐句打造被 HR 瞬间 Pick 的好简历",
              avatar: [
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/youjia/IMG_1940.JPG?sign=d4a28be9e2caf8f223fd48a6496b7357&t=1647366913",
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG37.jpeg?sign=be88b0736c42578b2fe574da2609aa1f&t=1631203222",
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG38.jpeg?sign=fd497ff34fcac51fc46281ff53a8a990&t=1631204108",
              ],
              userNum: "31,436用户选择",
            },
            {
              orderType: "2",
              h6: "实习规划",
              num: 299,
              preNum: 345,
              detail: {
                btn: "详情",
                tooltip: "解答职业困惑，制定职业发展计划及阶段性目标",
              },
              desc: "职业规划师为你量身打造职场晋升之路，打好职场第一步",
              avatar: [
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/youjia/IMG_1941.JPG?sign=f2c8c0812a71a56ff690b0509a962e14&t=1647367355",
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG40.jpeg?sign=e23c7b958563cb1d4b1c04e6c93aade9&t=1631204661",
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG38.jpeg?sign=fd497ff34fcac51fc46281ff53a8a990&t=1631204108",
              ],
              userNum: "64,216用户选择",
            },
            {
              orderType: "3",
              h6: "模拟面试",
              preNum: 478,
              num: 399,
              detail: {
                btn: "详情",
                tooltip: "30 分钟深度沟通，关于面试你想知道的，我们都会告诉你",
              },
              desc: "行业大佬视频模拟面试辅导，一对一辅导，好 Offer 就是要一遍抓住",
              avatar: [
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/youjia/IMG_1941.JPG?sign=f2c8c0812a71a56ff690b0509a962e14&t=1647367355",
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG40.jpeg?sign=e23c7b958563cb1d4b1c04e6c93aade9&t=1631204661",
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG38.jpeg?sign=fd497ff34fcac51fc46281ff53a8a990&t=1631204108",
              ],
              userNum: "1,436用户选择",
            },
            {
              orderType: "4",
              h6: "面试辅导",
              num: 599,
              preNum: 678,
              detail: {
                btn: "详情",
                tooltip:
                  "60 分钟深度沟通，5 道自选面试问题+3 道个性化面试题+2 道预测面试题，为你的 Offer 保驾护航",
              },
              desc: "模拟面试+深度复盘，精准挖掘面试弱点",
              avatar: [
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/youjia/IMG_1941.JPG?sign=f2c8c0812a71a56ff690b0509a962e14&t=1647367355",
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG40.jpeg?sign=e23c7b958563cb1d4b1c04e6c93aade9&t=1631204661",
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG38.jpeg?sign=fd497ff34fcac51fc46281ff53a8a990&t=1631204108",
              ],
              userNum: "1,422用户选择",
            },
            //   {
            //     orderType: '5',
            //     h6: '留学咨询',
            //     num: 76,
            //     preNum: 109,
            //     detail: {
            //       btn: '详情',
            //       tooltip: ' 优加实习是一家专业的教育咨询公司，为学生提供全球化的专业留学建议。',
            //     },
            //     desc: '专业的留学学长，在线一对一为您解答留学相关的问题，包括但不限于：学校选择、学校建议等等',
            //     avatar: [
            //       'https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/youjia/IMG_1940.JPG?sign=d4a28be9e2caf8f223fd48a6496b7357&t=1647366913',
            //       'https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/youjia/IMG_1941.JPG?sign=f2c8c0812a71a56ff690b0509a962e14&t=1647367355',
            //       'https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG38.jpeg?sign=fd497ff34fcac51fc46281ff53a8a990&t=1631204108',
            //     ],
            //     userNum: '436用户选择',
            //   },
          ],
        },
        {
          type: "2",
          title: "【校招版】",
          serviceContent: [
            {
              orderType: "1",
              h6: "简历优化",
              num: 249,
              preNum: 278,
              detail: {
                btn: "详情",
                tooltip:
                  "专业实习 HR 执笔，最大程度满足凸显用户特点和高度匹配岗位；往期平均投递后2-3天内收到面试邀请",
              },
              desc: "从用人方角度出发，逐字逐句打造被 HR 瞬间 Pick 的好简历",
              avatar: [
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/youjia/IMG_1940.JPG?sign=d4a28be9e2caf8f223fd48a6496b7357&t=1647366913",
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG37.jpeg?sign=be88b0736c42578b2fe574da2609aa1f&t=1631203222",
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG38.jpeg?sign=fd497ff34fcac51fc46281ff53a8a990&t=1631204108",
              ],
              userNum: "3,436用户选择",
            },
            {
              orderType: "2",
              num: 699,
              preNum: 778,
              h6: "职业规划",
              detail: {
                btn: "详情",
                tooltip: "解答职业困惑，制定职业发展计划及阶段性目标",
              },
              desc: "职业规划师为你量身打造职场晋升之路，打好职场第一步",
              avatar: [
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/youjia/IMG_1941.JPG?sign=f2c8c0812a71a56ff690b0509a962e14&t=1647367355",
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG40.jpeg?sign=e23c7b958563cb1d4b1c04e6c93aade9&t=1631204661",
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG38.jpeg?sign=fd497ff34fcac51fc46281ff53a8a990&t=1631204108",
              ],
              userNum: "6,216用户选择",
            },
            {
              orderType: "3",
              h6: "模拟面试",
              num: 599,
              preNum: 678,
              detail: {
                btn: "详情",
                tooltip: "30 分钟深度沟通，关于面试你想知道的，我们都会告诉你",
              },
              desc: "行业大佬视频模拟面试辅导，一对一辅导，好 Offer 就是要一遍抓住",
              avatar: [
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/youjia/IMG_1941.JPG?sign=f2c8c0812a71a56ff690b0509a962e14&t=1647367355",
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG40.jpeg?sign=e23c7b958563cb1d4b1c04e6c93aade9&t=1631204661",
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG38.jpeg?sign=fd497ff34fcac51fc46281ff53a8a990&t=1631204108",
              ],
              userNum: "936用户选择",
            },
            {
              orderType: "4",
              h6: "面试辅导",
              num: 399,
              preNum: 418,
              detail: {
                btn: "详情",
                tooltip:
                  "60 分钟深度沟通，5 道自选面试问题+3 道个性化面试题+2 道预测面试题，为你的 Offer 保驾护航",
              },
              desc: "模拟面试+深度复盘，精准挖掘面试弱点",
              avatar: [
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/youjia/IMG_1941.JPG?sign=f2c8c0812a71a56ff690b0509a962e14&t=1647367355",
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG40.jpeg?sign=e23c7b958563cb1d4b1c04e6c93aade9&t=1631204661",
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG38.jpeg?sign=fd497ff34fcac51fc46281ff53a8a990&t=1631204108",
              ],
              userNum: "422用户选择",
            },
          ],
        },
        {
          type: "3",
          title: "【社招版】",
          serviceContent: [
            {
              orderType: "1",
              h6: "简历优化",
              num: 299,
              preNum: 318,
              detail: {
                btn: "详情",
                tooltip:
                  "专业实习 HR 执笔，最大程度满足凸显用户特点和高度匹配岗位；往期平均投递后2-3天内收到面试邀请",
              },
              desc: "从用人方角度出发，逐字逐句打造被 HR 瞬间 Pick 的好简历",
              avatar: [
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/youjia/IMG_1940.JPG?sign=d4a28be9e2caf8f223fd48a6496b7357&t=1647366913",
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG37.jpeg?sign=be88b0736c42578b2fe574da2609aa1f&t=1631203222",
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG38.jpeg?sign=fd497ff34fcac51fc46281ff53a8a990&t=1631204108",
              ],
              userNum: "31,436用户选择",
            },
            {
              orderType: "2",
              h6: "职业规划",
              num: 499,
              preNum: 599,
              detail: {
                btn: "详情",
                tooltip: "解答职业困惑，制定职业发展计划及阶段性目标",
              },
              desc: "职业规划师为你量身打造职场晋升之路，打好职场第一步",
              avatar: [
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/youjia/IMG_1941.JPG?sign=f2c8c0812a71a56ff690b0509a962e14&t=1647367355",
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG40.jpeg?sign=e23c7b958563cb1d4b1c04e6c93aade9&t=1631204661",
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG38.jpeg?sign=fd497ff34fcac51fc46281ff53a8a990&t=1631204108",
              ],
              userNum: "64,216用户选择",
            },
            {
              orderType: "3",
              h6: "模拟面试",
              num: 499,
              preNum: 538,
              detail: {
                btn: "详情",
                tooltip: "30 分钟深度沟通，关于面试你想知道的，我们都会告诉你",
              },
              desc: "行业大佬视频模拟面试辅导，一对一辅导，好 Offer 就是要一遍抓住",
              avatar: [
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/youjia/IMG_1941.JPG?sign=f2c8c0812a71a56ff690b0509a962e14&t=1647367355",
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG40.jpeg?sign=e23c7b958563cb1d4b1c04e6c93aade9&t=1631204661",
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG38.jpeg?sign=fd497ff34fcac51fc46281ff53a8a990&t=1631204108",
              ],
              userNum: "1,436用户选择",
            },
            {
              orderType: "4",
              h6: "面试辅导",
              num: 899,
              preNum: 998,
              detail: {
                btn: "详情",
                tooltip:
                  "60 分钟深度沟通，5 道自选面试问题+3 道个性化面试题+2 道预测面试题，为你的 Offer 保驾护航",
              },
              desc: "模拟面试+深度复盘，精准挖掘面试弱点",
              avatar: [
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/youjia/IMG_1941.JPG?sign=f2c8c0812a71a56ff690b0509a962e14&t=1647367355",
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG40.jpeg?sign=e23c7b958563cb1d4b1c04e6c93aade9&t=1631204661",
                "https://6d78-mxm1923893223-ulteh-1302287111.tcb.qcloud.la/%E5%AD%A6%E4%B9%A0/WechatIMG38.jpeg?sign=fd497ff34fcac51fc46281ff53a8a990&t=1631204108",
              ],
              userNum: "1,422用户选择",
            },
          ],
        },
      ],
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
.servier-contant {
  margin: 0 auto;
  height: auto;
  width: 95%;
}
.servier-contant-info {
  background: #fff;
  border-radius: 10rpx;
  padding: 20rpx 6rpx 20rpx 100rpx;
  margin-top: 5rpx;
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
</style>

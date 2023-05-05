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
                img
                src="/static/images/icon/hot.png"
                alt="1"
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
              <view
                ><tui-image-group
                  :imageList="forMate(item.avatar)"
                  isGroup
                  width="30rpx"
                  height="30rpx"
                  distance="-17"
                ></tui-image-group
              ></view>
              <span>{{ item.userNum }}</span>
            </view>
            <view
              class="service-item-flooter-btn"
              :class="{
                'active-btn': orderTyppe.includes(item.orderType),
              }"
              @tap="choseService(item)"
            >
              <p v-if="orderTyppe.includes(item.orderType)">已</p>
              <i v-else></i>
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
        <view class="tui-total-price" v-if="!isEdit"
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
          v-if="!isEdit"
          @click="btnPay"
          >去结算({{ orderTyppe.length }})</tui-button
        >
        <tui-button
          width="200rpx"
          height="70rpx"
          :size="30"
          type="danger"
          shape="circle"
          :plain="true"
          v-else
          >删除</tui-button
        >
      </view>
    </view>
  </view>
</template>
<script>
import uParse from "@/components/uni/uParse/src/wxParse";
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
      dataList: [
        {
          name: "1.导师辅导的内容包括哪些？",
          intro: `<view style="color:#9c9c9c; font-size: 12px;
        margin-top: -10px;
        line-height: 20px;">
              <p>
                优加实习已为<span style="color:#ff4f4c;display:inline-block" >10000+</span>的在校大学生提供实习简历优化、模拟面试、职业规划等服务，
                <span style="color:#ff4f4c;display:inline-block">90%</span>的客户都成功获取Offer，在过程中优加总结出了一套大幅提高简历成功率的方法论。每一位成功导师皆有5-10年从业经验，并经过平台筛选，确保简历修改的标准。
              </p>
              <br />
              <p>自<span style="color:#ff4f4c;display:inline-block">2021年6月起</span>，导师服务已全面升级，三大服务内容打造一站式绝佳体验，服务内容包括：
              </p>
              <br />
              <p>1.1v1 简历修改：根据求职意向全方面优化简历的各个维度，并给予详细的修改意见； </p>
              <p>
                2.匹配度解析：帮助候选人拆解和理解岗位真实要求，挖掘和突出个人优势，结合用人方能力模型对用户简历进行个性化定制
              </p>
              <p>
                3. 电话咨询：针对购买在职版套餐的求职者，服务会包含一次30分钟的微信电话交流服务。
              </p>
            </view>`,
        },
        {
          name: "2.下单前注意事项？",
          intro: `  <view style="color:#9c9c9c; font-size: 12px;
        margin-top: -10px;
        line-height: 20px;">
              <p>
            <span style="color:#ff4f4c;display:inline-block">
                  <b>【1. 不作假】：</b>
                </span>导师辅导服务提供的每一份简历都是最大化体现候选人的亮点进而增加候选人的竞争力，但是必须是真实可信的。根据经验，简历内容超出实际能力的候选人会在面试环节被刷掉。求职要量力而为，最合适的Offer才是最好的Offer，切勿急功近利。
              </p> 
              <p>
                <span style="color:#ff4f4c;display:inline-block">
                  <b>【2. 沟通内容】：</b>
                </span> 为了提供准确、有效的求职建议，下单前会要求提供目标岗位的JD（职位描述）。
              </p>
              <p>
                <span style="color:#ff4f4c;display:inline-block">
                  <b>【3. 其他帮助】：</b>
                </span>如果有其他需要，如面试辅导、职业规划、行业认知等问题请与导师沟通，导师同意接单后您需额外支付相应服务费用后再进行服务。
              </p>
              <p>
                <span style="color:#ff4f4c;display:inline-block">
                  <b>【4. 不覆盖范畴】：</b></span> 导师服务只针对求职简历辅导。考研、出国、MBA、申请奖项等其他简历使用场景均不属于服务范围内，无法保证此类场景的辅导效果，也无法针对简历以外的文书进行辅导
              </p>
            </view>`,
        },
        {
          name: "3.导师由谁来担任？",
          intro: `<view  style="color:#9c9c9c; font-size: 12px;
        margin-top: -10px;
        line-height: 20px;">
              超级简历的导师团队来自高盛、美世咨询、四大、谷歌、BAT、各大 500 强的顶级名企，拥有至少 5 年以上工作经验，并且负责或参与企业招聘流程。
            </view>`,
        },
        {
          name: "4.多长时间会收到修改回复？",
          intro: ` <view  style="color:#9c9c9c; font-size: 12px;
        margin-top: -10px;
        line-height: 20px;">
              <p>
                导师辅导首轮反馈会在 3 个工作日完成（实习版 3
                个工作日交付终版），并通过微信推送通知。
              </p>
              <p>
               
                <span style="color:#ff4f4c;display:inline-block">
                  <b>【实习版】 </b>
                </span>包括 1 轮简历修改反馈；
              </p>
              <p>
                <span style="color:#ff4f4c;display:inline-block">
                  <b>【校招版】 </b>
                </span>包括 10 天内多轮（每轮 3 个工作日）简历修改、添加导师微信沟通；
              </p>
              <p>
                <span style="color:#ff4f4c;display:inline-block">
                  <b>【在职版】 </b>
                </span>【在职版】包括 10 天内多轮（每轮 3 个工作日）简历修改、添加导师微信沟通以及 1
                次微信语音沟通。
              </p>          
              您还可以根据需求选择面试辅导 & 职业生涯规划服务。校招版 &在职版多轮辅导在导师交付初稿后，需要您在7天内提交修改，超过7天未提交修改，导师辅导将自动结束。
            </view>`,
        },
        {
          name: "5.我想要加急怎么办？",
          intro: `<view  style="color:#9c9c9c; font-size: 12px;
        margin-top: -10px;
        line-height: 20px;">
              超级简历的导师团队来自高盛、美世咨询、四大、谷歌、BAT、各大 500 强的顶级名企，拥有至少
              5 年以上工作经验，并且负责或参与企业招聘流程。
            </view>`,
        },
        {
          name: "6.如果不用“优加简历”写简历，可以购买导师服务吗？",
          intro: `<view  style="color:#9c9c9c; font-size: 12px;
        margin-top: -10px;
        line-height: 20px;">
              抱歉，导师辅导只针对在超级简历上制作的简历，建议你用超级简历创建一份简历或将已经写好的简历通过【导入简历】的功能上传。另外由于导入功能可能不会100%完全复制您的简历内容，需要您在下单前检查被修改的简历是否完整可读。
            </view>`,
        },
        {
          name: "7.对导师辅导不满意怎么办？",
          intro: `<view  style="color:#9c9c9c; font-size: 12px;
        margin-top: -10px;
        line-height: 20px;">
        若对导师辅导不满意，可以添加导师助手微信或寻找在线客服及时反馈，我们会帮你与导师协商沟通重新修改或退款。注意：【校招版】和【在职版】导师辅导只在第一轮反馈后提供更换导师或退款服务。
            </view>`,
        },
        {
          name: "8.我的简历为什么会被退单？",
          intro: `<view  style="color:#9c9c9c; font-size: 12px;
        margin-top: -10px;
        line-height: 20px;">
        导师辅导下单后首先会进行专业评估，如果简历不完善或存在信息过多缺失，会导致导师无法进行辅导。所以我们会对您的订单发起退款通知。 建议您在下单之前根据超级简历的填写贴士、案例完善简历，同时注意提交求职意向信息。信息越完整导师越能提供更具针对性的辅导建议。
            </view>`,
        },
      ],
      show: [
        {
          show: false,
        },
        {
          show: false,
        },
        {
          show: false,
        },
        {
          show: false,
        },
      ],
      items: [
        {
          title: "信息填写",
          desc: "根据自己的情况选则服务内容和信息填写",
        },
        {
          title: "导师匹配",
          desc: "在1～2天内根据你的信息匹配最合适的导师",
        },
        {
          title: "服务落地",
          desc: "根据您选择的服务内容，将进行服务",
        },
        {
          title: "售后保证",
          desc: "购买10天售后期，帮您解决任何问题",
        },
      ],
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
                show: false,
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
                show: false,
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
                show: false,
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
                show: false,
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
      console.log(1111, e);
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
img {
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
  font-size: 24rpx;
  font-weight: 400;
  color: #9c9c9c;
  line-height: 24rpx;
  width: 300rpx;
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
.service-item-flooter-btn i {
  font-size: 20rpx;
  color: #ff4f4c;
  font-family: "iconfont" !important;
  font-size: 30rpx;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.service-item-flooter-btn i::before {
  content: "+";
  position: absolute;
  left: 30rpx;
  top: -2rpx;
}
.service-item-flooter-btn p {
  position: absolute;
  left: 40rpx;
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
</style>

<!--
 * @Author: maxueming maxueming@kuaishou.com
 * @Date: 2023-09-12 11:26:53
 * @LastEditors: maxueming maxueming@kuaishou.com
 * @LastEditTime: 2023-09-27 10:05:32
 * @FilePath: /greenet-resume-app/pages/activityPage/schoolRecruitment/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="school-active">
    <tui-navigation-bar
      dropDownHide
      splitLine
      @init="initNavigation"
      @change="opacityChange"
      :scrollTop="scrollTop"
      title="精选课程"
      backgroundColor="#ffffff80"
      color="#333"
    >
      <view class="tui-header-icon" :style="{ marginTop: top + 'px' }">
        <tui-icon
          name="arrowleft"
          :color="opacity > 0.85 ? 'rgb(96,98,102)' : '#ffffff0'"
          @click="back"
          size="19"
        ></tui-icon>
        <view class="tui-header-icon-divider"></view>
        <tui-icon
          name="home"
          :color="opacity > 0.85 ? 'rgb(96,98,102)' : '#ffffff0'"
          @click="home"
          size="19"
        ></tui-icon>
      </view>
    </tui-navigation-bar>

<view class="article-content">
    <uParse :content="articleInfo?.content || ''" />
</view>
   
    <tui-footer
      :fixed="false"
      class="service-tui-footer"
      copyright="Copyright © 2022-2025 Greenet-TC."
    ></tui-footer>
  </view>
</template>
<script>
import { viewArticleDetailPost } from "@/common/apis/article-controller";
import uParse from "@/components/uni/uParse/src/wxParse";
export default {
    components: { uParse },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop;
  },
  async onLoad(options) {
    try {
      const data = await viewArticleDetailPost({
        articleTitle: options.articleTitle,
      });
      console.log("data", data);
    } catch (e) {
      console.log(111, e);
      this.articleInfo = {
        articleId: 1699166776869283,
        articleTitle: "品牌创始人 | 茶百道 ·王霄锟夫妇",
        categoryFirst: null,
        categorySecond: null,
        categoryThird: null,
        collectNum: 1,
        commentNum: 1,
        content:
          '<p style="text-align: left;"><span style="font-size: 14px;">除蜜雪冰城门店规模遥居第一外，其余头部品牌的座次仍存变数。在此之前，今年3月，茶百道宣布门店数超过7000家。此外，古茗、书亦烧仙草最新门店数也均已超过7000家。疫后复苏的2023年，茶饮第二家万店品牌在激烈角逐当中。那他们夫妻，又是如何在逆势中做到如此规模，并IPO成功？</span></p><p style="text-align: left;"><strong>梦的起点</strong></p><p style="text-align: left;"><span style="font-size: 14px;">王霄锟夫妇拥有较高的学历和丰富的家庭背景，这为他们在商业领域打下了坚实的基础。他们来自一个热爱茶文化的家庭，从小就对茶艺产生了浓厚的兴趣。在创立茶百道之前，王霄锟曾是一名资深的茶艺师，他的妻子也是一位茶艺爱好者。他们的工作经历使他们积累了丰富的茶叶知识和实践经验，并对茶叶市场有着深刻的了解。此外，他们还曾在其他行业工作过，积累了一定的商业经验和人脉资源。</span></p><p style="text-align: left;"><span style="font-size: 14px;">正是这些因素共同作用，使得王霄锟夫妇开始建立茶百道这个品牌。他们对茶文化的热爱和执着，以及对市场的敏锐洞察力，使他们看到了茶叶市场的发展潜力。同时，他们的教育背景和工作经历也为他们在商业领域的成功提供了有力支持。因此，他们决定将茶艺与现代商业相结合，创立茶百道这一知名品牌，为消费者提供高品质的茶叶产品。</span></p><p style="text-align: left;"><span style="font-size: 14px;">茶百道的起源可以追溯到2008年。首家门店开在成都温江二中附近，u以卖水果和珍珠奶茶为主。不过，起初近10年时间，茶百道的发展速度并不快。2017年其门店也才刚刚突破180家。从创立时间来看，可谓是依旧活跃于新茶饮赛道的老玩家。</span></p><p style="text-align: left;"><span style="font-size: 14px;">从2010年开始，茶百道开始进行连锁经营，并在成都市市内开设了多家门店。在这个阶段，他们致力于提供高品质的茶饮产品，并不断改进和创新，以满足消费者的需求。 随着时间的推移，茶百道逐渐积累了一定的品牌知名度和市场份额。然而，他们意识到要想进一步发展，需要进行品牌升级。于是，在2013年，茶百道进行了一次全面的品牌升级，不仅对店面进行了重新装修和设计，还推出了更加高品质和多样化的茶饮产品。这次品牌升级为茶百道带来了新的发展机遇。 随着品牌升级的成功，茶百道开始吸引了更多的投资者的关注。2015年，红杉资本成为了茶百道的投资方之一。这次投资为茶百道提供了更多的资金支持和资源，使他们能够加速扩张的步伐。 茶百道利用红杉资本的投资，迅速开设了更多的门店，并进一步扩大了市场份额。他们通过持续的创新和提升产品质量，赢得了消费者的信任和喜爱。同时，茶百道也注重与消费者的互动和沟通，通过各种渠道收集反馈意见，并根据市场需求进行调整和改进。</span></p><p style="text-align: left;"><strong>融资只是“锦上添花”</strong></p><p style="text-align: left;"><span style="font-size: 14px;">茶百道，作为一家由夫妻店发展而来的品牌，吸引了许多小加盟商的加入。然而，尽管公司通过多次融资获得了资金支持，包括早期投资、股权融资、债务融资和上市融资，但闭店数量仍在递增，而新开门店数量却在放缓。</span><br><span style="font-size: 14px;">早期投资帮助茶百道建立了市场份额和品牌知名度，股权融资引入了新的投资者提供资金支持，债务融资通过借款获得了额外资金，上市融资通过公开发行股份获得了大量资金。这些融资活动为茶百道的发展提供了资金支持，加速了业务扩张并增强了市场竞争力。</span></p><p style="text-align: left;"><span style="font-size: 14px;">在资本的支持下，茶百道能够不断优化和完善供应链和数字化管理，加盟模式为公司带来了可观的收益和品牌知名度。然而，由于第三方加盟店的经营，公司可能无法充分控制和有效监督门店的运营情况。</span></p><p style="text-align: left;"><span style="font-size: 14px;">王霄锟夫妇也意识到加盟店的业绩对我们的经营业绩产生了重大影响，我们无法控制门店的运营或维持与加盟商的现有关系。我们的未来增长取决于引入新加盟商，但由于多种原因，可能无法维持过往的扩张速度。</span></p><p style="text-align: left;"><strong>化解“危机”</strong></p><p style="text-align: left;"><span style="font-size: 14px;"><strong>然而，在新式茶饮品牌不断涌现和门店数量迅速增长的背景下，市场份额的问题不容忽视。王霄锟夫妇也是深知此问题的所在，尤其是在c端的竞争更是白热化。最后他们做了一个“决策”——开发饮料配方，然后将水果和茶叶等原料出售给加盟店。</strong></span><span style="font-size: 14px;">通过这种方式，王霄锟可以保持连锁店的成本低于竞争对手。</span></p><p style="text-align: left;"><strong>说白了，即使要做连锁加盟，不降加盟商的运营成本降下来，也无办法不断扩招，只有双赢才能持久。</strong></p><p style="text-align: left;"><span style="font-size: 14px;"><strong>茶百道也是一家实打实的“夫妻店”,但他们看中的是加盟商的钱，比终端消费者的钱“更容易赚”。</strong></span></p><p style="text-align: left;"><span style="font-size: 14px;">王霄锟为了加盟商能更好运营，因而狠下决心优化和加强供应链管理，采取了一系列有效的措施。首先，茶百道大力推动“数智化”供应链建设，以提升饮品的质量控制和降低运营成本。为此，公司投资建立了一体化的物流信息化自动化技术系统，包括订单管理系统（OMS）、仓库管理系统（WMS）和运输管理系统（TMS），实现了库存、订单、运输资源到店服务等全链路数字化转型。</span></p><p style="text-align: left;"><span style="font-size: 14px;">其次，茶百道在成都市青白江区设立了智能生产加工基地及供应链总部项目，集品牌运营、供应链服务、产品研发制造于一体，总投资达100亿元。该基地于2021年底开工建设，预计将于今年12月底建成，并于2023年6月开始投产。此外，茶百道还响应国家限塑令号召，投资建立了可降解环保包装材料智能生产工厂，采用可降解食品级原料，生产可降解吸管、包装袋等包装材料。</span></p><p style="text-align: left;"><span style="font-size: 14px;">最后，茶百道通过锚定优质原料产地，共建原料直采基地的形式，从源头上保障食品安全并稳定产品风味。这些举措不仅有助于提高产品质量和食品安全，也有利于优化成本控制和提高运营效率。</span></p><p style="text-align: left;"><strong>写到最后</strong></p><p style="text-align: left;"><span style="font-size: 14px;">魔童认为，随着新茶饮品牌纷纷进入万店模式，他们的竞争已经升级到了一个新的阶段。从争夺产品创新和价格优势，到追求供应链优化和设备创新，茶饮品牌不仅在下沉市场展开激烈竞争，还在资本市场上展开新的战役。</span></p><p style="text-align: left;"><span style="font-size: 14px;">茶饮行业正逐渐将竞争焦点从消费端转移到加盟端，这或许是一个未来的趋势，也是其他品牌可以借鉴的经验。然而，不得不佩服王霄锟夫妇敏锐的商业眼光。</span></p>',
        coverUrl:
          "https://log-1312496861.cos.ap-beijing.myqcloud.com/logo12ad3a153cf94e3e898600abc5b74bc2.png",
        createTime: 1699170377000,
        id: 16,
        isFree: true,
        summery:
          "除蜜雪冰城门店规模遥居第一外，其余头部品牌的座次仍存变数。在此之前，今年3月，茶百道宣布门店数超过7000家。此外，古茗、书亦烧仙草最新门店数也均已超过7000家。疫后复苏的2023年，茶饮第二家万店品牌在激烈角逐当中。那他们夫妻，又是如何在逆势中做到如此规模，并IPO成功？",
        supportNum: 1,
        tags: null,
        updateTime: null,
        viewNum: 1,
      };
    }
  },
  data() {
    return {
      top: 0, //标题图标距离顶部距离
      opacity: 0,
      scrollTop: 0.5,
      articleInfo: null,
    };
  },

  methods: {
    initNavigation(e) {
      this.opacity = e.opacity;
      this.top = e.top;
    },
    home() {
      uni.switchTab({
        url: "/pages/index/index",
      });
    },
    back() {
      uni.navigateBack();
    },

    opacityChange(e) {
      this.opacity = e.opacity;
    },
  },
};
</script>
<style lang="less">
.tui-header-icon {
  margin-left: 10px;
  width: 80px;
  position: fixed;
  top: 0;
  padding: 0 16rpx;
  border-radius: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 0.5px solid #dadbde;
  padding: 0 16rpx;
  align-items: center;
  height: 32px;
  transform: translateZ(0);
  z-index: 99999;
  box-sizing: border-box;
  &-divider {
    border-left: 1px solid rgb(214, 215, 217);
    height: 16px;
    border-top-color: rgb(214, 215, 217);
    border-right-color: rgb(214, 215, 217);
    border-bottom-color: rgb(214, 215, 217);
    margin: 0px 8px;
  }
}

.school-active {
  height: 100vh;
  width: 100%;
  &-img {
    width: 100%;
    height: 120%;
  }
  .back-icon {
    position: absolute;
    width: 24rpx;
    height: 24rpx;
    top: 90rpx;
    left: 20rpx;
  }
}
.article-content{
    padding: 100rpx 20rpx
}
</style>

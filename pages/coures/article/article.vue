<!--
 * @Author: maxueming maxueming@kuaishou.com
 * @Date: 2023-09-12 11:26:53
 * @LastEditors: maxueming maxueming@kuaishou.com
 * @LastEditTime: 2023-11-06 15:45:48
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
      <mpHtml :content="content || ''" />
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
import mpHtml from "mp-html/dist/uni-app/components/mp-html/mp-html";

export default {
  components: { uParse, mpHtml },
  onPageScroll(e) {},
  async onLoad(options) {
    try {
      const data = await viewArticleDetailPost({
        articleId: options.articleId,
      });
      console.log("data", data);
    } catch (e) {
      this.articleInfo = {
        articleId: 1699166776869283,
        articleTitle: "品牌创始人 | 茶百道 ·王霄锟夫妇",
        categoryFirst: null,
        categorySecond: null,
        categoryThird: null,
        collectNum: 1,
        commentNum: 1,
        // content:'<p><br></p><blockquote>一年前，InfoQ的编辑约请我对前端技术做了些回顾总结，说了三个方面的话题：其一，前端过去的15年大致可以怎样划分；其二，前端的现状以及面临的挑战；其三，前端会有怎样的未来。后来刊发成综述，是《技术15年》。缘于文体变动，访谈的味道十不存一，所以这里再次整理成文，是为《告前端同学书》。</blockquote><p>作者：周爱民 / aimingoo</p><blockquote>编者按：本文作者周爱民确认出席由前端圈主办的第六届 FEDAY。FEDAY 将于 2023 年 11 月 18 日在杭州举办。本文经作者本人授权发布。</blockquote><p>各位前端同学，就我的所知来看，每⼀个具体的技术，在其⽅向上都有着不同的标志事件，也因此有着不同的阶段划分。但是我想，如果从我们这个领域对“前端”的认识来观察这件事，⼤概会对不同的前端阶段能有更清晰的认识。</p><p>早期前端的从业⼈员⼤多来⾃后端开发者、应⽤软件开发者，或者⽹⻚设计师，⽽并没有专职的前端开发。例如说阿⾥巴巴在 2010 年之前都把前端归在产品部⻔，可⻅前端⼯程师的来源和定位⼀直都很模糊。这个时代，ECMAScript 还陷在 Ed4 的泥坑中没有⾛出来，IE 浏览器带来的标准分裂还没有得到全⾯的修补，源于对这个领域的漠视，⼤⼚优势也没有体现出来，前端开发者们基本上各⾃为战，框架和中间件层出不穷⽽⼜良莠难分，开发⼯具和环境却荒草凄凄以⾄于乏善可陈。但是也正是在这个时代，ES6、CSS3、HTML5 等等都在筑基、渗透与蓄势。</p><p>随着专⽤⼯具链和开发流程的成熟，前后端分离的运动从项⽬内部开始蔓延到整个领域，出现了专⻔的前端开发⼯程师、团队，以及随之⽽来的⻆⾊细分，很多独⽴的技术社区就是在这个时代出现的。前后端分离不仅仅是⼀种技术表现，更是⼀种⾏业协作的模式与规范，并且反过来推动了⼯具和框架的⼤发展。信⼼满满的前端不拘于⼀城⼀地，⼀⽅⾯向前、向专业领域推进，从⽽影响到交互与接触层。因此更丰富的界⾯表现，以及从移动设备到⼈机交互界⾯等领域都成了前端的研究⽅向，是所谓“⼤前端”。⽽另⼀⽅⾯则向后、向系统领域渗透，有了所谓⼯程师“全栈化”运动。这个时候的“全栈”，在⼯程上正好符合敏捷团队的需求，在实践上正好⼜叠加上DevOPS、云端开发和⼩应⽤的⼏阵助⼒，前端因此⼀⽚繁华景象。</p><p>所以 2008 年左右开始的前后端分离是整个前端第⼆阶段的起点，这场运动改变了软件开发的体系与格局，为随后⼗年的前端成熟期拓开了局⾯。那⼀年的 SD2C 我谈了《VCL 已死、RAD 已死》，⽽⼗年后阿⾥的圆⼼在GMTC 上讲了《前端路上的思考》，可算作对这个时代的预⾔和反思。</p><p>相对于之前所说的第⼀、第⼆阶段，我认为如今我们正⾏进在⼀个全新阶段中。这个阶段初起的主要表现是：前端分离为独⽴领域，并向前、后两个⽅向并进之举已然势微。其关键在于，前端这个领域中的内容已经逐渐复杂，⽽其应⽤的体量也将愈加庞⼤，因此再向任何⽅向发展都难尽全⼒、难得全功。</p><p>摊⼦铺得⼤了，就需要再分家。所以下⼀个阶段中，将再次发⽣横向的领域分层，⼀些弥合层间差异的技术、⽅法与⼯具也将出现，类似于 Babel 这样的“嵌缝膏”产品将会再次成为⼀时热⻔。但⻓期来说，领域分层带来的是更专精的职业与技能，跨域协作是规约性的、流程化的，以及⼯具适配的。从 ECMAScript 的实践来看，规范的快速更新和迭代已经成为现实，因此围绕规范与接⼝的新的开发技术与⼯程模型，将会在这个阶段中成为主要⼒量，并成为维持系统稳定性的主要⼿段。</p><p>这是在⼀个新阶段的前夜。故此，有很多信息并不那么明朗，⽐如说像前后端分离这样的标志性事件并没有出现，亦或者出现了也还没有形成典型影响。我倾向于认为引领新时代的，或者说开启下⼀个阶段的运动将会发⽣在交互领域，也就是说新的交互⽅式决定了前端的未来。之前⾏业⾥在讲的 VR 和 AR（虚拟现实和增强实境）是在这个⽅向上的典型技术，但不唯于此。⼏乎所有在交互⽅式上的变⾰，都会成为⼈们认识与改变这个世界的全新动⼒，像语⾳识别、视觉捕捉、脑机接⼝等等，这些半成熟的或者实验性的技术都在影响着我们对“交互”的理解，从⽽也重新定义了前端。</p><p>⾏业⽣态也会重构，如同今天的前端⼤会已经从“XX技术⼤会”中分离出来⼀样，不久之后“交互”也会从前端分化出来，设计、组件化、框架与平台等等也会成体系地分化出来。前端会变得⽐后端更复杂、更多元，以及更加的⽣机勃勃。这样的⽣态起来了，⼀个新的时代也就来临了。简单地说，1、要注重领域与规范，2、要跟进交互与体验，3、要在⽣态中看到机会。</p><p>然而，前端的同学们，我们也不要忘记在这背景中回望自身，正视我们前端自己的问题。</p><p>其⼀，底⼦还是薄，前端在技术团队与社区的积累上仍然不够。看起来摊⼦是铺开了，但是每每只在“如何应⽤”上下功夫，真正在⽹络、系统、语⾔、编译、机器学习等等⽅⾯有深⼊研究的并不多。⼀直以来，真正有创建性或预⻅性的思想、⽅法与理论鲜⻅于前端，根底薄是⾸要原因。</p><p>其⼆，思维转换慢，有些技术与思想抛弃得不够快，不够彻底。不能总是把核⼼放在“三⼤件（JS+CSS+HTML）”上⾯，核⼼要是不变，前端的⾰命也就不会真正开始。要把“Web 前端”前⾯的“Web”去掉，就现实来说，很多⼈连“观望”都没有开始。</p><p>其三，还没有找到跟“交互”结合起来的有效⽅法与机制。前端过去⼗年，在 IoT、机器学习、云平台等等每⼀次潮流都卡上了点⼉，但是如果前端的下⼀次转型起于“交互”，那么我们⽬前还没有能⼒适应这样的变化。当然，契机也可能不在于“交互”，但如果这样，我们的准备就更不充分了。</p><p>其四，向更多的应⽤领域渗透的动机与动⼒不明确。⻓期以来，前端在各个领域上都只是陪跑，缺乏真正推动这些领域的动机与动⼒。往将来看，这些因素在前端也将持续缺乏。寻求让前端持续发展，甚⾄领跑某些领域的内驱⼒量，任重⽽道远。</p><p>同学们，我想我们必须有一种共同的、清醒的认识与认知：浏览器是未来。去操作系统和云化是两个⼤的⽅向，当它们达成⽬标时，浏览器将成为与⽤户接触的唯⼀渠道。研究浏览器，其本质就是研究交互和表现，是前端的“终极私活”。但不要局限于“Web 浏览器”，它必将成为历史，如同操作系统的“⽂件浏览器”⼀样。</p><p>要极其关注 JavaScript 的类型化，弱类型是这⻔语⾔在先天条件上的劣势，是它在⼤型化和系统化应⽤中的明显短板。这个问题⼀旦改善，JavaScript 将有⼒量从其它各种语⾔中汲取营养，并得以⾯向更多的开发领域，这是 JavaScript 的未来。</p><p>AI 和 WASM 在前端可以成为⻬头并进的技术，⼀个算法，⼀个实现。对于前端来说，性能问题⼀直是核⼼问题，⽽交互与表现必将“⼤型与复杂化”，例如虚拟现实交互，以及模拟反馈等等，⽽ WASM 是应对这些问题的有效⼿段。</p><p>所谓交互与表现，本质上都是“空间问题”。亦即是说，前端表现中的所谓布局、块、位置、流等等传统模式与技术，与将来的交互技术在问题上是同源的。就像“盒模型”确定了 CSS 在前端的核⼼地位⼀样，新的空间定位技术，以及与之匹配的表现与交互⽅法是值得关注和跟进的。</p><p>前端要有更强的组织⼒，才能应付更⼤规模的系统。这⾥的组织⼒主要是针对⼯程化⽽⾔，所有⼯程化⼯具，其最终的落脚点都在快速、可靠，并以体系化的⽅式来组织⼯程项⽬。这包括⼈、资源、信息、时间、能⼒与关系等等⼯程因素，每个⽅⾯都有问题，都值得投⼊技术⼒量。</p><p>相较于新入行的前端的同学们，我能从没有前端走到如今前端的⼤发展，何其幸也。以我⼀路之所⻅，前端真正让我钦佩的是持久的活⼒。前端开发者⼏乎总是⼀个团队中“新鲜⾎液”的代名词，因此前端在业界的每个阶段都⾛在时代的前列。如今看 C 语⾔的⽼迈，操作系统的封闭，后台的保守，以及业务应⽤、产品市场等等各个领域都在筑城⾃守，再看前端种种，便总觉得开放与探索的信念犹在。</p><p>曾经与我⼀道的那些早期的前端开发者们，如今有做了主管的，有搞了标准的，有带了团队的，有转了后端的，有做架构做产品做运维等等⼀肩担之，也有开了公司做了顾问从商⼊政的，但也仍然还有在前端⼀线上做着努⼒，仍看好于这⼀个⽅向并在具体事务上勉⼒前⾏的。我曾经说，“任何事情做个⼗年，总会有所成绩的”，如今看来，这个时间还是说少了，得说是：⼏个⼗年地做下去，前端总能做到第⼀。</p><p>惟只提醒⼤家，领域分层的潮流之下，层间技术的核⼼不是功能（functional），⽽是能⼒（capabilities）。向应⽤者交付能⼒，需要有体系性的思维，要看向系统的全貌。我们专精于细节没错，专注于⼀城⼀地也没错，然而眼光⾼远⽽脚踏实地，是前端朋友们当有之势。</p><p>亦是这个时代予我们的当为之事！</p><p><br></p>',
        coverUrl:
          "https://log-1312496861.cos.ap-beijing.myqcloud.com/logo12ad3a153cf94e3e898600abc5b74bc2.png",
        createTime: 1699170377000,
        id: 16,
        isFree: true,
        summery: "",
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
      content: `<p style="text-indent: 2em;">🥰<img style="float: right; max-width: 40%;" src="static/img/qqgroup.jpg" /></p>
<p>TinyMCE是一款易用、且功能强大的所见即所得的富文本编辑器。同类程序有：</p>
<table style="border-collapse: collapse;" border="1">
<tbody>
<tr style="height: 21px;">
<td style="width: 20%; height: 21px;">UEditor</td>
<td style="width: 20%; height: 21px;">Kindeditor</td>
<td style="width: 20%; height: 21px;">Simditor</td>
</tr>
<tr style="height: 21px;">
<td style="width: 20%; height: 21px;">CKEditor</td>
<td style="width: 20%; height: 21px;">wangEditor</td>
<td style="width: 20%; height: 21px;">Suneditor</td>
</tr>
<tr style="height: 21px;">
<td style="width: 20%; height: 21px;">froala</td>
<td style="width: 20%; height: 21px;">等等</td>
<td style="width: 20%; height: 21px;">&nbsp;</td>
</tr>
</tbody>
</table>
<h4>关于此中文文档（手册）</h4>
<p>该文档是<a href="./">TinyMCE的中文使用手册、进阶用法的说明书</a>，包含入门用法、插件使用、配置参数使用方法、内置方法等。<span style="color: #f30;">它并非100%照搬英文文档进行翻译</span>，我会对很多自认为不完善的地方进行删改或加入新的内容，使之比原文档更易于学习。</p>
<p>弄这个中文手册的初衷：从前一直使用kindeditor，但苦于官方已N久没有更新，不得不到处寻找合适自己的编辑器，用过很多之后，最终感觉还是TinyMCE比较顺手，主要是它能简能繁，适用非常全面。</p>
<p>老外的东西是不错的，就是没有中文手册文档，拦住好多像我一样英语比较差的国人，限制了它的知名度，希望这份中文文档能帮助TinyMCE走进中国。</p>
<p>我深知自己的英语水平比较烂，如有任何翻译错误，还请邮件告诉我：Lcard@qq.com</p>
<p>PS：网友群：689501894，吐槽群：818515594</p>
<p>&mdash;&mdash; 译者兼该文档制作人：莫若卿</p>
<p>&mdash;&mdash; 2019.3</p>`,
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
.article-content {
  padding: 100rpx 20rpx;
}
</style>

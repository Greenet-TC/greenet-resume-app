/*
 * @Author: maxueming maxueming@kuaishou.com
 * @Date: 2024-01-11 16:43:08
 * @LastEditors: maxueming maxueming@kuaishou.com
 * @LastEditTime: 2024-01-11 16:48:13
 * @FilePath: /greenet-resume-app/common/mixin.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const mixin = {
  data() {
    return {
      share: {
        // 转发的标题
        title: "关于实习，这些你都不知道！",
        // 转发的路径，默认是当前页面，必须是以‘/’开头的完整路径，/pages/index/index
        path: "",
        //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，
        //支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
        imageUrl: "",
      },
    };
  },
  // 分享到微信
  onShareAppMessage: function () {
    // 获取加载的页面
    let pages = getCurrentPages(),
      view = pages[pages.length - 1];
    //分享的页面路径
    if (!this.share.path) {
      // #ifdef MP-WEIXIN
      this.share.path = `/${view.route}`;
      //#endif
      //#ifdef MP-ALIPAY
      this.share.path = view.$page.fullPath;
      //#endif
    }
    //转发参数
    return this.share;
  },
  // 分享到朋友圈
  onShareTimeline() {
    // 获取加载的页面
    let pages = getCurrentPages(),
      view = pages[pages.length - 1];
    //分享的页面路径
    if (!this.share.path) {
      // #ifdef MP-WEIXIN
      this.share.path = `/${view.route}`;
      //#endif
      //#ifdef MP-ALIPAY
      this.share.path = view.$page.fullPath;
      //#endif
    }
    //转发参数
    return this.share;
  },
};

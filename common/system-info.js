/*
 * @Author: maxueming maxueming@kuaishou.com
 * @Date: 2023-09-24 19:38:51
 * @LastEditors: maxueming maxueming@kuaishou.com
 * @LastEditTime: 2023-09-24 19:39:32
 * @FilePath: /greenet-resume-app/common/system-info.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 此js文件管理关于当前设备的机型系统信息
 */
const systemInfo = function () {
  /****************** 所有平台共有的系统信息 ********************/
  // 设备系统信息
  let systemInfomations = uni.getSystemInfoSync();
  // 机型适配比例系数
  let scaleFactor = 750 / systemInfomations.windowWidth;
  // 当前机型-屏幕高度
  let windowHeight = systemInfomations.windowHeight * scaleFactor; //rpx
  // 当前机型-屏幕宽度
  let windowWidth = systemInfomations.windowWidth * scaleFactor; //rpx
  // 状态栏高度
  let statusBarHeight = systemInfomations.statusBarHeight * scaleFactor; //rpx

  // 导航栏高度  注意：此导航栏高度只针对微信小程序有效 其他平台如自定义导航栏请使用：状态栏高度+自定义文本高度
  let navHeight = 0; //rpx
  // console.log(windowHeight,'哈哈哈哈哈');

  /****************** 微信小程序头部胶囊信息 ********************/
  // #ifdef MP-WEIXIN
  const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
  // 胶囊高度
  let menuButtonHeight = menuButtonInfo.height * scaleFactor; //rpx
  // 胶囊宽度
  let menuButtonWidth = menuButtonInfo.width * scaleFactor; //rpx
  // 胶囊上边界的坐标
  let menuButtonTop = menuButtonInfo.top * scaleFactor; //rpx
  // 胶囊右边界的坐标
  let menuButtonRight = menuButtonInfo.right * scaleFactor; //rpx
  // 胶囊下边界的坐标
  let menuButtonBottom = menuButtonInfo.bottom * scaleFactor; //rpx
  // 胶囊左边界的坐标
  let menuButtonLeft = menuButtonInfo.left * scaleFactor; //rpx

  // 微信小程序中导航栏高度 = 胶囊高度 + (顶部距离 - 状态栏高度) * 2
  navHeight = menuButtonHeight + (menuButtonTop - statusBarHeight) * 2;
  // #endif

  // #ifdef MP-WEIXIN
  return {
    scaleFactor,
    windowHeight,
    windowWidth,
    statusBarHeight,
    menuButtonHeight,
    menuButtonWidth,
    menuButtonTop,
    menuButtonRight,
    menuButtonBottom,
    menuButtonLeft,
    navHeight,
  };
  // #endif

  // #ifndef MP-WEIXIN
  return {
    scaleFactor,
    windowHeight,
    windowWidth,
    statusBarHeight,
  };
  // #endif
};

export { systemInfo };

// export const wxLogin = (loginRes) => {
//   return new Promise((resolve, reject) => {
//     const { errMsg, code } = loginRes;
//     if (errMsg.indexOf("ok") !== -1) {
//       validLogin({
//         code,
//         sf: "1",
//       })
//         .then((res) => {
//           const { code, data, token } = res;
//           if (code === API_RETURN_CODE.USER_UNLOGIN.code) {
//             // 用户未登录 存储状态并且储存返回的微信openId
//             uni.setStorageSync(STORAGE_KEYS.USER_LOGIN_CODE, code);
//             uni.setStorageSync(STORAGE_KEYS.WX_OPEN_ID, data);
//           } else if (code === API_RETURN_CODE.USER_LOGINED.code) {
//             // 用户已登录，未进行授权
//             uni.setStorageSync(STORAGE_KEYS.USER_LOGIN_CODE, code);
//             token && setToken(token);
//             const userInfo = {
//               phoneNumber: data.phone,
//               sf: data.sf,
//             };
//             uni.setStorageSync(STORAGE_KEYS.USER_INFO, userInfo);
//           } else if (code === API_RETURN_CODE.USER_AUTHOR.code) {
//             // 用户已登录，已授权
//             uni.setStorageSync(STORAGE_KEYS.USER_LOGIN_CODE, code);
//             token && setToken(token);
//             const userInfo = {
//               phoneNumber: data.phone,
//               sf: data.sf,
//             };
//             uni.setStorageSync(STORAGE_KEYS.USER_INFO, userInfo);
//           }
//           resolve();
//         })
//         .catch((err) => {
//           console.log(err);
//           reject();
//         });
//     } else if (errMsg.indexOf("fail") !== -1) {
//       uni.showToast({
//         title: "wx.login出错，请退出重新进入",
//         duration: 2000,
//       });
//       reject();
//     }
//   });
// };
// 获取用户信息。每次请求都会弹出授权窗口，用户同意后返回 userInfo。
export const getUserProfile = () => {
  return new Promise((resolve, reject) => {
    uni.getUserProfile({
      desc: "用户登录",
      success: (info_res) => {
        resolve(info_res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};
// // 6.保存授权信息
// export const saveAuthInfo = (info) => {
//   return new Promise((resolve, reject) => {
//     const { nickName, gender, city, province, country, avatarUrl } =
//       info.userInfo;

//     const data = {
//       nickName: nickName,
//       avatarUrl: avatarUrl,
//       gender: gender,
//       address: `${city === "" ? "0" : city} ${
//         province === "" ? "0" : province
//       } ${country === "" ? "0" : country}`,
//     };
//     saveWXAuthInfo(data)
//       .then((res) => {
//         uni.setStorageSync(STORAGE_KEYS.USER_LOGIN_CODE, res.code);
//         resolve();
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// };
export const getkey = (companyInfo, id) => {
  return companyInfo.filter((item) => {
    return item.id === id;
  })[0];
};
export function getCookieValue(name) {
  const strCookie = document.cookie;
  const arrCookie = strCookie.split(";");
  for (let i = 0; i < arrCookie.length; i++) {
    const c = arrCookie[i].split("=");
    if (c[0].trim() === name) {
      return c[1];
    }
  }
  return "";
}

const tokenKey = "wx_code";

export function setToken(token) {
  return uni.setStorageSync(tokenKey, token);
}

export function getToken() {
  return uni.getStorageSync(tokenKey);
}
export function removeToken() {
  return uni.removeStorageSync(tokenKey);
}
export const WEBURL =
  "https://mxm1923893223-ulteh-1302287111.tcloudbaseapp.com";
import dayjs, { Dayjs } from "dayjs";
import { IOptions } from "./contant";

export type ValueOf<T> = T[keyof T];

export const getTargetElement = <
  T extends IOptions,
  K extends ValueOf<T>,
  D extends keyof T
>(
  arr: T[],
  value: K,
  key: D
): T => {
  return arr.filter((i) => {
    return i[key ?? "value"] === Number(value);
  })[0];
};

export const getFormateDateTime = (time: number) => {
  if (getTimeType(time, 15 * 60)) {
    return "刚刚";
  } else if (getTimeType(time, 30 * 60)) {
    return "30min前";
  } else if (getTimeType(time, 60 * 60)) {
    return "1小时前";
  } else if (getTimeType(time, 60 * 60 * 2)) {
    return "2小时前";
  } else if (getTimeType(time, 60 * 60 * 3)) {
    return "3小时前";
  } else if (getTimeType(time, 60 * 60 * 4)) {
    return "4小时前";
  } else if (getTimeType(time, 60 * 60 * 5)) {
    return "5小时前";
  } else if (getTimeType(time, 60 * 60 * 6)) {
    return "6小时前";
  } else if (getTimeType(time, 60 * 60 * 7)) {
    return "7小时前";
  } else if (getTimeType(time, 60 * 60 * 8)) {
    return "8小时前";
  } else if (getTimeType(time, 60 * 60 * 9)) {
    return "9小时前";
  } else if (getTimeType(time, 60 * 60 * 10)) {
    return "10小时前";
  } else if (getTimeType(time, 60 * 60 * 11)) {
    return "11小时前";
  } else if (getTimeType(time, 60 * 60 * 12)) {
    return "12小时前";
  } else if (getTimeType(time, 60 * 60 * 24)) {
    return "1天前";
  } else if (getTimeType(time, 60 * 60 * 24 * 2)) {
    return "2天前";
  } else if (getTimeType(time, 60 * 60 * 24 * 3)) {
    return "3天前";
  } else if (getTimeType(time, 60 * 60 * 24 * 4)) {
    return "4天前";
  } else if (getTimeType(time, 60 * 60 * 24 * 5)) {
    return "5天前";
  } else if (getTimeType(time, 60 * 60 * 24 * 6)) {
    return "6天前";
  } else if (getTimeType(time, 60 * 60 * 24 * 7)) {
    return "一周前";
  } else {
    return dayjs(time).format("YYYY-MM-DD");
  }
};
export const getTimeType = (time, duration): boolean => {
  let now: Dayjs = dayjs(new Date());
  return Math.floor((now - time) / 1000) < duration;
};

 export function tranNesumber(num, point){
  // 将数字转换为字符串,然后通过split方法用.分隔,取到第0个
  let numStr = num.toString().split('.')[0]
  if(numStr.length<6) { // 判断数字有多长,如果小于6,,表示10万以内的数字,让其直接显示
      console.log(numStr);
      return numStr;
    }else if(numStr.length>=6 && numStr.length<=8){ // 如果数字大于6位,小于8位,让其数字后面加单位万
       let decimal = numStr.substring(numStr.length-4, numStr.length-4+point)
       console.log(decimal);
       // 由千位,百位组成的一个数字
       return parseFloat(parseInt(num / 10000)+'.'+decimal)+'w'  
  }else if(numStr.length >8){ // 如果数字大于8位,让其数字后面加单位亿
       let decimal = numStr.substring(numStr.length-8, numStr.length-8+point);
       console.log(decimal);
       return parseFloat(parseInt(num/100000000)+'.'+decimal)+'亿'
  }
}

export function tranNumber(value){
  value = Number(value)
  var num;
  if( value > 999&& value<=9999){
    num = (Math.floor(value / 10) / 100) + 'k';
  }
  else if (value > 9999) { //大于9999显示x.xx万
    num = (Math.floor(value / 100) / 100) + 'w+';
  } else if (value <= 9999 && value > -9999) {
    num = value
  } else if (value < -9999) { //小于-9999显示-x.xx万
    num = -(Math.floor(Math.abs(value) / 1000) / 10) + 'w'
  }
  return num;
}


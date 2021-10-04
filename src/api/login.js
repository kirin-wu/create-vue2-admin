// 导入request.js qs
import request from "@/utils/request";
import qs from "qs";
// 导出方法 推荐方法名 http请求动词+模块名+api
// // ##用户列表
// export const getUsersApi = (params) => {
//   return request({
//     url: "/users/index.jsp",
//     method: "get",
//     params,
//   });
// };
// ##密保登录
export const postLoginApi = (postData) => {
  return request({
    url: "/users/login.jsp",
    method: "post",
    data: qs.stringify(postData),
  });
};
// ##发送短信
export const postSmsSendApi = (postData) => {
  return request({
    url: "/sms/send.jsp",
    method: "post",
    data: qs.stringify(postData),
  });
};
// ##短信登录
export const postSmsLoginApi = (postData) => {
  return request({
    url: "/sms/login.jsp",
    method: "post",
    data: qs.stringify(postData),
  });
};
// ##令牌登录
export const postTokenLoginApi = (postData) => {
  return request({
    url: "/token/login.jsp",
    method: "post",
    data: qs.stringify(postData),
  });
};

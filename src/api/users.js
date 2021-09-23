// 导入request.js
import request from "@/utils/request";
// 导出方法 推荐方法名 http请求动词+模块名+api
export const getUsersApi = (params) => {
  return request({
    url: "/users/index.jsp",
    method: "get",
    params,
  });
};

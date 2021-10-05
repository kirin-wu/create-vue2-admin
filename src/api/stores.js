// 导入request.js qs
import request from "@/utils/request";
import qs from "qs";
// 导出方法 推荐方法名 http请求动词+模块名+api
// ##门店列表
export const getStoresApi = (params) => {
  return request({
    url: "/stores/index.jsp",
    method: "get",
    params,
  });
};
// ##门店创建
export const postStoresApi = (postData) => {
  return request({
    url: "/stores/create.jsp",
    method: "post",
    data: qs.stringify(postData),
  });
};
// ##门店删除
export const deleteStoresApi = (params) => {
  return request({
    url: "/stores/delete.jsp",
    method: "delete",
    params,
  });
};

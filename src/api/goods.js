// 导入request.js qs
import request from "@/utils/request";
import qs from "qs";
// 导出方法 推荐方法名 http请求动词+模块名+api
// ##商品列表
export const getGoodsApi = (params) => {
  return request({
    url: "/goods/index.jsp",
    method: "get",
    params,
  });
};
// ##商品创建
export const postGoodsApi = (postData) => {
  return request({
    url: "/goods/create.jsp",
    method: "post",
    data: qs.stringify(postData),
  });
};
// ##商品删除
export const deleteGoodsApi = (params) => {
  return request({
    url: "/goods/delete.jsp",
    method: "delete",
    params,
  });
};

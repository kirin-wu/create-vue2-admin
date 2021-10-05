// 导入request.js qs
import request from "@/utils/request";
import qs from "qs";
// 导出方法 推荐方法名 http请求动词+模块名+api
// ##订单列表
export const getOrdersApi = (params) => {
  return request({
    url: "/orders/index.jsp",
    method: "get",
    params,
  });
};
// ##订单统计
export const getTotalApi = (params) => {
  return request({
    url: "/orders/total.jsp",
    method: "get",
    params,
  });
};
// ##订单删除
export const deleteOrdersApi = (params) => {
  return request({
    url: "/orders/delete.jsp",
    method: "delete",
    params,
  });
};
// ##订单更新
export const putOrdersApi = (putData) => {
  return request({
    url: "/orders/update.jsp",
    method: "put",
    data: qs.stringify(putData),
  });
};

import request from "@/utils/request.js";
import qs from "qs";
// ##角色列表
export const getRolesApi = (params) => {
  return request({
    url: "/roles/index.jsp",
    method: "get",
    params,
  });
};
// ##角色创建
export const postRolesCreateApi = (params) => {
  return request({
    url: "/roles/create.jsp",
    method: "post",
    data: qs.stringify(params),
  });
};
// ##角色删除
export const deleteRolesApi = (params) => {
  return request({
    url: "/roles/delete.jsp",
    method: "delete",
    params,
  });
};
// ##角色修改
export const putRolesApi = (params) => {
  return request({
    url: "/roles/update.jsp",
    method: "put",
    data: qs.stringify(params),
  });
};
// ##角色分配权限
export const putRolesChangeAuthApi = (params) => {
  return request({
    url: "/roles/assign.jsp",
    method: "put",
    data: qs.stringify(params),
  });
};

// 导入request.js qs
import request from "@/utils/request";
import qs from "qs";
// 导出方法 推荐方法名 http请求动词+模块名+api
// ##用户列表
export const getUsersApi = (params) => {
  return request({
    url: "/users/index.jsp",
    method: "get",
    params,
  });
};
// ##用户创建
export const postUsersCreateApi = (postData) => {
  return request({
    url: "/users/create.jsp",
    method: "post",
    data: qs.stringify(postData),
  });
};
// ##用户删除
export const deleteUsersApi = (params) => {
  return request({
    url: "/users/delete.jsp",
    method: "delete",
    params,
  });
};
// ##用户编辑
export const putUsersEditApi = (putData) => {
  return request({
    url: "/users/update.jsp",
    method: "put",
    data: qs.stringify(putData),
  });
};
// ##分配角色
export const putUserRoleApi = (putData) => {
  return request({
    url: "/users/assign.jsp",
    method: "put",
    data: qs.stringify(putData),
  });
};
// ##切换角色状态
export const putUserChangeStateApi = (postData) => {
  return request({
    url: "/users/state.jsp",
    method: "put",
    data: qs.stringify(postData),
  });
};

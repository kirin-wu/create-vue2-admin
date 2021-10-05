import request from "@/utils/request";
// ## 权限列表
export const getAreasApi = (params) => {
  return request({
    url: "/areas/index.jsp",
    method: "get",
    params,
  });
};

import request from "@/utils/request";
// ## ๆ้ๅ่กจ
export const getAreasApi = (params) => {
  return request({
    url: "/areas/index.jsp",
    method: "get",
    params,
  });
};

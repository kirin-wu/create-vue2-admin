import request from "@/utils/request";
export const getHistoryApi = (params) => {
  return request({
    url: "/users/history.jsp",
    method: "get",
    params,
  });
};

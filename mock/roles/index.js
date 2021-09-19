// 1 导入模块
const Mock = require("mockjs");
const { random } = require("../utils");
// 2 调用Mock方法生成数据
let data = [];
for (let i = 1; i <= 7; i++) {
  data.push(
    Mock.mock({
      id: "@id",
      role_name: "@cname",
      role_desc: ["超级管理员", "财务", "普通用户", "财务"][random(0, 3)],
    })
  );
}
export default Mock.mock({
  meta: {
    state: 200,
    msg: "操作成功",
  },
  data,
});
// 编号 所属角色 用户名 手机号 冻结 创建时间 操作

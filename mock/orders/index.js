// 1 导入模块
const Mock = require("mockjs");
const { random } = require("../utils");
// 2 调用Mock方法生成数据
let data = [];
for (let i = 1; i <= 7; i++) {
  data.push(
    Mock.mock({
      // 显示：订单编号、下单人、收货人、总额、订单状态、支付状态、配送状态、创建于
      id: "@id",
      uname1: "@cname(2,4)",
      uname2: "@cname(2,4)",
      priceNum: random(2000, 99999),
      orders_state: [0, 1, 0, 1, 0, 1, 0, 1][random(0, 7)],
      pay_state: [0, 1, 0, 1, 0, 1, 0, 1][random(0, 7)],
      send_state: [0, 1, 0, 1, 0, 1, 0, 1][random(0, 7)],
      work: "@datetime",
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

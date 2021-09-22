// 1 导入模块
const Mock = require("mockjs");
const { random } = require("../utils");
// 2 调用Mock方法生成数据
let data = [];
for (let i = 1; i <= 5; i++) {
  data.push(
    Mock.mock({
      // 编号、所属门店、封面60x60、标题、库存、市场价、销售价、创建于、上架、操作
      id: "@id",
      sub_stores: "@ctitle(2,4)",
      img: "@Image('60x60',@color, 'Hello meituan!')",
      title: "@ctitle(2,100)",
      repertory: random(2000, 9999),
      market_price: "@integer(100, 19999)",
      sell_price: "@integer(100, 19999)",
      work: "@datetime",
      state: [true, false, true, false, true, false, true, false][random(0, 7)],
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

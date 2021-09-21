// 1 导入模块
const Mock = require("mockjs");
const { random } = require("../utils");
// 2 调用Mock方法生成数据
let data = [];
for (let i = 1; i <= 5; i++) {
  data.push(
    Mock.mock({
      id: "@id",
      img: "@Image('60x60',@color, 'Hello meituan!')",
      title: "@ctitle(2,100)",
      commit_goods_count: random(0, 3),
      commit_bad_count: random(0, 3),
      commit_count_count: random(0, 3),
      sell_count: random(0, 3),
      mobile: "@integer(10000000000, 19999999999)",
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

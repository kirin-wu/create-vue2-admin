// 1 导入模块
const Mock = require("mockjs");
const { random } = require("../utils");
// 2 调用Mock方法生成数据
let data = [];
for (let i = 1; i <= 8; i++) {
  data.push(
    Mock.mock({
      id: "@id",
      title: "@ctitle(2,4)",
      type: ["密保", "短信", "扫码", "令牌"][random(0, 3)],
      city: "@county(true)",
      time: "@datetime",
      nexttime: "@datetime()",
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

/*
 * @Author: kirinwu 1270314454@qq.com
 * @Date: 2022-06-09 09:35:32
 * @LastEditors: kirinwu 1270314454@qq.com
 * @LastEditTime: 2022-07-18 14:57:00
 * @FilePath: \vue2-admin\mock\utils.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
exports.random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

exports.random = (min, max) => () => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
exports.random = (min, max) => {
  () => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
};

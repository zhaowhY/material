/**
 * @description 防抖
 * @param {Function} func 执行函数
 * @param {Number} delay 防抖时长
 */

let timer = null;
export default function debounce(func, delay) {
  if (timer) return;
  if (timer === null) func(); // 第一次立即执行
  timer = setTimeout(() => {
    func();
    timer = false;
  }, Number(delay));
}

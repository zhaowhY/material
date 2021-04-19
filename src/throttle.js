/**
 * @description 节流
 * @param {Function} func 执行函数
 * @param {Number} delay 节流时长
 */

let timer = null;
export default function throttle(func, delay) {
  if (timer) clearTimeout(timer);

  timer = setTimeout(() => {
    func();
  }, Number(delay));
}

/**
 * @description 防抖
 * @param {Function} func 执行函数
 * @param {Number} delay 防抖时长
 */

 let timer = null;
 function debounce(func, delay) {
   if (timer) return;
   if (timer === null) func(); // 第一次立即执行
   timer = setTimeout(() => {
     func();
     timer = false;
   }, Number(delay));
 }
 
 export default (element) => {
   const imgs = element.getElementsByTagName('img');
   // 获取可视区域的高度
   const viewHeight = element.clientHeight || window.innerHeight;
   // num用于统计当前显示到了哪一张图片，避免每次都从第一张图片开始检查是否露出
   let num = 0;
   function lazyLoad() {
     for (let i = num; i < imgs.length; i++) {
       // 用可视区域高度减去元素顶部距离可视区域顶部的高度
       const distance = viewHeight - imgs[i].getBoundingClientRect().top;
       // 如果可视区域高度大于等于元素顶部距离可视区域顶部的高度，说明元素露出, -50提前50px的距离开始加载
       if (distance >= -100) {
         // 给元素写入真实的src，展示图片
         // console.log(imgs[i].getAttribute('data-src'));
         if (imgs[i].getAttribute('data-src')) {
           imgs[i].src = imgs[i].getAttribute('data-src');
         }
         // 前i张图片已经加载完毕，下次从第i+1张开始检查是否露出
         num = i + 1;
       }
     }
   }
   lazyLoad();
   element.addEventListener('scroll', () => {
     debounce(lazyLoad, 120);
   });
 };
 
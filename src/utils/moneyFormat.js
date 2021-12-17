// 正则解释  /(\d)(?=(\d{3})+(?!\d))/g
// 匹配在3n个数字(且这3n个数字后面没有数字)前面的 数字
// (?=) (?!) 均为非获取匹配且预查不消耗字符，及仅作为条件，不纳入匹配字符中


function moneyformat(money) {
  money = String(money);
  let [front, end = ''] = money.split('.');

  front = front.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  if (end) end = '.' + end;
  return front + end;
}

console.log(moneyformat(1234565123.12));
console.log(moneyformat(1234));
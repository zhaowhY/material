/**
 * @description 时间格式化函数
 * @param {number}  timestamp
 * @param {string}  fmt eg:YYYY-MM-DD HH:mm:ss
 * @return {string}
 */
export default (timestamp, fmt) => {
  if (!timestamp || !fmt) return timestamp;
  const date = new Date(timestamp);
  if (!date.getDate()) return timestamp;
  date.setHours(date.getHours() + 8); // ISO的时间 = 北京时间 - 8小时；
  const [, YYYY, MM, DD, HH, mm, ss] = date
    .toISOString()
    .match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
  return fmt
    .replace('YYYY', YYYY)
    .replace('YY', YYYY.slice(-2))
    .replace('MM', MM)
    .replace('DD', DD)
    .replace('HH', HH)
    .replace('mm', mm)
    .replace('ss', ss);
};
